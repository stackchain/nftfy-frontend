import { Table } from 'antd'
import React from 'react'
import './ContractData.scss'

interface Props {
  name: string
  totalSupply: string
  exitPrice: string
  address: string
}

export default function ContractData({ name, totalSupply, exitPrice, address }: Props) {
  const columns = [
    {
      title: "Share's Contract Name",
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
      label: 'ERC20 Address',
      data: address
    },
    {
      label: 'Total Supply',
      data: totalSupply
    },
    {
      label: 'Exit Price',
      data: exitPrice
    },
    {
      label: 'Vault Balance',
      data: 0 // temp - read from contract
    }
  ]

  return (
    <div className='contract-data'>
      <div className='title'>
        <h2>Smart Contract Data</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' />
    </div>
  )
}
