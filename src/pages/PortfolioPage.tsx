import React from 'react'
import styled from 'styled-components'
import { Erc721Content } from '../components/portfolio/erc721Content'
import { HeaderPortfolio } from '../components/portfolio/headerPortfolio'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <S.Main>
        <S.ContentPortfolio>
          <S.HeaderPortfolio totalValue='3,861.7 2' />
          <S.Erc721Content />
        </S.ContentPortfolio>
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
  ContentPortfolio: styled.section`
    flex: 1;
    max-width: ${viewport.xxl};
    margin: 0 auto;
  `,
  HeaderPortfolio: styled(HeaderPortfolio)`
    margin: 32px 0;
  `,
  Erc721Content: styled(Erc721Content)`
    margin-bottom: 48px;
  `
}
