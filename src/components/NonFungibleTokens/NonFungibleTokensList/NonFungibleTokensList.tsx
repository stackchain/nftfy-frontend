import { Card, Pagination } from 'antd'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import nftImage from '../../../assets/nft.svg'
import { WalletContext } from '../../../context/WalletContext'
import Loading from '../../shared/layout/Loading/Loading'
import AddNonFungibleTokens from '../AddNonFungibleTokens/AddNonFungibleTokens'
import './NonFungibleTokensList.scss'

interface Props {
  count: number
  setPagination: (offset: number) => void
  loading: boolean
}

export default function NonFungibleTokensList({ count, setPagination, loading }: Props) {
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
          <Link key={nft.tokenId} to={`/dapp/contract/securitize/${nft.contract.address}/${nft.tokenId}`}>
            <div className='nft-item'>
              {nft.imageUri && <img src={nft.imageUri.includes('ipfs://') ? nftImage : nft.imageUri || nftImage} alt={nft.name} />}
              <div className='contract-name'>{nft.contract.name}</div>
              <div className='nft-name'>{nft.name}</div>
            </div>
          </Link>
        ))}
      </div>
      {count > 12 && (
        <div className='nft-pagination'>
          <Pagination size='small' current={page} total={count} onChange={setPageNumber} />
        </div>
      )}
      {loading && <Loading />}
    </Card>
  )
}
