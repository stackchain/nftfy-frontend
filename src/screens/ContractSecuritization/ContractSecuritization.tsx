import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContractSecuritizationDetail from '../../components/ContractSecuritization/ContractSecuritizationDetail/ContractSecuritizationDetail'
import ContractSecuritizationEdit from '../../components/ContractSecuritization/ContractSecuritizationEdit/ContractSecuritizationEdit'
import Footer from '../../components/shared/layout/Footer/Footer'
import Header from '../../components/shared/layout/Header/Header'
import WalletManagerModal from '../../components/shared/modal/WalletManagerModal/WalletManagerModal'
import './ContractSecuritization.scss'

export default function ContractSecuritization() {
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const location = useLocation()

  const openWalletManager = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <main className='contract-securitization'>
      <Header buttonAction={openWalletManager} />
      {location.pathname.includes('/contract/securitize') && <ContractSecuritizationEdit />}
      {location.pathname.includes('/contract/detail') && <ContractSecuritizationDetail />}
      <Footer />
      <WalletManagerModal visible={openWalletModal} setVisible={openWalletManager} />
    </main>
  )
}
