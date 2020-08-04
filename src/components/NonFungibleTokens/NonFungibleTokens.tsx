import React, { useCallback, useContext, useEffect } from 'react'
import { WalletContext } from '../../context/WalletContext'
import NonFungibleTokensEmpty from './NonFungibleTokensEmpty/NonFungibleTokensEmpty'
import NonFungibleTokensList from './NonFungibleTokensList/NonFungibleTokensList'

export default function NonFungibleTokens() {
  const { wallet, accounts, accountIndex, accountItems, setAccountItems } = useContext(WalletContext)

  const loadAccountItems = useCallback(async () => {
    if (wallet) {
      try {
        const nfts = await wallet.listAccountItems(accounts[accountIndex], 9, 10)
        setAccountItems(nfts.items)
      } catch (error) {
        error('Error on List Non-Fungible Tokens')
      }
    }
  }, [accountIndex, accounts, wallet, setAccountItems])

  useEffect(() => {
    loadAccountItems()
  }, [loadAccountItems])

  if (!accountItems.length) {
    return <NonFungibleTokensEmpty />
  }

  return <NonFungibleTokensList />
}
