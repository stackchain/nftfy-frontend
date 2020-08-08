import { Card, Pagination } from 'antd'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import AddNonFungibleTokens from '../AddNonFungibleTokens/AddNonFungibleTokens'
import './NonFungibleTokensList.scss'

interface Props {
  count: number
  setPagination: (offset: number) => void
}

export default function NonFungibleTokensList({ count, setPagination }: Props) {
  const { accountItems } = useContext(WalletContext)
  const [page, setPage] = useState(1)

  const setPageNumber = (pageNumber: number) => {
    setPage(pageNumber)
    setPagination(pageNumber * 12 - 12)
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
          <Pagination size='small' current={page} total={count} onChange={setPageNumber} />
        </div>
      )}
    </Card>
  )
}
