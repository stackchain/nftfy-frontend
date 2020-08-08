import { Card, Pagination } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import AddNonFungibleTokens from '../AddNonFungibleTokens/AddNonFungibleTokens'
import './NonFungibleTokensList.scss'

interface Props {
  page: number
  count: number
  setPagination: (page: number, offset: number) => void
}

export default function NonFungibleTokensList({ page, count, setPagination }: Props) {
  const { accountItems } = useContext(WalletContext)

  const setPage = (pageNumber: number) => {
    setPagination(pageNumber * 9 - 9, 9)
  }

  return (
    <Card className='nft-list-container'>
      <AddNonFungibleTokens />
      <div className='nft-list'>
        {accountItems.map(nft => (
          <Link key={nft.tokenId} to={`/contract/securitize/${nft.tokenId}`}>
            <div className='nft-item'>
              {nft.imageUri && <img src={nft.imageUri.split('https://cors-anywhere.herokuapp.com/')[1]} alt={nft.name} />}
              <div className='contract-name'>{nft.contract.name}</div>
              <div className='nft-name'>{nft.name}</div>
            </div>
          </Link>
        ))}
      </div>
      {count > 0 && (
        <div className='nft-pagination'>
          <Pagination size='small' current={page} total={count} onChange={setPage} />
        </div>
      )}
    </Card>
  )
}
