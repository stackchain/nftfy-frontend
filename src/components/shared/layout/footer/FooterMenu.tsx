import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors, fonts, viewport } from '../../../../styles/variables'

export const FooterMenu: React.FC = () => {
  return (
    <S.Menu>
      <S.LinkItem to='/terms'>Terms</S.LinkItem>
      <S.LinkItem to='/privacy-policy'>Privacy Policy</S.LinkItem>
    </S.Menu>
  )
}

const S = {
  Menu: styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: auto;
    @media (max-width: ${viewport.xl}) {
      display: none;
    }
  `,
  LinkItem: styled(Link)`
    font-family: ${fonts.montserrat};
    font-weight: 500;
    text-decoration: none;
    font-size: 1.2rem;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: ${colors.gray1};
    display: flex;
    align-items: center;
    margin-left: 34px;
    &:hover {
      color: ${colors.gray2};
    }
  `
}
