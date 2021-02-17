import detectEthereumProvider from '@metamask/detect-provider'
import * as Sentry from '@sentry/react'
import axios from 'axios'
import { flatten } from 'lodash'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import erc20SharesAbi from '../abi/erc20shares.json'
import erc721Abi from '../abi/erc721.json'
import erc721WrappedAbi from '../abi/erc721wrapped.json'
import nftfyAbi from '../abi/nftfy.json'
import { addressesERC721Mainnet, addressInfuraMainnet, addressNftfyMainnet, addressNfyMainnet } from '../contracts/mainnet'
import { addressesERC721Rinkeby, addressInfuraRinkeby, addressNftfyRinkeby, addressNfyRinkeby } from '../contracts/rinkeby'
import { accountVar, chainIdVar, connectWalletModalVar, nfyVar, setAccount, setChainId } from '../graphql/variables/WalletVariable'
import { code } from '../messages'
import { WalletERC20Item, WalletErc721Item, WalletItem } from '../types/WalletTypes'
import { notifyError, notifyWarning } from './NotificationService'
import paginator from './UtilService'

export const erc721Addresses = chainIdVar() === 1 ? addressesERC721Mainnet : addressesERC721Rinkeby
export const nftfyAddress = chainIdVar() === 1 ? addressNftfyMainnet : addressNftfyRinkeby
export const nfyAddress = chainIdVar() === 1 ? addressNfyMainnet : addressNfyRinkeby
export const infuraAddress = chainIdVar() === 1 ? addressInfuraMainnet : addressInfuraRinkeby

export const initializeWeb3 = () => {
  window.ethereum && (window.ethereum as { request: ({ method }: { method: string }) => void }).request({ method: 'eth_requestAccounts' })
  return new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/4add15ca294d449fb8eca92ad07ec0dd'))
}

export const initializeMetamaskWallet = async () => {
  const ethProvider = await detectEthereumProvider()
  if (ethProvider) {
    startApp(ethProvider)
  } else {
    notifyError(code[5003])
  }
}

const startApp = async (ethProvider: unknown) => {
  if (ethProvider !== window.ethereum) {
    notifyError(code[5002])
  }
  await connect()
}

const connect = async () => {
  try {
    if (window.ethereum) {
      const accounts = await (window.ethereum as { request: (args: { method: string }) => Promise<string[]> }).request({
        method: 'eth_requestAccounts'
      })
      if (accounts[0]) {
        setAccount(accounts[0])
        const nfy = await getNfyBalance(accounts[0])
        nfyVar(nfy.balance)
      } else {
        notifyError(code[5004])
      }

      const chainId = await (window.ethereum as { request: (args: { method: string }) => Promise<string> }).request({
        method: 'eth_chainId'
      })

      if (chainId) {
        setChainId(parseInt(chainId, 16))
      } else {
        notifyError(code[5006])
      }
    } else {
      notifyWarning(code[5004])
    }
  } catch (error) {
    if (error.code === 4001) {
      notifyError(code[5001], error)
    }
  }
}

export const walletAutoConnect = async () => {
  const account = window.localStorage.getItem('account')
  account && setAccount(account)

  const chainId = Number(window.localStorage.getItem('chainId'))
  chainId && setChainId(chainId)
  if (account && chainId) {
    const ethProvider = await detectEthereumProvider()
    startApp(ethProvider)
  }

  walletListenEvents()
}

export const walletListenEvents = () => {
  window.ethereum &&
    (window.ethereum as { on: (eventKey: string, callback: (accounts: string[]) => void) => void }).on('accountsChanged', handleAccounts)

  window.ethereum &&
    (window.ethereum as { on: (eventKey: string, callback: (chainId: string) => void) => void }).on('chainChanged', handleChainChanged)
}

const handleAccounts = async (accounts: string[]) => {
  if (accounts.length > 0) {
    const currentAccount = accountVar()
    currentAccount && accounts[0] !== currentAccount && notifyWarning(code[5008])
    setAccount(accounts[0])
    const nfy = await getNfyBalance(accounts[0])
    nfyVar(nfy.balance)
  } else {
    notifyWarning(code[5007])
    setAccount(undefined)
    setChainId(undefined)
    connectWalletModalVar(undefined)
    nfyVar(undefined)
  }
}

