import React, { useState } from 'react'
import styled from 'styled-components'
import { NftCard, NftCardProps } from '../components/marketplace/NftCard'
import { PaginationButton } from '../components/shared/buttons/PaginationButton'
import { SortDropdownFilter } from '../components/shared/buttons/SortDropdownFilter'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'
import { nftsMock } from '../__mocks__/pages/MarketplacePage.mock'

export default function MarketplacePage() {
  const [nfts] = useState<NftCardProps[]>(nftsMock)

  return (
    <>
      <Header />
      <S.Main>
        <S.Content>
          <S.SortFilter />
          <S.CardsContainer>
            {nfts.map(nftItem => (
              <NftCard
                key={nftItem.id}
                id={nftItem.id}
                image={nftItem.image}
                name={nftItem.name}
                price={nftItem.price}
                loading={nftItem.loading}
              />
            ))}
          </S.CardsContainer>
        </S.Content>
      </S.Main>
      <S.Pagination total={50} />
      <Footer />
    </>
  )
}

export const S = {
  Main: styled.main`
    width: 100%;
    height: 100%;
    background: ${colors.white};
    display: flex;
    justify-content: center;
  `,
  Content: styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 32px 48px;
    height: 100%;

    max-width: ${viewport.xxl};

    @media (max-width: ${viewport.xl}) {
      padding: 32px 24px;
    }

    @media (max-width: ${viewport.sm}) {
      padding: 32px 8px;
    }
  `,
  SortFilter: styled(SortDropdownFilter)`
    margin-bottom: 32px;
    align-self: flex-end;

    @media (max-width: ${viewport.lg}) {
      margin-bottom: 24px;
    }
  `,
  Pagination: styled(PaginationButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    background: ${colors.white};
  `,
  CardsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 16px 16px;

    @media (max-width: ${viewport.xl}) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (max-width: ${viewport.lg}) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: ${viewport.md}) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: ${viewport.sm}) {
      grid-template-columns: 1fr;
    }
  `
}
