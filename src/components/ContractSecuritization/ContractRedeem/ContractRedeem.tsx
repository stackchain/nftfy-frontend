import { Button, Table } from 'antd'
import React from 'react'
import './ContractRedeem.scss'

interface Props {
  redeem: () => void
  participation: string
  shareBalance: string
  pay: string
  loading: boolean
}

export default function ContractRedeem({ redeem, participation, shareBalance, pay, loading }: Props) {
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
      label: 'Share Balance',
      data: participation
    },
    {
      label: 'Share Balance',
      data: Number(shareBalance).toLocaleString()
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
      <Button onClick={handleRedeem} type='primary' size='large' loading={loading}>
        Redeem
      </Button>
    </div>
  )
}
