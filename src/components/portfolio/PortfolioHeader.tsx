import { Skeleton } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { colors, viewport } from '../../styles/variables'

export interface PortfolioHeaderProps {
  totalValue: string
  className?: string
  loading: boolean
}
export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ className, totalValue, loading }: PortfolioHeaderProps) => {
  const titleStylePortFolio = {
    width: '130px',
    height: '38px',
    margin: 0
  }

  const titleStyleValue = {
    width: '66px',
    height: '38px',
    margin: 0
  }

  return (
    <S.PortfolioHeader className={className}>
      <Skeleton loading={loading} active title={{ style: titleStylePortFolio }} paragraph={{ rows: 1 }}>
        <S.ContentTitle>
          <S.H1Title>Portfolio</S.H1Title>
          <S.H2Title>Assets</S.H2Title>
        </S.ContentTitle>
      </Skeleton>
      <S.ContentValues>
        <Skeleton loading={loading} active title={{ style: titleStyleValue }} paragraph={{ rows: 1 }}>
          <S.SpanTotalValue>{`$${totalValue}`}</S.SpanTotalValue>
          <S.SpanAcquiredValue>+2.7%($102.89)</S.SpanAcquiredValue>
        </Skeleton>
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
    .ant-skeleton-content .ant-skeleton-paragraph > li {
      width: 66px !important;
      height: 28px !important;
    }
    .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph {
      margin-top: 9px;
    }
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
    @media (max-width: ${viewport.md}) {
      font-size: 28px;
    }
  `,
  H2Title: styled.h2`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin: 0;

    color: ${colors.gray2};
    @media (max-width: ${viewport.md}) {
      font-size: 18px;
    }
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
    @media (max-width: ${viewport.md}) {
      font-size: 34px;
    }
  `,
  SpanAcquiredValue: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    color: ${colors.green};
    @media (max-width: ${viewport.md}) {
      font-size: 15px;
    }
  `
}
