import { Button, Card, Table } from 'antd'
import React from 'react'
import './ContractSecuritizationDetail.scss'

export default function ContractSecuritizationDetail() {
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
    <Card className='contract-securitization-detail'>
      <div className='content'>
        <div className='contract-image'>{/* <ContractImage /> */}</div>
        <div className='contract-data'>
          <div className='securitization-form'>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' />
            <div className='action-area'>
              <Button onClick={() => null} type='primary' size='large'>
                Back to my wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
