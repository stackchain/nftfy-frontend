import { Button, Modal, Table } from 'antd'
import React, { useState } from 'react'
import './ContractRedeem.scss'

interface Props {
  redeem: () => void
  sharesCount: string
  shareBalance: string
  pay: string
  loading: boolean
}

export default function ContractRedeem({ redeem, sharesCount, shareBalance, pay, loading }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
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
      data: shareBalance && sharesCount ? `${((Number(shareBalance) / Number(sharesCount)) * 100).toFixed(0)}%` : ''
    },
    {
      label: 'Share Balance',
      data: Number(shareBalance).toLocaleString('en-US')
    },
    {
      label: 'Pay Amount',
      data: pay
    }
  ]

  const handleModal = () => {
    setModalOpen(true)
  }

  const handleModalOk = () => {
    redeem()
    setModalOpen(false)
  }

  const handleModalCancel = () => {
    setModalOpen(false)
  }

  return (
    <div className='contract-redeem'>
      <div className='title'>
        <h2>Redeem NFT</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey='label' />
      <Button onClick={handleModal} type='primary' size='large' loading={loading}>
        Redeem
      </Button>
      <Modal title='Redeem NFT' visible={modalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
        <p>{`You will pay ${Number(shareBalance).toLocaleString('en-US')} shares and receive ${pay}`}</p>
        <p>Do you want continue?</p>
      </Modal>
    </div>
  )
}
