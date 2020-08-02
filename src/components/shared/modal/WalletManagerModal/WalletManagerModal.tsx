import { Button, Modal } from 'antd'
import React from 'react'
import metamask from '../../../../assets/metamask.svg'
import './WalletManagerModal.scss'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}
export default function WalletManagerModal(props: Props) {
  const { visible, setVisible } = props

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal className='wallet-manager-modal' title='Wallet Manager' visible={visible} footer={null} onCancel={handleCancel} width={300}>
      <Button size='large' type='primary' icon={<img src={metamask} alt='Metamask' width={30} height={30} />}>
        Metamask
      </Button>
    </Modal>
  )
}
