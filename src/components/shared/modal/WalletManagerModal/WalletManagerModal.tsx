import { Button, Modal } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import metamask from '../../../../assets/metamask.svg'
import portis from '../../../../assets/portis.svg'
import { initializeWallet, listSupportedWallets, WalletName } from '../../../../services/api'
import './WalletManagerModal.scss'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}
export default function WalletManagerModal(props: Props) {
  const { visible, setVisible } = props

  const [supportedWallets, setSupportedWallets] = useState<WalletName[]>([])
  const [loadingWallet, setLoadingWallet] = useState<WalletName | undefined>(undefined)

  const loadWallets = useCallback(async () => {
    setSupportedWallets(await listSupportedWallets())
  }, [setSupportedWallets])

  useEffect(() => {
    loadWallets()
  }, [loadWallets])

  const selectWallet = (walletName: WalletName) => async () => {
    setLoadingWallet(walletName)
    const wallet = await initializeWallet(walletName)
    const accounts = await wallet.getAccounts()
    localStorage.setItem('accounts', JSON.stringify(accounts))
    localStorage.setItem('accountIndex', JSON.stringify(0))
    localStorage.setItem('walletName', JSON.stringify(walletName))
    handleCancel()
  }

  const handleCancel = () => {
    setVisible(false)
    setLoadingWallet(undefined)
  }

  return (
    <Modal className='wallet-manager-modal' title='Wallet Manager' visible={visible} footer={null} onCancel={handleCancel} width={300}>
      {supportedWallets.includes('metamask') && (
        <Button
          className='metamask'
          size='large'
          icon={<img src={metamask} alt='Metamask' width={24} height={25} />}
          onClick={selectWallet('metamask')}
          loading={loadingWallet === 'metamask'}>
          Metamask
        </Button>
      )}
      {supportedWallets.includes('portis') && (
        <Button
          className='portis'
          size='large'
          icon={<img src={portis} alt='Metamask' width={24} height={25} />}
          onClick={selectWallet('portis')}
          loading={loadingWallet === 'portis'}>
          Portis
        </Button>
      )}
    </Modal>
  )
}
