import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RouteProps } from 'react-router-dom'
import styled from 'styled-components'
import { NftCard } from '../components/marketplace/NftCard'
import { PaginationButton } from '../components/shared/buttons/PaginationButton'
import { SortDropdownFilter } from '../components/shared/buttons/SortDropdownFilter'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'
import { MarketplaceERC20Item } from '../types/MarketplaceTypes'
import { Paged } from '../types/UtilTypes'

export default function MarketplacePage({ location }: RouteProps) {
  const [nfts, setNfts] = useState<MarketplaceERC20Item[]>([])

  useEffect(() => {
    const params = new URLSearchParams(location ? location.search : '')
    const page = params.get('page')
    const limit = params.get('limit')

    const getNfts = async () => {
      const nftItems = (
        await axios.get<Paged<MarketplaceERC20Item[]>>(`http://localhost:5000/marketplace?page=${page || '1'}${limit && `&limit=${limit}`}`)
      ).data
      setNfts(nftItems.data)
    }
    getNfts()
  }, [location])

  return (
    <>
      <Header />
      <S.Main>
        <S.Content>
          <S.SortFilter />
          <S.CardsContainer>
            {nfts.map(nftItem => (
              <NftCard
                key={`${nftItem.address}`}
                id={`${nftItem.address}`}
                image={`${nftItem.erc721.image_url}`}
                name={nftItem.name}
                price={0}
                loading={false}
              />
            ))}
          </S.CardsContainer>
        </S.Content>
      </S.Main>
      <S.Pagination total={100} />
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
