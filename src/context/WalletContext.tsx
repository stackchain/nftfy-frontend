import React, { useCallback, useEffect, useState } from 'react'
import { ERC20, ERC721Item, initializeWallet, listSupportedWallets, Wallet, WalletName } from '../services/api'

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
  accountShares: ERC20[]
  setAccountShares: (accountShares: ERC20[]) => void
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
  accountShares: [],
  setAccountShares: () => null
})

export default function WalletContextWrapper(props: React.PropsWithChildren<{}>) {
  const { children } = props

  const [walletName, setWalletName] = useState<WalletName | undefined>(undefined)
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined)
  const [accounts, setAccounts] = useState<string[]>([])
  const [accountIndex, setAccountIndex] = useState<number>(0)
  const [accountShares, setAccountShares] = useState<ERC20[]>([])
  const [accountItems, setAccountItems] = useState<ERC721Item[]>([])
  const [rehydrate, setRehydrate] = useState(true)

  const persistOffline = useCallback(() => {
    if (!rehydrate) {
      if (walletName !== undefined) localStorage.setItem('walletName', walletName)
      if (accountIndex !== undefined) localStorage.setItem('accountIndex', JSON.stringify(accountIndex))
    }
  }, [walletName, accountIndex, rehydrate])

  useEffect(() => {
    persistOffline()
  }, [persistOffline])

  const rehydrateOffline = useCallback(async () => {
    if (rehydrate) {
      const supportedWallets = await listSupportedWallets()

      const walletNameStorage = localStorage.getItem('walletName')

      if (walletNameStorage && supportedWallets.includes(walletNameStorage as WalletName)) {
        const walletStorage = await initializeWallet(walletNameStorage as WalletName)
        const accountsStorage = await walletStorage.getAccounts()

        if (accountsStorage[0]) {
          walletStorage.selectAccount(accountsStorage[0])
        }

        setWallet(walletStorage)
        setWalletName(walletNameStorage as WalletName)
        setAccounts(accountsStorage)

        const accountIndexStorage = localStorage.getItem('accountIndex')
        if (accountIndexStorage) setAccountIndex(Number(JSON.parse(accountIndexStorage)))
      }

      setRehydrate(false)
    }
  }, [rehydrate])

  useEffect(() => {
    rehydrateOffline()
  }, [rehydrateOffline])

  if (rehydrate) return null

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
        accountShares,
        setAccountShares
      }}>
      {children}
    </WalletContext.Provider>
  )
}
