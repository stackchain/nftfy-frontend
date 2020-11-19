import React, { useState } from 'react'
import PoolsTable from '../../components/Pools/PoolsTable/PoolsTable'
import Header from '../../components/shared/layout/Header/Header'
import WalletManagerModal from '../../components/shared/modal/WalletManagerModal/WalletManagerModal'
import './Pools.scss'

export default function Pools() {
  const [openWalletModal, setOpenWalletModal] = useState(false)

  const openWalletManager = () => {
    setOpenWalletModal(!openWalletModal)
  }

  return (
    <main className='pools'>
      <Header buttonAction={openWalletManager} />
      <div className='content'>
        <PoolsTable />
      </div>
      <WalletManagerModal visible={openWalletModal} setVisible={openWalletManager} />
    </main>
  )
}
