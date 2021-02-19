import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { connectWalletModalVar } from '../../../../graphql/variables/WalletVariable'
import { colors, fonts, viewport } from '../../../../styles/variables'

export const HeaderWallet: React.FC = () => {
  const openConnectWalletModal = () => {
    connectWalletModalVar(true)
  }

  return <S.Button onClick={openConnectWalletModal}>Connect Wallet</S.Button>
}

const S = {
  Button: styled(Button)`
    width: 100%;
    max-width: 192px;
    height: 40px;
    background: ${colors.white1};
    border-radius: 8px;
    border: none;
    font-family: ${fonts.montserrat};
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 24px;
    color: ${colors.gray2};
    margin-left: 24px;
    transition: background-color 0.5s;
    padding: 0;
    cursor: pointer;

    &:hover {
      background: ${colors.gray3};
      color: ${colors.gray2};
    }

    &:focus {
      border: none;
      outline: none;
    }

    @media (max-width: ${viewport.xl}) {
      margin-left: 16px;
    }

    @media (max-width: ${viewport.sm}) {
      max-width: 148px;
      margin-left: 12px;
    }
  `
}
