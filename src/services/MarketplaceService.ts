import axios from 'axios'
import { flatten } from 'lodash'
import { AbiItem } from 'web3-utils'
import erc20SharesAbi from '../abi/erc20shares.json'
import erc721WrappedAbi from '../abi/erc721wrapped.json'
import nftfyAbi from '../abi/nftfy.json'
import { addressesERC721Mainnet, addressNftfyMainnet, addressNfyMainnet } from '../contracts/mainnet'
import { addressesERC721Rinkeby, addressNftfyRinkeby, addressNfyRinkeby } from '../contracts/rinkeby'
import { chainIdVar } from '../graphql/variables/WalletVariable'
import { MarketplaceERC20Item } from '../types/MarketplaceTypes'
import { Paged } from '../types/UtilTypes'
import { initializeWeb3 } from './NftfyService'
import { notifyWarning } from './NotificationService'
import paginator from './UtilService'

export const erc721Addresses = chainIdVar() === 1 ? addressesERC721Mainnet : addressesERC721Rinkeby
export const nftfyAddress = chainIdVar() === 1 ? addressNftfyMainnet : addressNftfyRinkeby
export const nfyAddress = chainIdVar() === 1 ? addressNfyMainnet : addressNfyRinkeby

const getErc20OpenSeaMetadata = async (address: string, tokenId: string) => {
  let name = ''
  let description = ''
  let image_url = ''

  try {
    const metadata = await axios.get<{ description: string; image_url: string; name: string }>(
      `https://rinkeby-api.opensea.io/api/v1/asset/${address}/${tokenId}/`
    )

    name = metadata.data.name
    description = metadata.data.description
    image_url = metadata.data.image_url
  } catch (error) {
    notifyWarning(`getErc721OpenSeaMetadata - not found - ${address} ${tokenId}`)
  }

  return { description, image_url, name }
}

export const getMarketplaceItems = async (page?: number, limit?: number): Promise<Paged<MarketplaceERC20Item[]>> => {
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

    const { description, image_url, name } = await getErc20OpenSeaMetadata(erc721Address, tokenId)

    return {
      address: addressErc20,
      name: erc20Name,
      symbol,
      securitized,
      erc721: {
        address: erc721Address,
        tokenId,
        wrapper: erc721Wrapper,
        image_url,
        description,
        name
      }
    }
  }

  const erc20WithMetadataPromises: Promise<MarketplaceERC20Item>[] = []

  for (let i = 0; i < erc20.length; i += 1) {
    erc20WithMetadataPromises.push(getERC20Metadata(erc20[i]))
  }

  const erc20Items = flatten(await Promise.all(erc20WithMetadataPromises)).filter(erc20Item => erc20Item.securitized)
  return paginator(erc20Items, page || 1, limit || 12)
}

export const getMarketplaceItemByAddress = async (erc20Address: string): Promise<MarketplaceERC20Item> => {
  const web3 = initializeWeb3()

  const getERC20Metadata = async (address: string): Promise<MarketplaceERC20Item> => {
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], address)
    const erc20Name = await contractErc20Shares.methods.name().call()
    const tokenId = await contractErc20Shares.methods.tokenId().call()
    const symbol = await contractErc20Shares.methods.symbol().call()
    const erc721Wrapper = await contractErc20Shares.methods.wrapper().call()

    const contractWrapperErc721 = new web3.eth.Contract(erc721WrappedAbi as AbiItem[], erc721Wrapper)
    const securitized = await contractWrapperErc721.methods.securitized(tokenId).call()
    const erc721Address = await contractWrapperErc721.methods.target().call()

    const { description, image_url, name } = await getErc20OpenSeaMetadata(erc721Address, tokenId)

    return {
      address,
      name: erc20Name,
      symbol,
      securitized,
      erc721: {
        name,
        address: erc721Address,
        tokenId,
        wrapper: erc721Wrapper,
        image_url,
        description
      }
    }
  }

  const erc20 = await getERC20Metadata(erc20Address)
  return erc20
}
