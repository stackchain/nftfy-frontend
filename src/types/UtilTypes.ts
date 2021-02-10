export interface Paged<T> {
  page: number
  per_page: number
  pre_page: number | null
  next_page: number | null
  total: number
  total_pages: number
  data: T
}
