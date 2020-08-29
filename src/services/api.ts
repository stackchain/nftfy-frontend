/* eslint-disable */
import Portis from '@portis/web3'
import axios from 'axios'
import Web3 from 'web3'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

export type WalletName = 'metamask' | 'portis'

export interface Wallet {
  network: string
  getAccounts(): Promise<string[]>
  selectAccount(address: string): Promise<void>
  validateAddress(address: string): Promise<boolean>
  getEtherBalance(address: string): Promise<string>
  listAccountShares(address: string, offset: number, limit: number): Promise<{ items: ERC20[]; count: number }>
  listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>
  retrieveItem(address: string, tokenId: string): Promise<ERC721Item>
  retrieveShares(address: string): Promise<ERC20>
  registerERC721(address: string): Promise<boolean>
  listPaymentTokens(): Promise<ERC20[]>
}

export interface ERC20 {
  address: string
  name: string
  symbol: string
  decimals: number
  getTotalSupply(): Promise<string>
  getAccountBalance(address: string): Promise<string> // pegar numero de shares
  validateAmount(amount: string): Promise<boolean>

  // Nftfy extensions
  getERC721Item(): Promise<ERC721Item>

  getPaymentToken(): Promise<ERC20 | null> // pegar saldo da carteira (getAccountBalance),  se for null getEtherBalance da interface wallet
  getExitPrice(): Promise<string>
  getSharePrice(): Promise<string>
  getSharesCount(): Promise<string> // total de shares  (fazer calculo percentual )

  isRedeemable(): Promise<boolean>
  getAccountRedeemAmount(address: string): Promise<string>
  redeem(address: string): Promise<void>

  isClaimable(): Promise<boolean>
  getVaultBalance(): Promise<string>
  getAccountVaultBalance(address: string): Promise<string>
  claim(address: string): Promise<void>
}

export interface ERC721 {
  address: string
  name: string
  symbol: string
  getItem(tokenId: string): Promise<ERC721Item>
  listAllItems(offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>
  listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>

  // Nftfy extensions
  getWrapper(): Promise<ERC721 | null>
  listAllShares(offset: number, limit: number): Promise<{ items: ERC20[]; count: number }>
}

export interface ERC721Item {
  contract: ERC721
  tokenId: string
  name?: string
  description?: string
  imageUri?: string
  getTokenOwner(): Promise<string>

