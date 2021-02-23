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
  description: string
  tokenId: number
  totalSupply: number
  exitPrice: number
  exitPriceDollar: number
  paymentToken: string
  vaultBalance: number
  vaultBalanceWallet: number
  price: number
  change: number
  balanceDollar: number
  released: boolean
}

export interface WalletItem {
  erc721?: WalletErc721Item
  erc20?: WalletERC20Item
}
