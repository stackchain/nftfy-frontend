import React, { useState } from 'react'
import { WalletContext } from './context/WalletContext'
import Routes from './Routes'
import { Wallet, WalletName } from './services/api'

function App() {
  const [walletName, setWalletName] = useState<WalletName | undefined>(undefined)
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined)
  const [accounts, setAccounts] = useState<string[]>([])
  const [accountIndex, setAccountIndex] = useState<number>(0)
  return (
    <WalletContext.Provider value={{ walletName, setWalletName, wallet, setWallet, accounts, setAccounts, accountIndex, setAccountIndex }}>
      <Routes />
    </WalletContext.Provider>
  )
}

export default App
