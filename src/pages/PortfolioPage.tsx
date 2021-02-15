import React from 'react'
import styled from 'styled-components'
import { PortfolioContent } from '../components/portfolio/PortfolioContent'
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <S.Main>
        <S.PortfolioWrapper>
          <S.PortfolioHeader totalValue='3,861.7 2' />
          <S.PortfolioContent />
        </S.PortfolioWrapper>
      </S.Main>
      <Footer />
    </>
  )
}

export const S = {
  Main: styled.main`
    flex: 1;
    padding: 0px 48px;
    background: ${colors.white};
  `,
  PortfolioWrapper: styled.section`
    flex: 1;
    max-width: ${viewport.xxl};
    margin: 0 auto;
  `,
  PortfolioHeader: styled(PortfolioHeader)`
    margin: 32px 0;
  `,
  PortfolioContent: styled(PortfolioContent)`
    margin-bottom: 48px;
  `
}