  // Nftfy extensions
  isSecuritized(): Promise<boolean> // 1
  listAccountShares(address: string, offset: number, limit: number): Promise<{ items: ERC20[]; count: number }>
  securitize(sharesCount: string, exitPrice: string, paymentToken: ERC20 | null): Promise<void> // 1
}

async function getWeb3(walletName: WalletName): Promise<Web3> {
  switch (walletName) {
    case 'metamask':
      if (window.ethereum) {
        await window.ethereum.enable()
        return new Web3(window.ethereum)
      }
      if (!window.web3) throw new Error('Unsupported wallet')
      return new Web3(window.web3.currentProvider)
    case 'portis':
      const portis = new Portis('a0fa4f71-2d8e-4a67-baa6-33ab41c3ba26', 'mainnet')
      return new Web3(portis.provider)
  }
}

const NFTFY_ABI = require('../contracts/Nftfy.json').abi
const ERC721_ABI = require('../contracts/ERC721Wrapper.json').abi
const ERC20_ABI = require('../contracts/ERC721Shares.json').abi

export async function listSupportedWallets(): Promise<WalletName[]> {
  if (window.ethereum || window.web3) return ['metamask', 'portis']
  return ['portis']
}

export async function initializeWallet(walletName: WalletName): Promise<Wallet> {
  let account = '0x0000000000000000000000000000000000000000'

  const web3 = await getWeb3(walletName)
  const network = await web3.eth.net.getNetworkType()
  const contracts: ERC721[] = await listNonFungibleTokens()

  async function nftfy(): Promise<string> {
    switch (network) {
      case 'main':
        return '0x3BFFF8566fb6C2921be92bb86716469496aE1818'
      case 'ropsten':
        return '0x3BFFF8566fb6C2921be92bb86716469496aE1818'
      case 'rinkeby':
        return '0x3BFFF8566fb6C2921be92bb86716469496aE1818'
      case 'kovan':
        return '0x3BFFF8566fb6C2921be92bb86716469496aE1818'
      case 'goerli':
        return '0x3BFFF8566fb6C2921be92bb86716469496aE1818'
    }
    throw new Error('Unsupported network')
  }

  function valid(amount: string, decimals: number): boolean {
    const regex = new RegExp(`^\\d+${decimals > 0 ? `(\\.\\d{1,${decimals}})?` : ''}$`)
    return regex.test(amount)
  }

  function coins(units: string, decimals: number): string {
    if (!valid(units, 0)) throw new Error('Invalid amount')
    if (decimals == 0) return units
    const s = units.padStart(1 + decimals, '0')
    return `${s.slice(0, -decimals)}.${s.slice(-decimals)}`
  }

  function units(coins: string, decimals: number): string {
    if (!valid(coins, decimals)) throw new Error('Invalid amount')
    let i = coins.indexOf('.')
    if (i < 0) i = coins.length
    const s = coins.slice(i + 1)
    return coins.slice(0, i) + s + '0'.repeat(decimals - s.length)
  }

  async function newERC721Item(contract: ERC721, tokenId: string): Promise<ERC721Item> {
    let self: ERC721Item

    const { name, description, imageUri } = await loadMetadata()

    function getTokenURI(): Promise<string> {
      const abi = new web3.eth.Contract(ERC721_ABI, contract.address)
      return abi.methods.tokenURI(tokenId).call()
    }

    async function loadMetadata(): Promise<{ name?: string; description?: string; imageUri?: string }> {
      try {
        const CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/'
        const uri = await getTokenURI()
        const headers: { [key: string]: string } = {}
        // headers.Origin = 'https://nftfy.tk'
        const response = await axios.get(CORS_PREFIX + uri, { headers })
        const { name, description, image, image_url } = response.data
        const imageUrl = image || image_url
        const imageUri = imageUrl ? CORS_PREFIX + imageUrl : imageUrl
        return { name, description, imageUri }
      } catch (e) {
        console.log('ERC721Item.loadMetadata', contract.address, tokenId, e.message)
        return {}
      }
    }

    function getTokenOwner(): Promise<string> {
      const abi = new web3.eth.Contract(ERC721_ABI, contract.address)
      return abi.methods.ownerOf(tokenId).call()
    }

    async function isSecuritized(): Promise<boolean> {
      const wrapper = await contract.getWrapper()
      if (wrapper == null) return false
      const abi = new web3.eth.Contract(ERC721_ABI, wrapper.address)
      return abi.methods.securitized(tokenId).call()
    }

    async function listAccountShares(address: string, offset: number, limit: number): Promise<{ items: ERC20[]; count: number }> {
      if (offset < 0) throw new Error('Invalid offset')
      if (limit < 0) throw new Error('Invalid limit')
      const wrapper = await contract.getWrapper()
      if (wrapper == null) return { items: [], count: 0 }
      let items: ERC20[] = []
      let count = 0
      const { items: subitems, count: subcount } = await wrapper.listAllShares(0, Number.MAX_SAFE_INTEGER)
      for (const subitem of subitems) {
        const item = await subitem.getERC721Item()
        const balance = await subitem.getAccountBalance(address)
        if (item.tokenId == tokenId && balance != coins('0', subitem.decimals)) {
          if (count == offset && limit > 0) {
            items.push(subitem)
            offset++
            limit--
          }
          count++
        }
      }
      return { items, count }
    }

    async function approve(address: string): Promise<void> {
      const abi = new web3.eth.Contract(ERC721_ABI, contract.address)
      return new Promise((resolve, reject) => {
        abi.methods
          .approve(address, tokenId)
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject)
      })
    }

    async function securitize(sharesCount: string, exitPrice: string, paymentToken: ERC20 | null): Promise<void> {
      const address = await nftfy()
      const abi = new web3.eth.Contract(NFTFY_ABI, address)
      const decimals = 0
      const paymentDecimals = paymentToken ? paymentToken.decimals : 18
      const paymentAddress = paymentToken ? paymentToken.address : '0x0000000000000000000000000000000000000000'
      await approve(address)
      return new Promise((resolve, reject) => {
        abi.methods
          .securitize(
            contract.address,
            tokenId,
            units(sharesCount, decimals),
            decimals,
            units(exitPrice, paymentDecimals),
            paymentAddress,
            false
          )
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject)
      })
    }

