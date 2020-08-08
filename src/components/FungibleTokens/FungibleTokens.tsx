import React, { useCallback, useContext, useEffect, useState } from 'react'
import { WalletContext } from '../../context/WalletContext'
import FungibleTokensEmpty from './FungibleTokensEmpty/FungibleTokensEmpty'
import FungibleTokensList from './FungibleTokensList/FungibleTokensList'

export default function FungibleTokens() {
  const {
    wallet,
    accounts,
    accountIndex,
    accountShares,
    setAccountShares,
    setAccountSharesCount,
    accountSharesCount,
    accountItems
  } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)

  const setPagination = (offsetNumber: number) => {
    setOffset(offsetNumber)
  }

  const loadAccountShares = useCallback(async () => {
    if (wallet && accountItems) {
      try {
        const fts = await wallet.listAccountShares(accounts[accountIndex], offset, 8)
        setAccountShares(fts.items)
        setAccountSharesCount(fts.count)
      } catch (error) {
        setAccountShares([])
      }
    }
  }, [accountIndex, accounts, wallet, setAccountShares, setAccountSharesCount, accountItems, offset])
  useEffect(() => {
    loadAccountShares()
  }, [loadAccountShares])

  if (!accountShares.length) {
    return <FungibleTokensEmpty />
  }

  return <FungibleTokensList setPagination={setPagination} count={accountSharesCount} />
}
