import { SOR } from '@balancer-labs/sor'
import { Swap } from '@balancer-labs/sor/dist/types'
import { InfuraProvider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { flatten } from 'lodash'
import { AbiItem } from 'web3-utils'
import erc20SharesAbi from '../abi/erc20shares.json'
import erc721Abi from '../abi/erc721.json'
import erc721WrappedAbi from '../abi/erc721wrapped.json'
import nftfyAbi from '../abi/nftfy.json'
import { getConfigByChainId } from '../config'
import { chainIdVar } from '../graphql/variables/WalletVariable'
import { MarketplaceERC20Item } from '../types/MarketplaceTypes'
import { Paged } from '../types/UtilTypes'
import paginator, { getErc721Metadata, scale } from './UtilService'
import { initializeWeb3 } from './WalletService'

const { erc721Addresses, nftfyAddress } = getConfigByChainId(chainIdVar())

export const getMarketplaceItems = async (page?: number, limit?: number): Promise<Paged<MarketplaceERC20Item[]>> => {
  const web3 = initializeWeb3('infura')

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

  for (let i = 0; i < addressesWrappedERC721.length; i += 1) {
    erc20Promises.push(getErc20(addressesWrappedERC721[i]))
  }

  const erc20 = flatten(await Promise.all(erc20Promises))
  const getERC20Metadata = async (addressErc20: string): Promise<MarketplaceERC20Item> => {
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], addressErc20)
    const erc20Name = await contractErc20Shares.methods.name().call()
    const tokenId = await contractErc20Shares.methods.tokenId().call()
    const symbol = await contractErc20Shares.methods.symbol().call()
    const erc721Wrapper = await contractErc20Shares.methods.wrapper().call()

    const contractWrapperErc721 = new web3.eth.Contract(erc721WrappedAbi as AbiItem[], erc721Wrapper)
    const securitized = await contractWrapperErc721.methods.securitized(tokenId).call()
    const erc721Address = await contractWrapperErc721.methods.target().call()

    return {
      address: addressErc20,
      name: erc20Name,
      symbol,
      securitized,
      erc721: {
        address: erc721Address,
        tokenId,
        wrapper: erc721Wrapper,
        image_url: '',
        description: '',
        name: '',
        symbol: ''
      }
    }
  }

  const erc20WithMetadataPromises: Promise<MarketplaceERC20Item>[] = []

  for (let i = 0; i < erc20.length; i += 1) {
    erc20WithMetadataPromises.push(getERC20Metadata(erc20[i]))
  }

  const erc20WithMetadata = flatten(await Promise.all(erc20WithMetadataPromises)).filter(erc20Item => erc20Item.securitized)
  const erc20Paginated = paginator(erc20WithMetadata, page || 1, limit || 12)

  const getERC20Images = async (erc20Item: MarketplaceERC20Item) => {
    const { description, image_url, name } = await getErc721Metadata(erc20Item.erc721.address, erc20Item.erc721.tokenId, web3)

    return {
      ...erc20Item,
      erc721: {
        ...erc20Item.erc721,
        image_url,
        description,
        name
      }
    }
  }

  const erc20WithImagesPromises: Promise<MarketplaceERC20Item>[] = []
  erc20Paginated.data.forEach(erc20Item => erc20WithImagesPromises.push(getERC20Images(erc20Item)))
  const erc20WithImages = await Promise.all(erc20WithImagesPromises)

  return { ...erc20Paginated, data: erc20WithImages }
}

