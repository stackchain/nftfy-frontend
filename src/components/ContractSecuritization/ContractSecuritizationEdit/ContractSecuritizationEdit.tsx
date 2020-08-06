import { Button, Card, Input, Select, Table } from 'antd'
import React from 'react'
import ContractImage from '../ContractImage/ContractImage'
import './ContractSecuritizationEdit.scss'

const { Option } = Select

export default function ContractSecuritizationEdit() {
  const selectAfter = (
    <Select defaultValue='ETH' className='select-after'>
      <Option value='ETH'>ETH</Option>
      <Option value='DAI'>DAI</Option>
      <Option value='WBTC'>WBTC</Option>
      <Option value='AMPL'>AMPL</Option>
    </Select>
  )
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
      label: 'Non Fungible Token',
      data: '1231231231312313133131'
    },
    {
      label: 'Shares',
      data: '1.000.000'
    },
    {
      label: 'Exit Price',
      data: <Input placeholder='0.00000000' addonAfter={selectAfter} />
    }
  ]

  return (
    <Card className='contract-securitization-edit'>
      <div className='content'>
        <div className='contract-image'>
          <ContractImage />
        </div>
        <div className='securitization-form'>
          <Table dataSource={dataSource} columns={columns} pagination={false} showHeader={false} rowKey='label' />
          <Button onClick={() => null} type='primary' size='large'>
            Securitize
          </Button>
        </div>
      </div>
    </Card>
  )
}
