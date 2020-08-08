import { Button, Card, Input, Select, Table } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { ERC20 } from '../../../services/api'
import { errorNotification } from '../../../services/notification'
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
  const [exitPrice, setExitPrice] = useState<string | undefined>(undefined)
  const [paymentToken, setPaymentToken] = useState<string | undefined>(undefined)
  const shares = '1000000'

  const listPaymentTokens = useCallback(async () => {
    if (wallet) {
      const tokens = await wallet.listPaymentTokens()
      setPaymentTokens(tokens)
    }
  }, [wallet])

  useEffect(() => {
    listPaymentTokens()
  }, [listPaymentTokens])

  const handleExitPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExitPrice(event.target.value)
  }

  const handlePaymentToken = (value: string) => {
    setPaymentToken(value)
  }

  const selectAfter = (
    <Select defaultValue='ETH' className='select-after' value={paymentToken} onChange={handlePaymentToken}>
      <Option value=''>ETH</Option>
      {paymentTokens.map(paymentTokenItem => (
        <Option key={paymentTokenItem.symbol} value={paymentTokenItem.symbol}>
          {paymentTokenItem.symbol}
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
      data: shares
    },
    {
      label: 'Exit Price',
      data: <Input placeholder='0.00000000' addonAfter={selectAfter} type='number' value={exitPrice} onChange={handleExitPrice} />
    }
  ]
  const securitize = async () => {
    if (Number(exitPrice) < 0) {
      errorNotification("Exit price can't no be negative")
    }

    if (contract && shares && exitPrice) {
      await contract.securitize(shares, exitPrice, paymentTokens.find(payToken => payToken.symbol === paymentToken) || null)
    }
  }

  const checkSecuritized = useCallback(async () => {
    if (contract) {
      console.log(await contract.isSecuritized())
    }
  }, [contract])

  useEffect(() => {
    checkSecuritized()
  }, [checkSecuritized])

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
          <Button onClick={securitize} type='primary' size='large'>
            Securitize
          </Button>
        </div>
      </div>
    </Card>
  )
}
