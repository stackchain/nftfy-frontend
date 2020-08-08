import React, { useState } from 'react'
import ft from '../../assets/ft-active.svg'
import nft from '../../assets/nft-active.svg'
import FungibleTokens from '../../components/FungibleTokens/FungibleTokens'
import NonFungibleTokens from '../../components/NonFungibleTokens/NonFungibleTokens'
import Footer from '../../components/shared/layout/Footer/Footer'
import Header from '../../components/shared/layout/Header/Header'
import WalletManagerModal from '../../components/shared/modal/WalletManagerModal/WalletManagerModal'
import './Home.scss'

export default function Home() {
  const [openWalletModal, setOpenWalletModal] = useState(false)

  const openWalletManager = () => {
    setOpenWalletModal(!openWalletModal)
  }
  return (
    <main className='home'>
      <Header buttonAction={openWalletManager} />
      <div className='content'>
        <div className='nft'>
          <h2>
            <img src={nft} alt='Non-Fungible Token' />
            Non-Fungible Tokens ERC 721
          </h2>
          <NonFungibleTokens />
        </div>
        <div className='ft'>
          <h2>
            <img src={ft} alt='Fungible Token' />
            Fungible Tokens ERC20
          </h2>
          <FungibleTokens />
        </div>
      </div>
      <Footer />
      <WalletManagerModal visible={openWalletModal} setVisible={openWalletManager} />
    </main>
  )
}
