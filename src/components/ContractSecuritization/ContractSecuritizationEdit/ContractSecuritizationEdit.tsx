import { Button, Card, Input, Select, Table } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { ERC20 } from '../../../services/api'
import ContractImage from '../ContractImage/ContractImage'
import './ContractSecuritizationEdit.scss'

const { Option } = Select

export default function ContractSecuritizationEdit() {
  const { accountItems } = useContext(WalletContext)

  const location = useLocation()
  const history = useHistory()
  const contractId = location.pathname.split('/contract/securitize/')[1]

  const contract = accountItems.find(accountItem => accountItem.tokenId === contractId)

  if (!contract) history.push('/')

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
      data: <Input placeholder='0.00000000' addonAfter={selectAfter} type='number' />
    }
  ]

  return (
    <Card className='contract-securitization-edit'>
      <div className='content'>
        <div className='contract-image'>
          <ContractImage
            name={contract?.name || ''}
            src={contract?.imageUri?.split('https://cors-anywhere.herokuapp.com/')[1] || ''}
            description={contract?.description || ''}
            meta={`#${contract?.tokenId}`}
          />
        </div>
        <div className='securitization-form'>
          <div className='title'>
            <h2>Securitize ERC721 Contract</h2>
          </div>
          <Table dataSource={dataSource} columns={columns} pagination={false} showHeader={false} rowKey='label' />
          <Button onClick={() => null} type='primary' size='large'>
            Securitize
          </Button>
        </div>
      </div>
    </Card>
  )
}
