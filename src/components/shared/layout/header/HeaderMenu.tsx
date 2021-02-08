import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors, fonts } from '../../../../styles/variables'

export const HeaderMenu: React.FC = () => {
  return (
    <S.Menu>
      <S.LinkItem to='/marketplace/1' className='active'>
        Explore
      </S.LinkItem>
      <S.LinkItem to='/securitize'>Securitize</S.LinkItem>
      <S.LinkItem to='/portfolio'>Portfolio</S.LinkItem>
      <S.LinkItem to='/tutorial'>How it works</S.LinkItem>
    </S.Menu>
  )
}

const S = {
  Menu: styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 480px;
    margin: 0 24px;
    height: 40px;
  `,
  LinkItem: styled(Link)`
    font-family: ${fonts.montserrat};
    font-weight: 500;
    text-decoration: none;
    font-size: 1.6rem;
    line-height: 18px;
    display: flex;
    align-items: center;
    color: ${colors.gray1};
    margin: 0 24px;

    &:hover {
      color: ${colors.gray2};
    }

    &:nth-last-child(2) {
      margin-left: 24px;
      margin-right: 0;
      &::after {
        margin-left: 24px;
        margin-right: 0;
        content: '|';
        font-family: ${fonts.montserrat};
        font-weight: 300;
        color: ${colors.gray3};
        cursor: default;
      }
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: ${colors.gray2};
    }
  `
}
