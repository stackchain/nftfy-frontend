import React, { useCallback, useContext, useEffect } from 'react'
import { WalletContext } from '../../context/WalletContext'
import FungibleTokensEmpty from './FungibleTokensEmpty/FungibleTokensEmpty'
import FungibleTokensList from './FungibleTokensList/FungibleTokensList'

export default function FungibleTokens() {
  const { wallet, accounts, accountIndex, accountShares, setAccountShares } = useContext(WalletContext)
  const loadAccountShares = useCallback(async () => {
    if (wallet) {
      try {
        const nfs = await wallet.listAccountShares(accounts[accountIndex], 9, 10)
        setAccountShares(nfs.items)
      } catch (error) {
        error('Error on ListFungible Tokens')
      }
    }
  }, [accountIndex, accounts, wallet, setAccountShares])

  useEffect(() => {
    loadAccountShares()
  }, [loadAccountShares])

  if (!accountShares.length) {
    return <FungibleTokensEmpty />
  }

  return <FungibleTokensList />
}
