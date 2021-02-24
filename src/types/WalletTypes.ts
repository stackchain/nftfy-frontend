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
  totalSupply: number
  exitPrice: number
  paymentToken: string
  vaultBalance: number
  vaultBalanceWallet: number
  released: boolean
  symbol: string

  erc721: {
    wrapper: string
    address: string
    tokenId: string
    description: string
    imageUrl: string
    name: string
  }

  financial: {
    exitPriceDollar: number
    price: number
    change: number
    balanceDollar: number
  }
}

export interface WalletItem {
  erc721?: WalletErc721Item
  erc20?: WalletERC20Item
}
