import { Button, Modal } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import metamask from '../../../../assets/metamask.svg'
import portis from '../../../../assets/portis.svg'
import { WalletContext } from '../../../../context/WalletContext'
import { useWalletAddressMock } from '../../../../hooks/WalletHooks'
import { initializeWallet, listSupportedWallets, WalletName } from '../../../../services/api'
import { errorNotification } from '../../../../services/notification'
import './WalletManagerModal.scss'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}
export default function WalletManagerModal(props: Props) {
  const walletAddressMock = useWalletAddressMock()
  const { visible, setVisible } = props
  const { setAccounts, setWalletName, setWallet } = useContext(WalletContext)

  const [supportedWallets, setSupportedWallets] = useState<WalletName[]>([])
  const [loadingWallet, setLoadingWallet] = useState<WalletName | undefined>(undefined)

  const loadWallets = useCallback(async () => {
    setSupportedWallets(await listSupportedWallets())
  }, [setSupportedWallets])

  useEffect(() => {
    loadWallets()
  }, [loadWallets])

  const selectWallet = (walletName: WalletName) => async () => {
    try {
      setLoadingWallet(walletName)

      const wallet = await initializeWallet(walletName, () => document.location.reload())
      const accounts =
        walletAddressMock && (await wallet.validateAddress(walletAddressMock)) ? [walletAddressMock] : await wallet.getAccounts()

      if (accounts[0]) {
        wallet.selectAccount(accounts[0])
      }

      setWallet(wallet)
      setWalletName(walletName)
      setAccounts(accounts)

      handleCancel()
    } catch (error) {
      setLoadingWallet(undefined)
      errorNotification('Authorize nftfy in the wallet and connect again', error)
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setLoadingWallet(undefined)
  }

  return (
    <Modal
      className='wallet-manager-modal'
      title='Wallet Manager'
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      width={300}
      maskClosable={false}>
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
