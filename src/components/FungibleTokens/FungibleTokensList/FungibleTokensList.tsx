import { Card, Pagination } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { ERC20 } from '../../../services/api'
import './FungibleTokensList.scss'

interface Props {
  count: number
  setPagination: (offset: number) => void
}

export default function FungibleTokensList({ count, setPagination }: Props) {
  const { accountShares, accounts, accountIndex } = useContext(WalletContext)

  const [accountSharesCount, setAccountSharesCount] = useState<Array<ERC20 & { sharesCount: string; erc721ImageUri: string }>>([])

  const getAccountSharesCount = useCallback(
    async (accountSharesItem: ERC20[]) => {
      const accountSharesItemPromise = await Promise.all(
        accountSharesItem.map(async shareItem => {
          const sharesCount = await shareItem.getAccountBalance(accounts[accountIndex])

          const erc721 = await shareItem.getERC721Item()

          return { ...shareItem, sharesCount, erc721ImageUri: erc721.imageUri || '' }
        })
      )

      setAccountSharesCount(accountSharesItemPromise)
    },
    [accountIndex, accounts]
  )

  useEffect(() => {
    getAccountSharesCount(accountShares)
  }, [accountShares, getAccountSharesCount])

  const [page, setPage] = useState(1)

  const setPageNumber = (pageNumber: number) => {
    setPage(pageNumber)
    setPagination(pageNumber * 8 - 8)
  }

  return (
    <Card className='ft-list-container'>
      <div className='ft-list'>
        {accountSharesCount.map(ft => (
          <Link key={ft.address} to={`/contract/detail/${ft.address}`}>
            <div className='ft-item'>
              <div>
                {ft.erc721ImageUri && (
                  <img src={ft.erc721ImageUri.split('https://cors-anywhere.herokuapp.com/')[1] || ft.erc721ImageUri} alt={ft.name} />
                )}
              </div>
              <div>
                <div className='ft-name'>{ft.name}</div>
                <div className='ft-shares'>{`${ft.sharesCount} ${ft.symbol}`}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {count > 8 && (
        <div className='ft-pagination'>
          <Pagination size='small' current={page} total={count} onChange={setPageNumber} />
        </div>
      )}
    </Card>
  )
}
