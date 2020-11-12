import { Button, Card, Input, Select, Table } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { ERC20, ERC721Item } from '../../../services/api'
import { errorNotification, infoNotification } from '../../../services/notification'
import Loading from '../../shared/layout/Loading/Loading'
import ContractImage from '../ContractImage/ContractImage'
import './ContractSecuritizationEdit.scss'

const { Option } = Select

export default function ContractSecuritizationEdit() {
  const { wallet, accounts, accountIndex } = useContext(WalletContext)
  const [loading, setLoading] = useState(false)
  const [paymentTokens, setPaymentTokens] = useState<ERC20[]>([])
  const [exitPrice, setExitPrice] = useState<string | undefined>(undefined)
  const [paymentToken, setPaymentToken] = useState<string | undefined>(undefined)

  const location = useLocation()
  const history = useHistory()
  const contractAddress = location.pathname.split('/')[4]
  const tokenId = location.pathname.split('/')[5]

  const [contract, setcontract] = useState<ERC721Item | undefined>(undefined)
  const [contractIsSecuritized, setContractIsSecuritized] = useState<boolean | undefined>(undefined)
  const [contractOwner, setContractOwner] = useState<string | undefined>(undefined)
  const isOwner = contractOwner && accounts[accountIndex] && contractOwner === accounts[accountIndex]

  const shares = '1000000'

  const getcontract = useCallback(async () => {
    if (wallet) {
      const contractItem = await wallet.retrieveItem(contractAddress, tokenId)
      setcontract(contractItem)
      setContractIsSecuritized(await contractItem.isSecuritized())
    }
  }, [wallet, contractAddress, tokenId])

  const getContractOwner = useCallback(async () => {
    if (contract) {
      setContractOwner(await contract?.getTokenOwner())
    }
  }, [contract])

  useEffect(() => {
    getcontract()
  }, [getcontract])

  useEffect(() => {
    getContractOwner()
  }, [getContractOwner])

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
    <Select defaultValue='ETH' className='select-after' onChange={handlePaymentToken}>
      <Option value='ETH'>ETH</Option>
      {paymentTokens.map(paymentTokenItem => (
        <Option key={paymentTokenItem.symbol} value={paymentTokenItem.symbol}>
          {paymentTokenItem.symbol}
        </Option>
      ))}
    </Select>
  )
  const columnsOwner = [
    {
      dataIndex: 'label',
      key: 'label'
    },
    {
      dataIndex: 'data',
      key: 'data'
    }
  ]
  const dataSourceOwner = [
    {
      label: 'Shares',
      data: Number(shares).toLocaleString('en-US')
    },
    {
      label: 'Exit Price',
      data: <Input placeholder='0.00000000' addonAfter={selectAfter} type='number' value={exitPrice} onChange={handleExitPrice} />
    }
  ]

  const columnsNotOwner = [
    {
      dataIndex: 'label',
      key: 'label'
    },
    {
      dataIndex: 'data',
      key: 'data'
    }
  ]
  const dataSourceNotOwner = [
    {
      label: 'Contract',
      data: contractAddress
    },
    {
      label: 'ID',
      data: contract?.tokenId
    },
    {
      label: 'Owner',
      data: contractOwner
    }
  ]
  const securitize = async () => {
    infoNotification('Allow securitization transaction in the wallet')

    if (Number(exitPrice) < 0) {
      errorNotification("Exit price can't no be negative")
    }

    if (contract && shares && exitPrice) {
      try {
        setLoading(true)
        await contract.securitize(shares, exitPrice, paymentTokens.find(payToken => payToken.symbol === paymentToken) || null)
        setLoading(false)
        history.push(`/`)
      } catch (error) {
        errorNotification('Securitization transaction failure, please check in the wallet')
        setLoading(false)
      }
    }
  }

  if (!wallet) {
    return (
      <Card className='contract-securitization-edit'>
        <div className='no-wallet'>
          <h2>Please connect the wallet to access the contract</h2>
        </div>
      </Card>
    )
  }

  if (!contract || contractIsSecuritized === undefined) {
    return (
      <Card className='contract-securitization-edit'>
        <Loading />
      </Card>
    )
  }

  if (!contract?.name) {
    return (
      <Card className='contract-securitization-edit'>
        <div className='contract-not-found'>
          <h2>Contract not found</h2>

          <Button type='primary' size='large' href='/dapp'>
            Go to Home
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className='contract-securitization-edit'>
      <div className='content'>
        <div className='contract-image'>
          <ContractImage
            name={contract?.name || ''}
            src={contract?.imageUri || ''}
            description={contract?.description || ''}
            meta={`#${contract?.tokenId}`}
          />
        </div>
        <div className='securitization-form'>
          {isOwner && contractIsSecuritized && (
            <div className='already-securitized'>
              <div className='title'>
                <h2>Contract is already securitized</h2>
              </div>
              <Button type='primary' size='large' href='/dapp'>
                Go to Home
              </Button>
            </div>
          )}
          {isOwner && !contractIsSecuritized && (
            <>
              <div className='title'>
                <h2>Securitize ERC721 Contract</h2>
              </div>
              <Table dataSource={dataSourceOwner} columns={columnsOwner} pagination={false} showHeader={false} rowKey='label' />
              <Button onClick={securitize} type='primary' size='large' loading={loading} disabled={!exitPrice || Number(exitPrice) <= 0}>
                Securitize
              </Button>
            </>
          )}
          {!isOwner && (
            <>
              <div className='title'>
                <h2>{contract.name}</h2>
              </div>
              <Table dataSource={dataSourceNotOwner} columns={columnsNotOwner} pagination={false} showHeader={false} rowKey='label' />
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
