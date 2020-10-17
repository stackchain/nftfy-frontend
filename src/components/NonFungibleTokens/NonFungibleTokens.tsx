import React, { useCallback, useContext, useEffect, useState } from 'react'
import { WalletContext } from '../../context/WalletContext'
import NonFungibleTokensEmpty from './NonFungibleTokensEmpty/NonFungibleTokensEmpty'
import NonFungibleTokensList from './NonFungibleTokensList/NonFungibleTokensList'

export default function NonFungibleTokens() {
  const { wallet, accounts, accountIndex, accountItems, accountItemsCount, setAccountItems, setAccountItemsCount } = useContext(
    WalletContext
  )

  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  const setPagination = (offsetNumber: number) => {
    setOffset(offsetNumber)
  }

  const loadAccountItems = useCallback(async () => {
    if (wallet && accounts[accountIndex]) {
      setLoading(true)
      const nfts = await wallet.listAccountItems(accounts[accountIndex], offset, 12)
      setLoading(false)

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
    return <NonFungibleTokensEmpty loading={loading} />
  }

  return <NonFungibleTokensList setPagination={setPagination} count={accountItemsCount} loading={loading} />
}
