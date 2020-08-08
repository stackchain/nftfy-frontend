import { Table } from 'antd'
import React from 'react'
import './ContractRedeem.scss'

export default function ContractRedeem() {
  const columns = [
    {
      title: 'Share Contract Name',
      dataIndex: 'label',
      key: 'label'
    },
    {
      title: 'CK Genesis Nftfy',
      dataIndex: 'data',
      key: 'data'
    }
  ]

  const dataSource = [
    {
      label: 'issued Share',
      data: 32
    },
    {
      label: 'Exit Price',
      data: 42
    },
    {
      label: 'Duration',
      data: 42
    },
    {
      label: 'Extractor Buyer',
      data: 42
    }
  ]

  return (
    <div className='redeem'>
      <div className='title'>
        <h2>Redeem ERC721 to your wallet</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' />
    </div>
  )
}
