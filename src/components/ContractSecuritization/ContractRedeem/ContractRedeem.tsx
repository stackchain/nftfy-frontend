import { Button, Table } from 'antd'
import React from 'react'
import './ContractRedeem.scss'

interface Props {
  redeem: () => void
  participation: string
  shareBalance: string
  pay: string
}

export default function ContractRedeem({ redeem, participation, shareBalance, pay }: Props) {
  const columns = [
    {
      dataIndex: 'label',
      key: 'label'
    },
    {
      dataIndex: 'data',
      key: 'data'
    }
  ]

  const dataSource = [
    {
      label: 'Your Participation',
      data: participation
    },
    {
      label: 'Share Balance',
      data: shareBalance
    },
    {
      label: 'Pay Amount',
      data: pay
    }
  ]

  const handleRedeem = () => {
    redeem()
  }

  return (
    <div className='contract-redeem'>
      <div className='title'>
        <h2>Redeem NFT</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' />
      <Button onClick={handleRedeem} type='primary' size='large'>
        Redeem
      </Button>
    </div>
  )
}
