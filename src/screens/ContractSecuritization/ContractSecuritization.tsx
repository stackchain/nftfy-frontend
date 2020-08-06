import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContractSecuritizationEdit from '../../components/ContractSecuritization/ContractSecuritizationEdit/ContractSecuritizationEdit'
import ContractSecuritizationFinalized from '../../components/ContractSecuritization/ContractSecuritizationFinalized/ContractSecuritizationFinalized'
import ContractSecuritizationRedeem from '../../components/ContractSecuritization/ContractSecuritizationRedeem/ContractSecuritizationRedeem'
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
      {location.pathname === '/contract/edit' && <ContractSecuritizationEdit />}
      {location.pathname === '/contract/redeem' && <ContractSecuritizationRedeem />}
      {location.pathname === '/contract/finalized' && <ContractSecuritizationFinalized />}
      <Footer />
      <WalletManagerModal visible={openWalletModal} setVisible={openWalletManager} />
    </main>
  )
}
