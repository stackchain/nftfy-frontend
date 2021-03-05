import { makeVar } from '@apollo/client'
import { MarketplaceERC20Item } from '../../types/MarketplaceTypes'

export const buyModalVar = makeVar<
  | {
      type: 'nft' | 'shares'
      item: MarketplaceERC20Item
    }
  | undefined
>(undefined)

export const poolsLoadedVar = makeVar<boolean>(false)
