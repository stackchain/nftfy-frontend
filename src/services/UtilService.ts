import { MarketplaceERC20Item } from '../types/MarketplaceTypes'
import { Paged } from '../types/UtilTypes'

export default function paginator(
  items: MarketplaceERC20Item[],
  current_page: number,
  per_page_items: number
): Paged<MarketplaceERC20Item[]> {
  const page = current_page || 1
  const per_page = per_page_items || 10
  const offset = (page - 1) * per_page

  const paginatedItems = items.slice(offset).slice(0, per_page_items)
  const total_pages = Math.ceil(items.length / per_page)

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
