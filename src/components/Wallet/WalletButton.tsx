import { Dropdown, Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import tokenWallet from '../../assets/walletImage.svg'
import { colors } from '../../styles/variables'

export const WalletButton: React.FC = () => {
  const WalletMenuItens = (
    <S.StyledMenu>
      <Menu.Item key='0'>
        <S.Link href='http://www.google.com/'>Wallet</S.Link>
      </Menu.Item>
      <Menu.Item key='1'>
        <S.Link href='http://www.google.com/'>Buy NFY</S.Link>
      </Menu.Item>
      <Menu.Item key='3'>
        <S.Link href='http://www.google.com/'>What is NFY</S.Link>
      </Menu.Item>
    </S.StyledMenu>
  )
  return (
    <Dropdown overlay={WalletMenuItens} trigger={['click']}>
      <S.WalletButtonArea>
        <S.WalletButton type='button'>1.000.00 NFY</S.WalletButton>
        <S.TokenWallet src={tokenWallet} alt='wallet token' />
      </S.WalletButtonArea>
    </Dropdown>
  )
}

const S = {
  WalletButtonArea: styled.div`
    display: flex;
    flex-direction: row;
    width: auto;
  `,
  WalletButton: styled.button`
    width: 100%;
    padding: 0 24px;
    min-width: 120px;
    height: 40px;
    background: ${colors.white1};
    border-radius: 8px;
    border: none;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 24px;
    color: ${colors.gray2};
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.5s;
    &:hover {
      background: ${colors.gray3};
    }
    &:focus {
      border: none;
      outline: none;
    }
  `,
  TokenWallet: styled.img`
    width: 40px;
    height: 40px;
    margin-left: -18px;
  `,
  Link: styled.a`
    color: red;
  `,
  StyledMenu: styled(Menu)`
    width: 192px;
    margin-top: 8px;
    padding: 8px;
    background: ${colors.white};
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    .ant-dropdown-menu-item {
      &:hover {
        background: ${colors.white};
      }
      & > a {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 22px;

        display: flex;
        align-items: center;

        color: ${colors.gray4};
      }
    }
  `
}
