import React, { useCallback, useEffect, useState } from 'react'
import { ERC721Item, Wallet, WalletName } from '../services/api'

export const WalletContext = React.createContext<{
  walletName: WalletName | undefined
  setWalletName: (walletName: WalletName) => void
  wallet: Wallet | undefined
  setWallet: (wallet: Wallet) => void
  accounts: string[]
  setAccounts: (accounts: string[]) => void
  accountIndex: number
  setAccountIndex: (index: number) => void
  accountItems: ERC721Item[]
  setAccountItems: (accountItems: ERC721Item[]) => void
  syncAccountItem: string | undefined
  setSyncAccountItem: (address: string) => void
}>({
  walletName: undefined,
  setWalletName: () => null,
  wallet: undefined,
  setWallet: () => null,
  accounts: [],
  setAccounts: () => null,
  accountIndex: 0,
  setAccountIndex: () => null,
  accountItems: [],
  setAccountItems: () => null,
  syncAccountItem: undefined,
  setSyncAccountItem: () => null
})

export default function WalletContextWrapper(props: React.PropsWithChildren<{}>) {
  const { children } = props

  const [walletName, setWalletName] = useState<WalletName | undefined>(undefined)
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined)
  const [accounts, setAccounts] = useState<string[]>([])
  const [accountIndex, setAccountIndex] = useState<number>(0)
  const [accountItems, setAccountItems] = useState<ERC721Item[]>([])
  const [syncAccountItem, setSyncAccountItem] = useState<string | undefined>(undefined)

  const shouldSyncAccountItem = useCallback(async () => {
    if (syncAccountItem && wallet) {
      await wallet.listAccountItems(syncAccountItem, 0, 9)
      setSyncAccountItem(undefined)
    }
  }, [syncAccountItem, wallet])

  useEffect(() => {
    shouldSyncAccountItem()
  }, [shouldSyncAccountItem])

  return (
    <WalletContext.Provider
      value={{
        walletName,
        setWalletName,
        wallet,
        setWallet,
        accounts,
        setAccounts,
        accountIndex,
        setAccountIndex,
        accountItems,
        setAccountItems,
        syncAccountItem,
        setSyncAccountItem
      }}>
      {children}
    </WalletContext.Provider>
  )
}
