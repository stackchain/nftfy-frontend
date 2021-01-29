import React from 'react'
import styled from 'styled-components'
import menuIcon from '../../../../assets/menuIcon.svg'
import nftfyHeaderLogo from '../../../../assets/nftfyHeaderLogo.svg'
import nftfyHeaderLogoMobile from '../../../../assets/nftfyHeaderLogoMobile.svg'
import searchIcon from '../../../../assets/searchIcon.svg'
import { colors, viewport } from '../../../../styles/variables'
import { HeaderMenu } from './HeaderMenu'
import { HeaderSearch } from './HeaderSearch'
import { HeaderWallet } from './HeaderWallet'

export const Header: React.FC = () => {
  return (
    <>
      <S.Header>
        <S.Logo src={nftfyHeaderLogo} alt='Nftfy' />
        <HeaderSearch />
        <HeaderMenu />
        <HeaderWallet />
      </S.Header>
      <S.HeaderMobile>
        <S.LogoMobile src={nftfyHeaderLogoMobile} alt='Nftfy' />
        <S.Search src={searchIcon} alt='Search' />
        <S.Menu src={menuIcon} alt='Menu' />
        <HeaderWallet />
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
    @media (max-width: ${viewport.xl}) {
      display: none;
    }
  `,
  HeaderMobile: styled.header`
    display: none;
    @media (max-width: ${viewport.xl}) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      height: 64px;
      width: 100%;
      background: ${colors.white};
      padding: 0px 24px;
      align-items: center;
    }

    @media (max-width: ${viewport.sm}) {
      padding: 4px;
    }
  `,
  Logo: styled.img`
    width: 128px;
    height: 40px;
    margin-right: 24px;
  `,
  ButtonConnectWallet: styled.button`
    width: 250.25px;
    height: 40px;
    background: ${colors.gray1};
    border-radius: 8px;
    border: none;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
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
    width: 32px;
    height: 32px;
    margin-right: auto;
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
  `
}
