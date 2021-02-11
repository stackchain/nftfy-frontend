export interface MarketplaceERC20Item {
  address: string
  name: string
  symbol: string
  securitized: boolean
  erc721: {
    wrapper: string
    address: string
    tokenId: string
    description: string
    image_url: string
    name: string
  }
}
