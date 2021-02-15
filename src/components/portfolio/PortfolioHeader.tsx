import React from 'react'
import styled from 'styled-components'
import { colors } from '../../styles/variables'

export interface PortfolioHeaderProps {
  totalValue: string
  className?: string
}
export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ className, totalValue }: PortfolioHeaderProps) => {
  return (
    <S.PortfolioHeader className={className}>
      <S.ContentTitle>
        <S.H1Title>Portfolio</S.H1Title>
        <S.H2Title>Assets</S.H2Title>
      </S.ContentTitle>
      <S.ContentValues>
        <S.SpanTotalValue>{`$${totalValue}`}</S.SpanTotalValue>
        <S.SpanAcquiredValue>+2.7%($102.89)</S.SpanAcquiredValue>
      </S.ContentValues>
    </S.PortfolioHeader>
  )
}
export const S = {
  PortfolioHeader: styled.header`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${colors.white};
  `,
  ContentTitle: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
  `,
  H1Title: styled.h1`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 38px;
    margin: 0;

    color: ${colors.gray2};
  `,
  H2Title: styled.h2`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin: 0;

    color: ${colors.gray2};
  `,
  ContentValues: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  `,
  SpanTotalValue: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;

    color: ${colors.gray2};
  `,
  SpanAcquiredValue: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    color: ${colors.green};
  `
}
