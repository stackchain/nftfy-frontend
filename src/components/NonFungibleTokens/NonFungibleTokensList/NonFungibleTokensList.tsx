import { Card } from 'antd'
import React, { useContext, useEffect } from 'react'
import { WalletContext } from '../../../context/WalletContext'

export default function NonFungibleTokensList() {
  const { accounts, accountIndex, setSyncAccountItem } = useContext(WalletContext)

  useEffect(() => {
    setSyncAccountItem(accounts[accountIndex])
  }, [accounts, accountIndex, setSyncAccountItem])

  return (
    <Card>
      <p>LIST</p>
    </Card>
  )
}
