import React, { useCallback, useContext, useEffect, useState } from 'react'
import { WalletContext } from '../../context/WalletContext'
import NonFungibleTokensEmpty from './NonFungibleTokensEmpty/NonFungibleTokensEmpty'
import NonFungibleTokensList from './NonFungibleTokensList/NonFungibleTokensList'

export default function NonFungibleTokens() {
  const { wallet, accounts, accountIndex, accountItems, setAccountItems } = useContext(WalletContext)
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [count, setCount] = useState(0)

  const setPagination = (pageNumber: number, offsetNumber: number) => {
    setPage(pageNumber)
    setOffset(offsetNumber)
  }

  const loadAccountItems = useCallback(async () => {
    if (wallet) {
      const nfts = await wallet.listAccountItems(accounts[accountIndex], offset, page)
      if (nfts.items.length > 0) {
        setAccountItems(nfts.items)
        setCount(nfts.count)
      }
    }
  }, [accountIndex, accounts, wallet, setAccountItems, page, offset])

  useEffect(() => {
    loadAccountItems()
  }, [loadAccountItems])

  if (!accountItems.length) {
    return <NonFungibleTokensEmpty />
  }

  return <NonFungibleTokensList page={page} offset={offset} setPagination={setPagination} count={count} />
}
