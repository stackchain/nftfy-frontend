import React from 'react'
import styled from 'styled-components'
import { ClaimModal } from '../components/portfolio/ClaimModal'
import { PortfolioContent } from '../components/portfolio/PortfolioContent'
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader'
import { PortfolioTokensContent } from '../components/portfolio/PortfolioTokensContent'
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
          <S.PortfolioTokensContent />
        </S.PortfolioWrapper>
      </S.Main>
      <ClaimModal />
      <Footer />
    </>
  )
}

export const S = {
  Main: styled.main`
    flex: 1;
    padding: 32px 48px;
    background: ${colors.white};
    min-height: calc(100vh - 136px);

    @media (max-width: ${viewport.xl}) {
      padding: 32px 24px;
    }

    @media (max-width: ${viewport.sm}) {
      padding: 32px 8px;
    }
  `,
  PortfolioWrapper: styled.section`
    flex: 1;
    max-width: ${viewport.xxl};
    margin: 0 auto;
  `,
  PortfolioHeader: styled(PortfolioHeader)`
    margin-bottom: 32px;
  `,
  PortfolioContent: styled(PortfolioContent)`
    margin-bottom: 48px;
  `,
  PortfolioTokensContent: styled(PortfolioTokensContent)``
}
