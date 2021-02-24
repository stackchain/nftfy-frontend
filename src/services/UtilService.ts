import * as Sentry from '@sentry/react'
import axios from 'axios'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import erc721Abi from '../abi/erc721.json'
import { Paged } from '../types/UtilTypes'

export default function paginator<T>(items: T[], current_page: number, per_page_items: number): Paged<T[]> {
  const page = current_page || 1
  const per_page = per_page_items || 10
  const offset = (page - 1) * per_page

  const paginatedItems = items ? items.slice(offset).slice(0, per_page_items) : []
  const total_pages = items ? Math.ceil(items.length / per_page) : 0

  return {
    page,
    per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages,
    data: paginatedItems
  }
}
export const getErc721OpenSeaMetadata = async (address: string, tokenId: string, web3: Web3) => {
  const contractErc2721 = new web3.eth.Contract(erc721Abi as AbiItem[], address)
  const tokenUri = await contractErc2721.methods.tokenURI(tokenId).call()

  try {
    const metadata = await axios.get<{
      description: string
      image: string
      name: string
    }>(tokenUri)

    const { name, description, image } = metadata.data
    return { description, image_url: image, name, address, tokenId }
  } catch (error) {
    Sentry.captureException(error)
  }

  return { description: '', image_url: '', name: '', address, tokenId }
}
