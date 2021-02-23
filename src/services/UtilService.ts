import * as Sentry from '@sentry/react'
import axios from 'axios'
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
export const getErc721OpenSeaMetadata = async (address: string, tokenId: string) => {
  try {
    const metadata = await axios.get<{
      address: string
      description: string
      image_url: string
      name: string
      symbol: string
      asset_contract: { symbol: string }
    }>(`https://rinkeby-api.opensea.io/api/v1/asset/${address}/${tokenId}`)

    const { name, description, image_url } = metadata.data
    const { symbol } = metadata.data.asset_contract

    return { description, image_url, name, symbol, tokenId, address }
  } catch (error) {
    Sentry.captureException(error)
  }

  return { description: '', image_url: '', name: '', symbol: '', tokenId, address }
}
