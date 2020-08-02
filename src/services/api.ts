export type WalletName = 'metamask' | 'portis'

export interface Wallet {
  getAccounts(): Promise<string[]>
  validateAddress(address: string): Promise<boolean>
  getEtherBalance(address: string): Promise<string>
  listAccountShares(address: string, offset: number, limit: number): Promise<{ items: ERC20[]; count: number }>
  listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>
  registerERC721(address: string): Promise<void>
  listPaymentTokens(): Promise<ERC20[]>
}

export interface ERC20 {
  address: string
  name: string
  symbol: string
  decimals: number
  getTotalSupply(): Promise<string>
  getAccountBalance(address: string): Promise<string>
  validateAmount(amount: string): Promise<boolean>

  // Nftfy extensions
  getPaymentToken(): Promise<ERC20 | null>
  getExitPrice(): Promise<string>
  getSharePrice(): Promise<string>

  isRedeemable(): Promise<boolean>
  getAccountRedeemAmount(address: string): Promise<string>
  redeem(address: string): Promise<void>

  isClaimable(): Promise<boolean>
  getVaultBalance(): Promise<string>
  getAccountVaultBalance(address: string): Promise<string>
  claim(address: string): Promise<void>
}

export interface ERC721 {
  address: string
  name: string
  symbol: string
  getItem(tokenId: string): Promise<ERC721Item>
  listAllItems(offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>
  listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>
}

export interface ERC721Item {
  tokenId: number
  name?: string
  description?: string
  imageUri?: string
  getTokenOwner(): Promise<string>

  // Nftfy extensions
  isSecuritized(): Promise<boolean>
  listAllShares(offset: number, limit: number): Promise<{ items: ERC20[]; count: number }>
  securitize(shareCount: string, exitPrice: string, paymentToken?: ERC20): Promise<void>
}

export async function listSupportedWallets(): Promise<WalletName[]> {
  throw new Error('Unimplemented')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function initializeWallet(walletName: WalletName): Promise<Wallet> {
  throw new Error('Unimplemented')
}
