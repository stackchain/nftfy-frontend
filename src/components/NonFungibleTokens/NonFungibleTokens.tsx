import React, { useCallback, useContext, useEffect, useState } from 'react'
import { WalletContext } from '../../context/WalletContext'
import NonFungibleTokensEmpty from './NonFungibleTokensEmpty/NonFungibleTokensEmpty'
import NonFungibleTokensList from './NonFungibleTokensList/NonFungibleTokensList'

export default function NonFungibleTokens() {
  const { wallet, accounts, accountIndex, accountItems, accountItemsCount, setAccountItems, setAccountItemsCount } = useContext(
    WalletContext
  )

  const [offset, setOffset] = useState(0)

  const setPagination = (offsetNumber: number) => {
    setOffset(offsetNumber)
  }

  const loadAccountItems = useCallback(async () => {
    if (wallet) {
      const nfts = await wallet.listAccountItems(accounts[accountIndex], offset, 12)
      if (nfts.items.length > 0) {
        setAccountItems(nfts.items)
        setAccountItemsCount(nfts.count)
      }
    }
  }, [accountIndex, accounts, wallet, setAccountItems, offset, setAccountItemsCount])

  useEffect(() => {
    loadAccountItems()
  }, [loadAccountItems])

  if (!accountItems.length) {
    return <NonFungibleTokensEmpty />
  }

  return <NonFungibleTokensList setPagination={setPagination} count={accountItemsCount} />
}
