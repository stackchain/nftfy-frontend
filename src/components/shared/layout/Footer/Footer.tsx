import React from 'react'
import styled from 'styled-components'
import { colors, fonts, viewport } from '../../../../styles/variables'
import { FooterMenu } from './FooterMenu'
import { FooterMenuSocial } from './FooterMenuSocial'

export const Footer: React.FC = () => {
  return (
    <S.Footer>
      <S.Span>© Nftfy 2021, All rights reserved.</S.Span>
      <FooterMenu />
      <FooterMenuSocial />
    </S.Footer>
  )
}

const S = {
  Footer: styled.footer`
    width: 100%;
    height: 48px;
    padding: 0 48px;
    background: ${colors.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: ${viewport.xl}) {
      padding: 0;
      justify-content: center;
    }
  `,
  Span: styled.span`
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 22px;

    display: flex;
    align-items: center;

    color: ${colors.gray1};
    @media (min-width: ${viewport.xxl}) {
      &::after {
        margin-left: 24px;
        content: '|';
        font-family: ${fonts.montserrat};
        font-weight: 300;
        color: ${colors.gray3};
        cursor: default;
      }
    }
  `
}