const handleChainChanged = (chainId: string) => {
  if (chainId) {
    const currentChainId = chainIdVar()
    parseInt(chainId, 16) !== currentChainId && notifyWarning(code[5009])
    setChainId(parseInt(chainId, 16))
  }
}

const getErc721OpenSeaMetadata = async (address: string, tokenId: string) => {
  try {
    const metadata = await axios.get<{ description: string; image_url: string }>(
      `https://rinkeby-api.opensea.io/api/v1/asset/${address}/${tokenId}`
    )
    const { description, image_url } = metadata.data

    return { address, tokenId, description, image_url }
  } catch (error) {
    Sentry.captureException(error)
  }

  return { address, tokenId, description: '', image_url: '' }
}

export const getERC721Items = async (walletAddress: string): Promise<WalletErc721Item[]> => {
  const web3 = initializeWeb3()

  const getERC721Item = async (addressERC721: string) => {
    let erc721Items: WalletErc721Item[] = []
    const contractERC721 = new web3.eth.Contract(erc721Abi as AbiItem[], addressERC721)

    const totalTokens = await contractERC721.methods.balanceOf(walletAddress).call()

    const name = await contractERC721.methods.name().call()
    const symbol = await contractERC721.methods.symbol().call()

    const tokensIdsPromises = []

    for (let i = 0; i < totalTokens; i += 1) {
      tokensIdsPromises.push(contractERC721.methods.tokenOfOwnerByIndex(walletAddress, i).call())
    }

    const tokensIds = await Promise.all(tokensIdsPromises)

    tokensIds.forEach(tokenId => {
      erc721Items.push({
        address: addressERC721,
        tokenId,
        name,
        symbol
      })
    })

    const erc721ItemsMetadataPromises: Promise<{
      address: string
      tokenId: string
      description: string
      image_url: string
    }>[] = []

    erc721Items.forEach(erc721Item => erc721ItemsMetadataPromises.push(getErc721OpenSeaMetadata(erc721Item.address, erc721Item.tokenId)))

    const erc721ItemsMetadata = await Promise.all(erc721ItemsMetadataPromises)

    erc721Items = erc721Items.map(erc721Item => {
      const metadata = erc721ItemsMetadata.find(
        erc721ItemMetadata => erc721Item.address === erc721ItemMetadata.address && erc721Item.tokenId === erc721ItemMetadata.tokenId
      )

      if (metadata) {
        const erc721ItemClone = { ...erc721Item }

        erc721ItemClone.image_url = metadata.image_url
        erc721ItemClone.description = metadata.description

        return erc721ItemClone
      }

      return erc721Item
    })

    return erc721Items
  }

  const erc721Promises: Promise<WalletErc721Item[]>[] = []

  erc721Addresses.forEach(addressERC721 => {
    erc721Promises.push(getERC721Item(addressERC721))
  })

  const erc721 = await Promise.all(erc721Promises)

  return flatten(erc721)
}

export const getPagedERC721Items = async (walletAddress: string, page?: number, limit?: number) => {
  const erc721Items = await getERC721Items(walletAddress)

  return paginator(erc721Items, page || 1, limit || 12)
}

