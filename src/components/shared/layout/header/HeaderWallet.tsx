import React from 'react'
import styled from 'styled-components'
import { colors, fonts, viewport } from '../../../../styles/variables'

export const HeaderWallet: React.FC = () => {
  return <S.Button type='button'>Connect Wallet</S.Button>
}

const S = {
  Button: styled.button`
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

    cursor: pointer;

    &:hover {
      background: ${colors.gray3};
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