    return (self = {
      contract,
      tokenId,
      name,
      description,
      imageUri,
      getTokenOwner,
      isSecuritized,
      listAccountShares,
      securitize
    })
  }

  async function newERC721(address: string, defaultName = '', defaultSymbol = ''): Promise<ERC721> {
    let self: ERC721

    const abi = new web3.eth.Contract(ERC721_ABI, address)
    const name = await (async () => {
      try {
        return await abi.methods.name().call()
      } catch (e) {
        return defaultName
      }
    })()
    const symbol = await (async () => {
      try {
        return await abi.methods.symbol().call()
      } catch (e) {
        return defaultSymbol
      }
    })()

    function getItem(tokenId: string): Promise<ERC721Item> {
      return newERC721Item(self, tokenId)
    }

    async function listAllItems(offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }> {
      if (offset < 0) throw new Error('Invalid offset')
      if (limit < 0) throw new Error('Invalid limit')
      const items: ERC721Item[] = []
      const count = Number(await abi.methods.totalSupply().call())
      for (let i = offset; i < Math.min(offset + limit, count); i++) {
        const tokenId = await abi.methods.tokenByIndex(i).call()
        items.push(await newERC721Item(self, tokenId))
      }
      return { items, count }
    }

    async function listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }> {
      if (offset < 0) throw new Error('Invalid offset')
      if (limit < 0) throw new Error('Invalid limit')
      const items: ERC721Item[] = []
      const count = Number(await abi.methods.balanceOf(address).call())
      for (let i = offset; i < Math.min(offset + limit, count); i++) {
        const tokenId = await abi.methods.tokenOfOwnerByIndex(address, i).call()
        items.push(await newERC721Item(self, tokenId))
      }
      return { items, count }
    }

    async function getWrapper(): Promise<ERC721 | null> {
      const abi = new web3.eth.Contract(NFTFY_ABI, await nftfy())
      const _address = await abi.methods.wrappers(address).call()
      if (_address == '0x0000000000000000000000000000000000000000') return null
      return newERC721(_address)
    }

    async function listAllShares(offset: number, limit: number): Promise<{ items: ERC20[]; count: number }> {
      if (offset < 0) throw new Error('Invalid offset')
      if (limit < 0) throw new Error('Invalid limit')
      const items: ERC20[] = []
      const count = Number(await abi.methods.historyLength().call())
      for (let i = offset; i < Math.min(offset + limit, count); i++) {
        const address = await abi.methods.historyAt(i).call()
        items.push(await newERC20(address))
      }
      return { items, count }
    }

    return (self = {
      address,
      name,
      symbol,
      getItem,
      listAllItems,
      listAccountItems,
      getWrapper,
      listAllShares
    })
  }

  async function newERC20(address: string, defaultName = '', defaultSymbol = '', defaultDecimals = 18): Promise<ERC20> {
    let self: ERC20

    const abi = new web3.eth.Contract(ERC20_ABI, address)
    const name = await (async () => {
      try {
        return await abi.methods.name().call()
      } catch (e) {
        return defaultName
      }
    })()
    const symbol = await (async () => {
      try {
        return await abi.methods.symbol().call()
      } catch (e) {
        return defaultSymbol
      }
    })()
    const decimals = await (async () => {
      try {
        return Number(await abi.methods.decimals().call())
      } catch (e) {
        return defaultDecimals
      }
    })()

    async function getTotalSupply(): Promise<string> {
      return coins(await abi.methods.totalSupply().call(), decimals)
    }

    async function getAccountBalance(address: string): Promise<string> {
      return coins(await abi.methods.balanceOf(address).call(), decimals)
    }

    async function validateAmount(amount: string): Promise<boolean> {
      return valid(amount, decimals)
    }

    async function getERC721Item(): Promise<ERC721Item> {
      const address = await abi.methods.wrapper().call()
      const tokenId = await abi.methods.tokenId().call()
      const _abi = new web3.eth.Contract(ERC721_ABI, address)
      const _address = await _abi.methods.target().call()
      const contract = await newERC721(_address)
      return newERC721Item(contract, tokenId)
    }

    async function getPaymentToken(): Promise<ERC20 | null> {
      const address = await abi.methods.paymentToken().call()
      if (address == '0x0000000000000000000000000000000000000000') return null
      return newERC20(address)
    }

    async function getExitPrice(): Promise<string> {
      const paymentToken = await getPaymentToken()
      const decimals = paymentToken ? paymentToken.decimals : 18
      return coins(await abi.methods.exitPrice().call(), decimals)
    }

    async function getSharePrice(): Promise<string> {
      const paymentToken = await getPaymentToken()
      const decimals = paymentToken ? paymentToken.decimals : 18
      return coins(await abi.methods.sharePrice().call(), decimals)
    }

    async function getSharesCount(): Promise<string> {
      const paymentToken = await getPaymentToken()
      return coins(await abi.methods.sharesCount().call(), decimals)
    }

    async function isRedeemable(): Promise<boolean> {
      return !(await abi.methods.released().call())
    }

    async function getAccountRedeemAmount(address: string): Promise<string> {
      const paymentToken = await getPaymentToken()
      const decimals = paymentToken ? paymentToken.decimals : 18
      return coins(await abi.methods.redeemAmountOf(address).call(), decimals)
    }

    async function approve(paymentToken: ERC20, redeemAmount: string): Promise<void> {
      const { decimals } = paymentToken
      const abi = new web3.eth.Contract(ERC20_ABI, paymentToken.address)
      return new Promise((resolve, reject) => {
        abi.methods
          .approve(address, units(redeemAmount, decimals))
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject)
      })
    }

    async function redeem(address: string): Promise<void> {
      const paymentToken = await getPaymentToken()
      const redeemAmount = await getAccountRedeemAmount(account)
      if (paymentToken == null) {
        const decimals = 18
        return new Promise((resolve, reject) => {
          abi.methods
            .redeem()
            .send({ from: account, value: units(redeemAmount, decimals) })
            .once('confirmation', (confNumber: any, receipt: any) => resolve())
            .once('error', reject)
        })
      }
      await approve(paymentToken, redeemAmount)
      return new Promise((resolve, reject) => {
        abi.methods
          .redeem()
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject)
      })
    }

    function isClaimable(): Promise<boolean> {
      return abi.methods.released().call()
    }

    async function getVaultBalance(): Promise<string> {
      const paymentToken = await getPaymentToken()
      const decimals = paymentToken ? paymentToken.decimals : 18
      return coins(await abi.methods.vaultBalance().call(), decimals)
    }

    async function getAccountVaultBalance(address: string): Promise<string> {
      const paymentToken = await getPaymentToken()
      const decimals = paymentToken ? paymentToken.decimals : 18
      return coins(await abi.methods.vaultBalanceOf(address).call(), decimals)
    }

    function claim(address: string): Promise<void> {
      return new Promise((resolve, reject) => {
        abi.methods
          .claim()
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject)
      })
    }

    return (self = {
      address,
      name,
      symbol,
      decimals,
      getTotalSupply,
      getAccountBalance,
      validateAmount,
      getERC721Item,
      getPaymentToken,
      getExitPrice,
      getSharePrice,
      getSharesCount,
      isRedeemable,
      getAccountRedeemAmount,
      redeem,
      isClaimable,
      getVaultBalance,
      getAccountVaultBalance,
      claim
    })
  }

  function getAccounts(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((error, accounts) => {
        if (error) return reject(error)
        return resolve(accounts)
      })
    })
  }

  async function selectAccount(address: string): Promise<void> {
    if (!(await validateAddress(address))) throw new Error('Invalid address')
    account = address
  }

  async function validateAddress(address: string): Promise<boolean> {
    return web3.utils.isAddress(address)
  }

  function getEtherBalance(address: string): Promise<string> {
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(address, 'latest', (error, balance) => {
        if (error) return reject(error)
        return resolve(coins(balance, 18))
      })
    })
  }

  async function listAccountShares(address: string, offset: number, limit: number): Promise<{ items: ERC20[]; count: number }> {
    if (offset < 0) throw new Error('Invalid offset')
    if (limit < 0) throw new Error('Invalid limit')
    const items: ERC20[] = []
    let count = 0
    for (const contract of contracts) {
      const wrapper = await contract.getWrapper()
      if (wrapper == null) continue
      const { items: subitems, count: subcount } = await wrapper.listAllShares(0, Number.MAX_SAFE_INTEGER)
      for (const subitem of subitems) {
        const balance = await subitem.getAccountBalance(address)
        if (balance != coins('0', subitem.decimals)) {
          if (count == offset && limit > 0) {
            items.push(subitem)
            offset++
            limit--
          }
          count++
        }
      }
    }
    return { items, count }
  }

  async function listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }> {
    if (offset < 0) throw new Error('Invalid offset')
    if (limit < 0) throw new Error('Invalid limit')
    let items: ERC721Item[] = []
    let count = 0
    for (const contract of contracts) {
      const { items: subitems, count: subcount } = await contract.listAccountItems(address, offset, limit)
      items = items.concat(subitems)
      count += subcount
      offset += subitems.length
      limit -= subitems.length
      if (limit == 0) continue
      offset -= subcount
    }
    return { items, count }
  }

  async function retrieveItem(address: string, tokenId: string): Promise<ERC721Item> {
    const contract = await newERC721(address)
    return newERC721Item(contract, tokenId)
  }

  function retrieveShares(address: string): Promise<ERC20> {
    return newERC20(address)
  }

  async function registerERC721(address: string): Promise<boolean> {
    for (const contract of contracts) {
      if (address == contract.address) return false
    }
    contracts.push(await newERC721(address))
    return true
  }

  async function listPaymentTokens(): Promise<ERC20[]> {
    const contracts: ERC20[] = []
    switch (network) {
      case 'main':
        contracts.push(await newERC20('0x6B175474E89094C44Da98b954EedeAC495271d0F')) // DAI
        contracts.push(await newERC20('0xdAC17F958D2ee523a2206206994597C13D831ec7')) // USDT
        contracts.push(await newERC20('0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599')) // WBTC
        contracts.push(await newERC20('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')) // WETH
        break
      case 'ropsten':
        contracts.push(await newERC20('0xF2dA2EBfE236e067FB97409f558c5Bef41081577')) // BUK
        break
      case 'rinkeby':
        contracts.push(await newERC20('0xF2dA2EBfE236e067FB97409f558c5Bef41081577')) // BUK
        break
      case 'kovan':
        contracts.push(await newERC20('0xF2dA2EBfE236e067FB97409f558c5Bef41081577')) // BUK
        break
      case 'goerli':
        contracts.push(await newERC20('0xF2dA2EBfE236e067FB97409f558c5Bef41081577')) // BUK
        break
    }
    return contracts
  }

  async function listNonFungibleTokens(): Promise<ERC721[]> {
    const contracts: ERC721[] = []
    switch (network) {
      case 'main':
        // contracts.push(await newERC721('0x06012c8cf97BEaD5deAe237070F9587f8E7A266d')) // CK
        contracts.push(await newERC721('0xc1Caf0C19A8AC28c41Fe59bA6c754e4b9bd54dE9')) // CriptoSkulls
        // contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')) // ENS
        contracts.push(await newERC721('0x959e104E1a4dB6317fA58F8295F586e1A978c297')) // EST
        contracts.push(await newERC721('0x4F41d10F7E67fD16bDe916b4A6DC3Dd101C57394')) // FLOWER
        // contracts.push(await newERC721('0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d')) // LAND
        contracts.push(await newERC721('0xFBeef911Dc5821886e1dda71586d90eD28174B7d')) // KODA
        contracts.push(await newERC721('0x913ae503153d9A335398D0785Ba60A2d63dDB4e2')) // PARCEL
        contracts.push(await newERC721('0x22C1f6050E56d2876009903609a2cC3fEf83B415')) // POAP
        contracts.push(await newERC721('0x60F80121C31A0d46B5279700f9DF786054aa5eE5')) // RARI
        contracts.push(await newERC721('0xb932a70A57673d89f4acfFBE830E8ed7f75Fb9e0')) // SUPR

        contracts.push(await newERC721('0x0E3A2A1f2146d86A604adc220b4967A898D7Fe07')) // Gods Unchained Cards
        contracts.push(await newERC721('0x8853B05833029e3Cf8d3Cbb592f9784FA43d2a79')) // Codex Record
        contracts.push(await newERC721('0x2C115fD47e9aa566176586A07847CCF2dE678e28')) // Mintbase
        contracts.push(await newERC721('0x8cF3D6bBaEad351BdD4533691855d08B2d814a2D')) // BAEV
        contracts.push(await newERC721('0xb77e25AcBf8e75A91bf468120C5789534A4dCE52')) // Koda
        contracts.push(await newERC721('0x629A673A8242c2AC4B7B8C5D8735fbeac21A6205')) // SORARE
        contracts.push(await newERC721('0xD1E5b0FF1287aA9f9A268759062E4Ab08b9Dacbe')) // .CRYPTO
        contracts.push(await newERC721('0x273f7F8E6489682Df756151F5525576E322d51A3')) // My Crypto Heros
        contracts.push(await newERC721('0xC03844f07F86AD1D90a1c4A2A8204Dcf00F3a991')) // Brave Frontier Heros
        contracts.push(await newERC721('0xd7431870AdA2F9F0053180610974f63bf8E9F504')) // Non Fungible Gerbils
        contracts.push(await newERC721('0x67cBBb366a51FFf9ad869d027E496Ba49f5f6D55')) // Crypto Spels
        contracts.push(await newERC721('0x959e104E1a4dB6317fA58F8295F586e1A978c297')) // F1 Delta Time
        contracts.push(await newERC721('0x1d963688FE2209A98dB35C67A041524822Cf04ff')) // Marble
        contracts.push(await newERC721('0xDF74156420Bd57ab387B195ed81EcA36F9fABAca')) // ExitNFT
        contracts.push(await newERC721('0xFf488FD296c38a24CCcC60B43DD7254810dAb64e')) // Zed ZT Token
        contracts.push(await newERC721('0xDC76a2DE1861Ea49E8b41A1De1E461085E8F369F')) // TerraVirtuaNFT
        contracts.push(await newERC721('0xdceaf1652a131F32a821468Dc03A92df0edd86Ea')) // My Crypto Heroes Extension
        contracts.push(await newERC721('0x50f5474724e0Ee42D9a4e711ccFB275809Fd6d4a')) // Sandbox's Lands
        contracts.push(await newERC721('0x6Fa769EED284a94A73C15299e1D3719B29Ae2F52')) // BFH:Unit
        contracts.push(await newERC721('0x25710B50E1Db29d38e2E25e39eb4d7e6e22E81A1')) // Whale Shark
        contracts.push(await newERC721('0xa7f87E8D193E29bf1eD050Fdd511B79Fe0264d8B')) // Crypto stampm Edition 2
        contracts.push(await newERC721('0xf67f2b39652019C9A00D54540480ebb0FAe593F2')) // Ark Gallery
        contracts.push(await newERC721('0xb6dAe651468E9593E4581705a09c10A76AC1e0c8')) // Async Art
        contracts.push(await newERC721('0xF06059F01F6f08a603c939359a0A1186F7687685')) // MCP Citizen
        contracts.push(await newERC721('0xb33D6C9487d7445B1996be15D67883D16fBdcE07')) // DCL Plazas
        break
      case 'ropsten':
        // contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')) // ENS
        contracts.push(await newERC721('0x124bf28A423B2CA80B3846c3AA0eB944FE7EbB95')) // EST
        // contracts.push(await newERC721('0x7A73483784ab79257bB11B96Fd62A2C3AE4Fb75B')) // LAND
        contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')) // KIE
        contracts.push(await newERC721('0x29a3f97E9AC395E2E1BFa789bbBbb5468E6022af')) // KODA
        break
      case 'rinkeby':
        // contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')) // ENS
        // contracts.push(await newERC721('0x28bEf22DF3e2040A4bE64A9Ca0e8b5Ae2B91462D')) // LAND
        contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')) // KIE
        contracts.push(await newERC721('0x2Df6816286c583A7EF8637CD4b7Cc1CC62F6161E')) // KODA
        contracts.push(await newERC721('0x913ae503153d9A335398D0785Ba60A2d63dDB4e2')) // PARCEL
        break
      case 'kovan':
        // contracts.push(await newERC721('0x537263c440943f6a6808bCb8CcB3fe03EE838aD1')) // LAND
        contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')) // KIE
        break
      case 'goerli':
        // contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')) // ENS
        contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')) // KIE
        break
    }
    return contracts
  }

  return {
    network,
    getAccounts,
    selectAccount,
    validateAddress,
    getEtherBalance,
    listAccountShares,
    listAccountItems,
    retrieveItem,
    retrieveShares,
    registerERC721,
    listPaymentTokens
  }
}
