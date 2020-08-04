import { Card } from 'antd'
import React, { useContext } from 'react'
import { WalletContext } from '../../../context/WalletContext'

export default function NonFungibleTokensList() {
  const { accountItems } = useContext(WalletContext)

  return (
    <Card>
      {accountItems.map(erc721 => (
        <p key={erc721.tokenId}>LIST</p>
      ))}
    </Card>
  )
}
