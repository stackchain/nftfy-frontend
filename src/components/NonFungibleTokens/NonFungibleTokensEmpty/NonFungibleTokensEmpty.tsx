import { Button, Card, Input } from 'antd'
import React, { useContext } from 'react'
import nft from '../../../assets/nft.svg'
import { WalletContext } from '../../../context/WalletContext'
import './NonFungibleTokensEmpty.scss'

export default function NonFungibleTokensEmpty() {
  const { accounts, accountIndex } = useContext(WalletContext)

  return (
    <Card className='non-fungible-tokens-empty'>
      <img src={nft} alt='Non Fungible Token' />
      {!accounts[accountIndex] ? (
        <p>Connect your Ethereum Wallet to add Non-Fungible Tokens</p>
      ) : (
        <p>Input your Non Fungible Token Hash on the form</p>
      )}
      <div className='disabled-form'>
        <Input placeholder='NFT Hash' disabled={!accounts[accountIndex]} />
        <Button type='primary' disabled={!accounts[accountIndex]}>
          Add NFT
        </Button>
      </div>
    </Card>
  )
}
