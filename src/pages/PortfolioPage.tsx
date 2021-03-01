import { useReactiveVar } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ClaimModal } from '../components/portfolio/ClaimModal'
import { PortfolioContent } from '../components/portfolio/PortfolioContent'
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader'
import { Footer, Header } from '../components/shared/layout'
import { accountVar } from '../graphql/variables/WalletVariable'
import { getERC20Shares } from '../services/WalletService'
import { colors, viewport } from '../styles/variables'
import { WalletERC20Share } from '../types/WalletTypes'

export default function PortfolioPage() {
  const [erc20share, setErc20share] = useState<WalletERC20Share[]>([])
  const [loading, setLoading] = useState(true)
  const account = useReactiveVar(accountVar)

  useEffect(() => {
    const getErc20shares = async () => {
      if (account) {
        setLoading(true)
        setErc20share([])
        const nfts = await getERC20Shares(account)
        setErc20share(nfts)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    getErc20shares()
  }, [account])

  return (
    <>
      <Header />
      <S.Main>
        <S.PortfolioWrapper>
          {account && <S.PortfolioHeader totalValue='3,861.7 2' loading={!!loading} />}
          <S.PortfolioContent erc20share={erc20share} loading={!!loading} account={!!account} />
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
  `
}
