import { Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import { RouteProps, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PaginationButton } from '../components/shared/buttons/PaginationButton'
import { SortDropdownFilter } from '../components/shared/buttons/SortDropdownFilter'
import { NftCard } from '../components/shared/cards/NftCard'
import { Footer, Header } from '../components/shared/layout'
import { getMarketplaceItems } from '../services/MarketplaceService'
import { colors, viewport } from '../styles/variables'
import { MarketplaceERC20Item } from '../types/MarketplaceTypes'

export default function MarketplacePage({ location }: RouteProps) {
  const history = useHistory()
  const params = new URLSearchParams(location ? location.search : '')
  const [nfts, setNfts] = useState<MarketplaceERC20Item[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(Number(params.get('page')) || 1)
  const [currentLimit, setCurrentLimit] = useState(Number(params.get('limit')) || 12)
  const [loading, setLoading] = useState(true)

  const paginate = (pageNumber: number, pageSizeNumber: number) => {
    setLoading(true)
    setCurrentPage(pageNumber)
    setCurrentLimit(pageSizeNumber)

    history.push(`/marketplace/?page=${pageNumber}&limit=${pageSizeNumber}`)
  }

  useEffect(() => {
    const getNfts = async () => {
      const nftItems = await getMarketplaceItems(currentPage, currentLimit)
      setLoading(false)
      setNfts(nftItems.data)
      setTotalPages(nftItems.total)
    }
    getNfts()
  }, [currentLimit, currentPage, location])

  const loadingCards = []
  for (let i = 1; i <= currentLimit; i += 1) {
    loadingCards.push(<NftCard key={`card-loading-${i}`} loading securitize={false} />)
  }
  return (
    <>
      <Header page='explore' />
      <S.Main>
        <S.Content>
          {(loading || !!nfts.length) && <S.SortFilter />}
          <S.CardsContainer className={`${!loading && !nfts.length && 'empty'}`}>
            {loading && loadingCards}
            {!loading && !nfts.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {!loading &&
              nfts.map(nftItem => (
                <NftCard
                  key={`${nftItem.address}`}
                  image={`${nftItem.erc721.image_url}`}
                  name={nftItem.name}
                  price={0}
                  url={`/marketplace/${nftItem.address}`}
                  securitize={false}
                />
              ))}
          </S.CardsContainer>
          {(loading || !!nfts.length) && (
            <S.Pagination defaultCurrent={currentPage} limit={currentLimit} total={totalPages || 1} onChange={paginate} />
          )}
        </S.Content>
      </S.Main>
      <Footer />
    </>
  )
}

export const S = {
  Main: styled.main`
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 136px);
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

  CardsContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 16px 16px;
    margin-bottom: 32px;

    &.empty {
      grid-template-columns: 1fr;
      height: 100px;
      margin-top: 100px;
      margin-bottom: 132px;
    }

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
  `,
  Pagination: styled(PaginationButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.white};

    .hide {
      display: none;
    }
  `
}
