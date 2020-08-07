import { Button, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { WalletContext } from '../../../context/WalletContext'
import { errorNotification } from '../../../services/notification'
import './AddNonFungibleTokens.scss'

export default function AddNonFungibleTokens() {
  const { accounts, accountIndex, wallet } = useContext(WalletContext)

  const [nftInput, setNftInput] = useState('')

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNftInput(event.target.value)
  }

  const addNft = async () => {
    if (!nftInput.length) {
      errorNotification('NFT Hash is empty')
    } else if (wallet && !(await wallet.validateAddress(nftInput))) {
      errorNotification('NFT Hash is invalid')
    } else if (wallet) {
      await wallet.registerERC721(nftInput)
    }
  }

  return (
    <div className='add-non-fungible-form'>
      <Input placeholder='NFT Hash' disabled={!accounts[accountIndex]} onChange={handleInput} />
      <Button type='primary' disabled={!accounts[accountIndex]} onClick={addNft}>
        Add NFT
      </Button>
    </div>
  )
}
