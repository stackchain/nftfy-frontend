export interface MarketplaceERC20Item {
  address: string
  name: string
  symbol: string
  securitized: boolean
  decimals: number
  totalSupply: number
  exitPrice: number
  exitPriceDollar: number
  paymentToken: string | null
  paymentTokenSymbol: string
  vaultBalance: number
  erc721: {
    wrapper: string
    address: string
    tokenId: string
    description: string
    image_url: string
    name: string
    symbol: string
  }
}
export interface ERC20Asset {
  id: string
  name: string
  symbol: string
  address: string
  decimals: number
  imageUrl: string
  locked?: boolean
}
