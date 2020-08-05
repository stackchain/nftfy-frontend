import { Card, Pagination } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import './FungibleTokensList.scss'

export default function FungibleTokensList() {
  const { accountShares } = useContext(WalletContext)

  return (
    <Card className='ft-list-container'>
      <div className='ft-list'>
        {accountShares.map(ft => (
          <Link key={ft.symbol} to='/'>
            <div className='ft-item'>
              <div>
                <img src='https://dao.decentraland.org/static/what_is-b6cc98a75c6c5af46dadf7e9b853e13a.png' alt='des' />
              </div>
              <div>
                <div className='ft-symbol'>{ft.symbol}</div>
                <div className='ft-name'>{ft.name}</div>
                <div className='ft-shares'>30.000</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='ft-pagination'>
        <Pagination size='small' total={50} />
      </div>
    </Card>
  )
}
