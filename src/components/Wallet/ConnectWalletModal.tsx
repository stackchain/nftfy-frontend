import React from 'react'
import styled from 'styled-components'
import nftfyHeaderLogo from '../../assets/nftfyHeaderLogo.svg'
import { colors, viewport } from '../../styles/variables'
import { ConnectWallet } from './ConnectWallet'

export const ConnectWalletModal: React.FC = () => {
  return (
    <S.ConnectWalletModal>
      <S.Logo src={nftfyHeaderLogo} />
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
    left: 48px;
    top: 24px;
    @media (max-width: ${viewport.xl}) {
      left: 24px;
    }
  `
}
