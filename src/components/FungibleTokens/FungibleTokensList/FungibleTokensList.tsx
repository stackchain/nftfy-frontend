import { Card, Pagination } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { ERC20 } from '../../../services/api'
import './FungibleTokensList.scss'

interface Props {
  count: number
  setPagination: (offset: number) => void
}

export default function FungibleTokensList({ count, setPagination }: Props) {
  const { accountShares } = useContext(WalletContext)

  const [accountSharesCount, setAccountSharesCount] = useState<ERC20[]>([])

  useEffect(() => {
    getAccountSharesCount(accountShares)
  }, [accountShares])

  const getAccountSharesCount = async (accountSharesItem: ERC20[]) => {
    console.log(accountSharesItem)

    const accountSharesItemPromise = await Promise.all(
      accountSharesItem.map(async shareItem => {
        const sharesCount = await shareItem.getSharesCount()

        return { ...shareItem, sharesCount }
      })
    )

    console.log('accountSharesItem', accountSharesItem)

    setAccountSharesCount(accountSharesItemPromise)
  }

  const [page, setPage] = useState(1)

  const setPageNumber = (pageNumber: number) => {
    setPage(pageNumber)
    setPagination(pageNumber * 8 - 8)
  }

  return (
    <Card className='ft-list-container'>
      <div className='ft-list'>
        {accountSharesCount.map(ft => (
          <Link key={ft.symbol} to='/'>
            <div className='ft-item'>
              <div>
                <img src='https://dao.decentraland.org/static/what_is-b6cc98a75c6c5af46dadf7e9b853e13a.png' alt='des' />
              </div>
              <div>
                <div className='ft-symbol'>{ft.symbol}</div>
                <div className='ft-name'>{ft.name}</div>
                <div className='ft-shares'>{ft.sharesCount}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {count > 0 && (
        <div className='ft-pagination'>
          <Pagination size='small' current={page} total={count} onChange={setPageNumber} />
        </div>
      )}
    </Card>
  )
}
