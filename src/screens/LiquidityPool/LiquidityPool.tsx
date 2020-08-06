import { Card, List, Table } from 'antd'
import React from 'react'
import nft from '../../assets/metamask.svg'
import Footer from '../../components/shared/layout/Footer/Footer'
import './LiquidityPool.scss'

export default function LiquidityPool() {
  const dataShare = ['Racing car sprays burning fuel into crowd.', 'Japanese princess to wed commoner.']
  const dataSource = [
    {
      NFT: <img src={nft} alt='' />,
      MainLiquidityPool: 32,
      Myliquidity: '10%',
      Vol24h: '$324,954',
      SharesData: <List size='small' bordered dataSource={dataShare} renderItem={item => <List.Item>{item}</List.Item>} />,
      LastSharePrice: '$0.00547'
    }
  ]

  const columns = [
    {
      title: 'NFT',
      dataIndex: 'NFT'
    },
    {
      title: 'Main Liquidity Pool',
      dataIndex: 'MainLiquidityPool'
    },
    {
      title: 'My liquidity',
      dataIndex: 'Myliquidity'
    },
    {
      title: 'Vol 24h',
      dataIndex: 'Vol24h'
    },
    {
      title: 'Shares Data',
      dataIndex: 'SharesData'
    },
    {
      title: 'Last Share Price',
      dataIndex: 'LastSharePrice'
    }
  ]

  return (
    <main className='liquidMain'>
      <div className='content'>
        <Card bordered={false} className='cardBody'>
          <Table dataSource={dataSource} columns={columns} pagination={false} showHeader />
        </Card>
      </div>
      <Footer />
    </main>
  )
}
