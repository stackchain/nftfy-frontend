import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connectWalletModalVar } from '../../graphql/variables/WalletVariable'
import { colors, viewport } from '../../styles/variables'

export interface Erc20ShareNotFoundProps {
  className?: string
  account: boolean
}
export const Erc20ShareNotFound: React.FC<Erc20ShareNotFoundProps> = ({ className, account }: Erc20ShareNotFoundProps) => {
  const openConnectWalletModal = () => {
    connectWalletModalVar(true)
  }
  return (
    <S.Erc20ShareNotFound className={className}>
      {account ? (
        <>
          <S.H1>You have no ERC20 shares!</S.H1>
          <S.Span>To buy your first Erc20 Shares Token access the link below</S.Span>
          <S.LinkItem to='/portfolio'>
            <S.Button>Explore</S.Button>
          </S.LinkItem>
        </>
      ) : (
        <>
          <S.H1>Please connect your wallet</S.H1>
          <S.Span>To see the portfolio you will need to connect the wallet</S.Span>
          <S.Button onClick={openConnectWalletModal}>Connect Wallet</S.Button>
        </>
      )}
    </S.Erc20ShareNotFound>
  )
}
export const S = {
  Erc20ShareNotFound: styled.section`
    flex: 1;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 5px;

    border: 1px solid ${colors.gray10};
    box-sizing: border-box;
    border-radius: 8px;
    @media (max-width: ${viewport.md}) {
      text-align: center;
    }
  `,
  H1: styled.h1`
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 2.3rem;
    line-height: 3rem;

    color: ${colors.gray1};
    @media (max-width: ${viewport.md}) {
      font-size: 2.2rem;
    }
  `,
  Span: styled.span`
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 2.2rem;

    color: ${colors.gray1};
    @media (max-width: ${viewport.md}) {
      font-size: 1.2rem;
    }
  `,
  Button: styled(Button)`
    width: 100%;
    max-width: 192px;
    height: 40px;

    border: 1px solid ${colors.gray5};
    box-sizing: border-box;
    border-radius: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: ${colors.gray1};
    &:focus {
      color: ${colors.gray1};
      border: 1px solid ${colors.gray5};
      outline: none;
    }
    &:hover {
      color: ${colors.gray1};
      border: 1px solid ${colors.gray5};
    }
  `,
  LinkItem: styled(Link)`
    text-decoration: none;
  `
}