export const getMarketplaceItemByAddress = async (erc20Address: string): Promise<MarketplaceERC20Item> => {
  const web3 = initializeWeb3('infura')

  const getERC20Metadata = async (address: string): Promise<MarketplaceERC20Item> => {
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], address)
    const erc20Name = await contractErc20Shares.methods.name().call()
    const tokenId = await contractErc20Shares.methods.tokenId().call()
    const symbol = await contractErc20Shares.methods.symbol().call()
    const erc721Wrapper = await contractErc20Shares.methods.wrapper().call()

    const contractWrapperErc721 = new web3.eth.Contract(erc721WrappedAbi as AbiItem[], erc721Wrapper)
    const securitized = await contractWrapperErc721.methods.securitized(tokenId).call()
    const erc721Address = await contractWrapperErc721.methods.target().call()
    const contractErc721 = new web3.eth.Contract(erc721Abi as AbiItem[], erc721Address)
    const symbolErc721 = await contractErc721.methods.symbol().call()

    const erc721Metadata = await getErc721Metadata(erc721Address, tokenId, web3)
    return {
      address,
      name: erc20Name,
      symbol,
      securitized,
      erc721: {
        name: erc721Metadata.name,
        address: erc721Address,
        tokenId,
        wrapper: erc721Wrapper,
        image_url: erc721Metadata.image_url,
        description: erc721Metadata.description,
        symbol: symbolErc721
      }
    }
  }

  const erc20 = await getERC20Metadata(erc20Address)
  return erc20
}

// Balancer
let sor: SOR | undefined

export async function balancerSyncPools() {
  const { id, balancer, name } = getConfigByChainId(chainIdVar())
  const { subgraphBackupUrl } = balancer
  const provider = new InfuraProvider(name, process.env.REACT_APP_INFURA_KEY)
  const gasPrice = new BigNumber(process.env.REACT_APP_GAS_PRICE || 100000000000)
  const maxPools = 4

  const poolsUrl = `${subgraphBackupUrl}?timestamp=${Date.now()}`
  sor = new SOR(provider, gasPrice, maxPools, id, poolsUrl)
  await sor.fetchPools()
}

export async function balancerAssetQuote(
  assetInAddress: string,
  assetInDecimals: number,
  assetOutAddress: string,
  assetOutDecimals: number,
  swapType: 'swapExactIn' | 'swapExactOut',
  amount: string
): Promise<{ exitAmount: string; slippage: number; tradeSwaps: Swap[][] } | null> {
  const { balancer } = getConfigByChainId(chainIdVar())
  const { precision } = balancer

  if (sor) {
    await sor.setCostOutputToken(assetOutAddress)

    if (swapType === 'swapExactIn' && sor) {
      const assetInAmountRaw = new BigNumber(amount)
      const assetInAmount = scale(assetInAmountRaw, assetInDecimals)

      const [tradeSwaps, tradeAmount, spotPrice] = await sor.getSwaps(assetInAddress, assetOutAddress, swapType, assetInAmount)

      const assetOutAmountRaw = scale(tradeAmount, -assetOutDecimals)
      const assetOutPrecision = precision

      const exitAmount = assetOutAmountRaw.toFixed(assetOutPrecision, BigNumber.ROUND_DOWN)
      let slippage = 0

      if (tradeSwaps.length > 0) {
        const price = assetInAmount.div(tradeAmount).times('1e18')
        const slippageNumber = price.div(spotPrice).minus(1)
        slippage = slippageNumber.isNegative() ? 0.00001 : slippageNumber.toNumber()
      }

      // eslint-disable-next-line no-console
      console.log('swapExactIn', exitAmount, slippage, tradeSwaps)
      return { exitAmount, slippage, tradeSwaps }
    }
    if (swapType === 'swapExactOut' && sor) {
      const assetOutAmountRaw = new BigNumber(amount)
      const assetOutAmount = scale(assetOutAmountRaw, assetOutDecimals)

      const [tradeSwaps, tradeAmount, spotPrice] = await sor.getSwaps(assetInAddress, assetOutAddress, swapType, assetOutAmount)

      const assetInAmountRaw = scale(tradeAmount, -assetInDecimals)
      const assetInPrecision = precision

      const exitAmount = assetInAmountRaw.toFixed(assetInPrecision, BigNumber.ROUND_UP)
      let slippage = 0

      if (tradeSwaps.length > 0) {
        slippage = 0
      } else {
        const price = tradeAmount.div(assetOutAmount).times('1e18')
        const slippageNumber = price.div(spotPrice).minus(1)
        slippage = slippageNumber.isNegative() ? 0.00001 : slippageNumber.toNumber()
      }

      // eslint-disable-next-line no-console
      console.log('swapExactOut', exitAmount, slippage, tradeSwaps)
      return { exitAmount, slippage, tradeSwaps }
    }
  }

  return null
}
