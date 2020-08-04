import { Button, Card, Input } from 'antd'
import React, { useContext, useState } from 'react'
import nft from '../../../assets/nft.svg'
import { WalletContext } from '../../../context/WalletContext'
import { error } from '../../../services/notification'
import './NonFungibleTokensEmpty.scss'

export default function NonFungibleTokensEmpty() {
  const { accounts, accountIndex, wallet, setSyncAccountItem } = useContext(WalletContext)

  const [nftInput, setNftInput] = useState('')

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNftInput(event.target.value)
  }

  const addNft = async () => {
    if (!nftInput.length) {
      error('NFT Hash is empty')
    } else if (wallet && !(await wallet.validateAddress(nftInput))) {
      error('NFT Hash is invalid')
    } else if (wallet) {
      await wallet.registerERC721(nftInput)
      setSyncAccountItem(nftInput)
    }
  }

  return (
    <Card className='non-fungible-tokens-empty'>
      <img src={nft} alt='Non Fungible Token' />
      {!accounts[accountIndex] ? (
        <p>Connect your Ethereum Wallet to add Non-Fungible Tokens</p>
      ) : (
        <p>Input your Non Fungible Token Hash on the form</p>
      )}
      <div className='disabled-form'>
        <Input placeholder='NFT Hash' disabled={!accounts[accountIndex]} onChange={handleInput} />
        <Button type='primary' disabled={!accounts[accountIndex]} onClick={addNft}>
          Add NFT
        </Button>
      </div>
    </Card>
  )
}
