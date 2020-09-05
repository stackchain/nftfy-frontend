import { Button, Table } from 'antd'
import React from 'react'
import './ContractClaim.scss'

interface Props {
  claim: () => void
  shares: string
  receive: string
  loading: boolean
  paymentToken: string
}

export default function ContractClaim({ claim, shares, receive, paymentToken, loading }: Props) {
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
      data: Number(shares).toLocaleString('en-US')
    },
    {
      label: 'Claim Amount',
      data: `${Number(receive).toFixed(8)} ${paymentToken}`
    }
  ]

  const handleClaim = () => {
    claim()
  }

  return (
    <div className='contract-redeem'>
      <div className='title'>
        <h2>Claim</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' loading={loading} />
      <Button onClick={handleClaim} type='primary' size='large'>
        Claim
      </Button>
    </div>
  )
}
