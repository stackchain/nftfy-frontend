import * as Sentry from '@sentry/react'
import axios from 'axios'
import BigNumber from 'bignumber.js'
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

export const getErc721Metadata = async (address: string, tokenId: string, web3: Web3) => {
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

export function scale(input: BigNumber, decimalPlaces: number): BigNumber {
  const scalePow = new BigNumber(decimalPlaces.toString())
  const scaleMul = new BigNumber(10).pow(scalePow)
  return input.times(scaleMul)
}

export function valid(amount: string, decimals: number): boolean {
  const regex = new RegExp(`^\\d+${decimals > 0 ? `(\\.\\d{1,${decimals}})?` : ''}$`)
  return regex.test(amount)
}

export function units(coinsValue: string, decimals: number): string {
  if (!valid(coinsValue, decimals)) throw new Error('Invalid amount')
  let i = coinsValue.indexOf('.')
  if (i < 0) i = coinsValue.length
  const s = coinsValue.slice(i + 1)
  return coinsValue.slice(0, i) + s + '0'.repeat(decimals - s.length)
}

export function coins(unitsValue: string, decimals: number): string {
  if (!valid(unitsValue, 0)) throw new Error('Invalid amount')
  if (decimals === 0) return unitsValue
  const s = unitsValue.padStart(1 + decimals, '0')
  return `${s.slice(0, -decimals)}.${s.slice(-decimals)}`
}
