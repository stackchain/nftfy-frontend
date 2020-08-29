import { Button, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { WalletContext } from '../../../context/WalletContext'
import { errorNotification } from '../../../services/notification'
import './AddNonFungibleTokens.scss'

export default function AddNonFungibleTokens() {
  const [loading, setLoading] = useState(false)
  const { accounts, accountIndex, wallet, setAccountItems, setAccountItemsCount, setAccountShares, setAccountSharesCount } = useContext(
    WalletContext
  )

  const [nftInput, setNftInput] = useState('')

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNftInput(event.target.value)
  }

  const addNft = async () => {
    if (!nftInput.length) {
      errorNotification('Smart contract is empty')

    } else if (wallet && !(await wallet.validateAddress(nftInput))) {
      errorNotification('Smart contract is invalid')
    } else if (wallet) {
      await wallet.registerERC721(nftInput)

      if (wallet) {
        setLoading(false)
        const nfts = await wallet.listAccountItems(accounts[accountIndex], 0, 12)
        if (nfts.items.length > 0) {
          setAccountItems(nfts.items)
          setAccountItemsCount(nfts.count)
        }

        const fts = await wallet.listAccountShares(accounts[accountIndex], 0, 8)
        if (fts.items.length > 0) {
          setAccountShares(fts.items)
          setAccountSharesCount(fts.count)
        }
        setLoading(true)
      }
    }
  }

  return (
    <div className='add-non-fungible-form'>
      <Input placeholder='0x0000000000000000000000000000000000000000' disabled={!accounts[accountIndex]} onChange={handleInput} value={nftInput} />
      <Button type='primary' disabled={!accounts[accountIndex]} onClick={addNft} loading={loading}>
        Add NFT
      </Button>
    </div>
  )
}