export const getERC20Items = async (walletAddress: string): Promise<WalletItem[]> => {
  const web3 = initializeWeb3()

  const contractNftfy = new web3.eth.Contract(nftfyAbi as AbiItem[], nftfyAddress)

  const addressesWrappedERC721Promises: Promise<string>[] = []

  erc721Addresses.forEach(addressERC721 => addressesWrappedERC721Promises.push(contractNftfy.methods.wrappers(addressERC721).call()))

  const addressesWrappedERC721 = (await Promise.all(addressesWrappedERC721Promises)).filter(
    addressWrapped721 => addressWrapped721 !== '0x0000000000000000000000000000000000000000'
  )

  const getErc20 = async (addressERC721Wrapper: string): Promise<string[]> => {
    const contractWrapperErc721 = new web3.eth.Contract(erc721WrappedAbi as AbiItem[], addressERC721Wrapper)
    const historyLength = await contractWrapperErc721.methods.historyLength().call()
    const erc20Promises: Promise<string>[] = []

    for (let i = 0; i < historyLength; i += 1) {
      erc20Promises.push(contractWrapperErc721.methods.historyAt(i).call())
    }

    return Promise.all(erc20Promises)
  }

  const erc20Promises: Promise<string[]>[] = []

  for (let i = 0; i < addressesWrappedERC721.length; i += i) {
    erc20Promises.push(getErc20(addressesWrappedERC721[i]))
  }

  const erc20 = flatten(await Promise.all(erc20Promises))

  const getERC20Metadata = async (addressErc20: string): Promise<WalletERC20Item> => {
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], addressErc20)
    const balance = await contractErc20Shares.methods.balanceOf(walletAddress).call()
    const name = await contractErc20Shares.methods.name().call()
    const symbol = await contractErc20Shares.methods.symbol().call()

    return { address: addressErc20, name, symbol, balance }
  }

  const erc20WithBalancePromises: Promise<WalletERC20Item>[] = []

  for (let i = 0; i < erc20.length; i += 1) {
    erc20WithBalancePromises.push(getERC20Metadata(erc20[i]))
  }

  const erc20Items = flatten((await Promise.all(erc20WithBalancePromises)).filter(erc20Item => erc20Item.balance > 0))

  const walletItems: WalletItem[] = erc20Items.map(erc20Item => ({
    erc20: {
      address: erc20Item.address,
      name: erc20Item.name,
      symbol: erc20Item.symbol,
      balance: erc20Item.balance
    }
  }))

  const getErc721FromErc20 = async (erc20Item: WalletERC20Item): Promise<WalletItem> => {
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], erc20Item.address)

    const erc721TokenId = await contractErc20Shares.methods.tokenId().call()

    const wrappedErc721Address = await contractErc20Shares.methods.wrapper().call()
    const contractErc721Wrapped = new web3.eth.Contract(erc721WrappedAbi as AbiItem[], wrappedErc721Address)

    const erc721Address = await contractErc721Wrapped.methods.target().call()
    const contractErc721 = new web3.eth.Contract(erc721Abi as AbiItem[], erc721Address)

    const erc721Name = await contractErc721.methods.name().call()
    const erc721Symbol = await contractErc721.methods.symbol().call()

    const erc721metadata = await getErc721OpenSeaMetadata(erc721Address, erc721TokenId)

    return {
      erc721: {
        address: erc721Address,
        tokenId: erc721TokenId,
        name: erc721Name,
        symbol: erc721Symbol,
        image_url: erc721metadata.image_url,
        description: erc721metadata.description
      },
      erc20: erc20Item
    }
  }

  const walletItemsWithErc721Promises: Promise<WalletItem>[] = []

  walletItems.forEach(walletItem => {
    if (walletItem.erc20) {
      walletItemsWithErc721Promises.push(getErc721FromErc20(walletItem.erc20))
    }
  })

  const walletItemsWithErc721 = await Promise.all(walletItemsWithErc721Promises)
  return walletItemsWithErc721
}

export const getWalletItems = async (walletAddress: string): Promise<WalletItem[]> => {
  const items: WalletItem[] = []

  const erc721Items = await getERC721Items(walletAddress)
  const erc20Items = await getERC20Items(walletAddress)

  erc721Items.forEach(erc721Item => {
    items.push({
      erc721: erc721Item
    })
  })

  erc20Items.forEach(erc20Item => {
    items.push({
      erc721: erc20Item.erc721,
      erc20: erc20Item.erc20
    })
  })

  return items
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getERC20Shares = async (walletAddress: string): Promise<WalletItem[]> => {
  return []
}

export const getNfyBalance = async (walletAddress: string): Promise<{ balance: number }> => {
  const web3 = initializeWeb3()

  const contractNfy = new web3.eth.Contract(erc20SharesAbi as AbiItem[], nfyAddress)
  const balance = await contractNfy.methods.balanceOf(walletAddress).call()

  return { balance: Number(balance) / 10 ** 18 }
}
