import { Table } from 'antd'
import React from 'react'
import './ContractData.scss'

interface Props {
  name: string
  issuedShare: string
  exitPrice: string
}

export default function ContractData({ name, issuedShare, exitPrice }: Props) {
  const columns = [
    {
      title: 'Share Contract Name',
      dataIndex: 'label',
      key: 'label'
    },
    {
      title: name,
      dataIndex: 'data',
      key: 'data'
    }
  ]

  const dataSource = [
    {
      label: 'Issued Share',
      data: issuedShare
    },
    {
      label: 'Exit Price',
      data: exitPrice
    }
  ]

  return (
    <div className='contract-data'>
      <div className='title'>
        <h2>Contract Data</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' />
    </div>
  )
}
