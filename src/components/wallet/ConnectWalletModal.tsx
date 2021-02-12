import React from 'react'
import styled from 'styled-components'
import nftfy from '../../assets/nftfy.svg'
import { connectWalletModalVar } from '../../graphql/variables/WalletVariable'
import { colors, viewport } from '../../styles/variables'
import { ConnectWallet } from './ConnectWallet'

export const ConnectWalletModal: React.FC = () => {
  const closeModal = () => {
    connectWalletModalVar(false)
  }

  return (
    <S.ConnectWalletModal>
      <S.Logo src={nftfy} onClick={closeModal} />
      <ConnectWallet />
    </S.ConnectWalletModal>
  )
}

const S = {
  ConnectWalletModal: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Logo: styled.img`
    position: fixed;
    width: 140px;
    height: auto;
    left: 48px;
    top: 24px;
    @media (max-width: ${viewport.xl}) {
      left: 24px;
    }
  `
}
