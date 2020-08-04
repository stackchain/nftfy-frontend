import { Card, Pagination } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import AddNonFungibleTokens from '../AddNonFungibleTokens/AddNonFungibleTokens'
import './NonFungibleTokensList.scss'

export default function NonFungibleTokensList() {
  const { accountItems } = useContext(WalletContext)

  return (
    <Card className='nft-list-container'>
      <AddNonFungibleTokens />
      <div className='nft-list'>
        {accountItems.map(nft => (
          <Link key={nft.tokenId} to='/'>
            <div className='nft-item'>
              <img src={nft.imageUri} alt={nft.name} />
              <div className='contract-name'>{nft.contract.name}</div>
              <div className='nft-name'>{nft.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className='nft-pagination'>
        <Pagination size='small' total={50} />
      </div>
    </Card>
  )
}
