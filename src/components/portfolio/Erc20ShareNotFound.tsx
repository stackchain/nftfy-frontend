import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { colors } from '../../styles/variables'

export interface Erc20ShareNotFoundProps {
  className?: string
}
export const Erc20ShareNotFound: React.FC<Erc20ShareNotFoundProps> = ({ className }: Erc20ShareNotFoundProps) => {
  return (
    <S.Erc20ShareNotFound className={className}>
      <S.H1>You have no ERC20 shares!</S.H1>
      <S.Span>To buy your first Erc20 Shares Token access the link below</S.Span>
      <S.Button>Explore</S.Button>
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
    padding: 32px 0px;

    border: 1px solid ${colors.gray10};
    box-sizing: border-box;
    border-radius: 8px;
  `,
  H1: styled.h1`
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.2rem;

    color: ${colors.gray1};
  `,
  Span: styled.span`
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray1};
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
  `
}
