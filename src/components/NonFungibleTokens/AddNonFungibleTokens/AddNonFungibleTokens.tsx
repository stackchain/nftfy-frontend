import { Button, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { WalletContext } from '../../../context/WalletContext'
import { errorNotification } from '../../../services/notification'
import './AddNonFungibleTokens.scss'

export default function AddNonFungibleTokens() {
  const { accounts, accountIndex, wallet, setAccountItems, setAccountItemsCount } = useContext(WalletContext)

  const [nftInput, setNftInput] = useState('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')

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

      if (wallet) {
        console.log('QUERY ADD', 0, 12)
        const nfts = await wallet.listAccountItems(accounts[accountIndex], 0, 12)
        if (nfts.items.length > 0) {
          setAccountItems(nfts.items)
          setAccountItemsCount(nfts.count)
        }
      }
    }
  }

  return (
    <div className='add-non-fungible-form'>
      <Input placeholder='NFT Hash' disabled={!accounts[accountIndex]} onChange={handleInput} value={nftInput} />
      <Button type='primary' disabled={!accounts[accountIndex]} onClick={addNft}>
        Add NFT
      </Button>
    </div>
  )
}
