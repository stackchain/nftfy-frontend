import React, { useCallback, useEffect, useState } from 'react'
import { useWalletAddressMock } from '../hooks/WalletHooks'
import { ERC20, ERC721Item, initializeWallet, listSupportedWallets, Wallet, WalletName } from '../services/api'
import { errorNotification } from '../services/notification'

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
  accountItemsCount: number
  setAccountItemsCount: (count: number) => void
  accountShares: ERC20[]
  setAccountShares: (accountShares: ERC20[]) => void
  accountSharesCount: number
  setAccountSharesCount: (count: number) => void
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
  accountItemsCount: 0,
  setAccountItemsCount: () => null,
  accountShares: [],
  setAccountShares: () => null,
  accountSharesCount: 0,
  setAccountSharesCount: () => null
})

export default function WalletContextWrapper(props: React.PropsWithChildren<{}>) {
  const { children } = props

  const walletAddressMock = useWalletAddressMock()

  const [walletName, setWalletName] = useState<WalletName | undefined>(undefined)
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined)
  const [accounts, setAccounts] = useState<string[]>([])
  const [accountIndex, setAccountIndex] = useState<number>(0)
  const [accountItems, setAccountItems] = useState<ERC721Item[]>([])
  const [accountItemsCount, setAccountItemsCount] = useState<number>(0)
  const [accountShares, setAccountShares] = useState<ERC20[]>([])
  const [accountSharesCount, setAccountSharesCount] = useState<number>(0)
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
        try {
          const walletStorage = await initializeWallet(walletNameStorage as WalletName, () => document.location.reload())
          const accountsStorage =
            walletAddressMock && (await walletStorage.validateAddress(walletAddressMock))
              ? [walletAddressMock]
              : await walletStorage.getAccounts()

          if (accountsStorage[0]) {
            walletStorage.selectAccount(accountsStorage[0])
          }

          setWallet(walletStorage)
          setWalletName(walletNameStorage as WalletName)
          setAccounts(accountsStorage)

          const accountIndexStorage = localStorage.getItem('accountIndex')
          if (accountIndexStorage) setAccountIndex(Number(JSON.parse(accountIndexStorage)))
        } catch (error) {
          errorNotification('Reconnection with the wallet failed')

          localStorage.removeItem('walletName')
          localStorage.removeItem('accountIndex')
        }
      }

      setRehydrate(false)
    }
  }, [rehydrate, walletAddressMock])

  useEffect(() => {
    rehydrateOffline()
  }, [rehydrateOffline])
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
        accountItemsCount,
        setAccountItemsCount,
        accountShares,
        setAccountShares,
        accountSharesCount,
        setAccountSharesCount
      }}>
      {children}
    </WalletContext.Provider>
  )
}
