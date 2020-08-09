import { Button, Table } from 'antd'
import React from 'react'
import './ContractClaim.scss'

interface Props {
  claim: () => void
  shares: string
  receive: string
}

export default function ContractClaim({ claim, shares, receive }: Props) {
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
      data: shares
    },
    {
      label: 'Share Balance',
      data: receive
    }
  ]

  const handleClaim = () => {
    claim()
  }

  return (
    <div className='contract-redeem'>
      <div className='title'>
        <h2>Claim NFT</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' />
      <Button onClick={handleClaim} type='primary' size='large'>
        Claim
      </Button>
    </div>
  )
}
