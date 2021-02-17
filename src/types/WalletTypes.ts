export interface WalletErc721Item {
  address: string
  tokenId: string
  name: string
  description?: string
  symbol: string
  image_url?: string
}

export interface WalletERC20Item {
  address: string
  name: string
  symbol: string
  balance: number
}

export interface WalletERC20Share extends WalletERC20Item {
  imageUrl: string
  price: number
  change: number
  dollarBalance: number
  isClaimable: boolean
}

export interface WalletItem {
  erc721?: WalletErc721Item
  erc20?: WalletERC20Item
}
