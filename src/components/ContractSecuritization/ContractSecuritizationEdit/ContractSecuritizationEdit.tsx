import { Button, Card, Input, Select, Table } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { ERC20 } from '../../../services/api'
import ContractImage from '../ContractImage/ContractImage'
import './ContractSecuritizationEdit.scss'

const { Option } = Select

export default function ContractSecuritizationEdit() {
  const location = useLocation()

  console.log('MATCH', location.pathname)

  const { wallet } = useContext(WalletContext)

  const [paymentTokens, setPaymentTokens] = useState<ERC20[]>([])

  const listPaymentTokens = useCallback(async () => {
    if (wallet) {
      const tokens = await wallet.listPaymentTokens()
      setPaymentTokens(tokens)
    }
  }, [wallet])

  useEffect(() => {
    listPaymentTokens()
  }, [listPaymentTokens])

  const selectAfter = (
    <Select defaultValue='ETH' className='select-after'>
      <Option value=''>ETH</Option>
      {paymentTokens.map(paymentToken => (
        <Option key={paymentToken.symbol} value={paymentToken.symbol}>
          {paymentToken.symbol}
        </Option>
      ))}
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
