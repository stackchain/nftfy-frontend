export interface CustomPool {
  erc721: {
    contract: string
    tokenId: string | undefined
    disabled?: boolean
  }
  pool: {
    name: string
    contract: string
  }
}

export interface PoolItem {
  nft: string
  image_url: string
  assets: string
  liquidity: number
  shares: number
  actions: {
    contract: string
    poolLink: string
  }
}
