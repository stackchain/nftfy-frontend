import { useReactiveVar } from '@apollo/client'
import { Dropdown, Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import menuIcon from '../../../../assets/menuIcon.svg'
import nftfyIcon from '../../../../assets/nftfy-icon.svg'
import nftfy from '../../../../assets/nftfy.svg'
// import searchIcon from '../../../../assets/searchIcon.svg'
import { accountVar } from '../../../../graphql/variables/WalletVariable'
import { colors, viewport } from '../../../../styles/variables'
import { WalletButton } from '../../../wallet/WalletButton'
import { HeaderMenu } from './HeaderMenu'
import { HeaderWallet } from './HeaderWallet'

export interface HeaderProps {
  page: string
}

export const Header: React.FC<HeaderProps> = ({ page }: HeaderProps) => {
  const account = useReactiveVar(accountVar)

  const menuNavOptions = (
    <S.StyledMenu>
      <Menu.Item key='1'>
        <Link to='/marketplace' className={page === 'explore' ? 'active' : ''}>
          Explore
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/securitize' key='2' className={page === 'securitize' ? 'active' : ''}>
          Securitize
        </Link>
      </Menu.Item>
      <Menu.Item key='2'>
        <Link to='/portfolio' className={page === 'portfolio' ? 'active' : ''}>
          portfolio
        </Link>
      </Menu.Item>
      <Menu.Item key='2' className={page === 'tutorial' ? 'active' : ''}>
        <Link to='/tutorial'>How it works</Link>
      </Menu.Item>
    </S.StyledMenu>
  )
  return (
    <>
      <S.Header>
        <Link to='/'>
          <S.Logo src={nftfy} alt='Nftfy' />
        </Link>
        {/* <HeaderSearch /> */}
        <HeaderMenu page={page} />
        {account ? <WalletButton /> : <HeaderWallet />}
      </S.Header>
      <S.HeaderMobile>
        <Link to='/'>
          <S.Logo src={nftfy} alt='Nftfy' />
          <S.LogoMobile src={nftfyIcon} alt='Nftfy' />
        </Link>
        {/* <S.Search src={searchIcon} alt='Search' /> */}
        <Dropdown overlay={menuNavOptions} trigger={['click']}>
          <S.Menu src={menuIcon} alt='Menu' />
        </Dropdown>
        {account ? <WalletButton /> : <HeaderWallet />}
      </S.HeaderMobile>
    </>
  )
}

const S = {
  Header: styled.header`
    width: 100%;
    height: 88px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0px 48px;
    background: ${colors.white};
    border-bottom: 1px solid ${colors.gray3};
    @media (max-width: ${viewport.lg}) {
      display: none;
    }
  `,
  HeaderMobile: styled.header`
    display: none;
    @media (max-width: ${viewport.lg}) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      height: 64px;
      width: 100%;
      background: ${colors.white};
      padding: 0px 24px;
      align-items: center;

      a {
        display: flex;
        flex: 1;
        justify-content: flex-start;
      }
    }

    @media (max-width: ${viewport.sm}) {
      padding: 16px;
    }
  `,
  Logo: styled.img`
    width: 112px;
    height: 40px;
    margin-right: 24px;
    cursor: pointer;

    @media (max-width: ${viewport.sm}) {
      display: none;
    }
  `,
  ButtonConnectWallet: styled.button`
    width: 250.25px;
    height: 40px;
    background: ${colors.gray1};
    border-radius: 8px;
    border: none;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 24px;
    color: ${colors.gray2};
    margin-left: 48px;
    transition: background-color 0.5s;
    cursor: pointer;
    &:hover {
      background: ${colors.white1};
    }
  `,

  MenuSearchMobile: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  LogoMobile: styled.img`
    width: 40px;
    height: 40px;
    margin-right: auto;
    display: none;

    @media (max-width: ${viewport.sm}) {
      display: flex;
    }
  `,
  Search: styled.img`
    width: 32px;
    height: 32px;
    margin: 0 8px;
    @media (max-width: ${viewport.sm}) {
      margin: 0 4px;
    }
  `,
  Menu: styled.img`
    width: 32px;
    height: 32px;
    margin: 0 8px;
    @media (max-width: ${viewport.sm}) {
      margin: 0 4px;
    }
  `,
  StyledMenu: styled(Menu)`
    margin-top: 8px;
    padding: 8px;
    background: ${colors.white};
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      padding: 16px 18px;
    }
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

        color: ${colors.gray1};
        &.active {
          color: ${colors.gray2};
        }
      }
    }
  `
}
