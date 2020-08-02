import { Button, Card, Input } from 'antd'
import React from 'react'
import nft from '../../../assets/nft.svg'
import './NonFungibleTokensEmpty.scss'

export default function NonFungibleTokensEmpty() {
  return (
    <Card className='non-fungible-tokens-empty'>
      <img src={nft} alt='Non Fungible Token' />
      <p>Connect your Ethereum Wallet to add Non-Fungible Tokens</p>
      <div className='disabled-form'>
        <Input placeholder='NFT Hash' disabled />
        <Button type='primary' disabled>
          Add NFT
        </Button>
      </div>
    </Card>
  )
}
