import { useReactiveVar } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { RouteProps, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { NftCard } from '../components/marketplace/NftCard'
import { PaginationButton } from '../components/shared/buttons/PaginationButton'
import { SortDropdownFilter } from '../components/shared/buttons/SortDropdownFilter'
import { Footer, Header } from '../components/shared/layout'
import { accountVar } from '../graphql/variables/WalletVariable'
import { getPagedERC721Items } from '../services/WalletService'
import { colors, viewport } from '../styles/variables'
import { WalletErc721Item } from '../types/WalletTypes'

export default function SecuritizePage({ location }: RouteProps) {
  const history = useHistory()
  const params = new URLSearchParams(location ? location.search : '')
  const [nfts, setNfts] = useState<WalletErc721Item[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(Number(params.get('page')) || 1)
  const [currentLimit, setCurrentLimit] = useState(Number(params.get('limit')) || 12)
  const account = useReactiveVar(accountVar)

  const paginate = (pageNumber: number, pageSizeNumber: number) => {
    setCurrentPage(pageNumber)
    setCurrentLimit(pageSizeNumber)

    history.push(`/marketplace/?page=${pageNumber}&limit=${pageSizeNumber}`)
  }

  useEffect(() => {
    const getNfts = async () => {
      if (account) {
        const nftItems = await getPagedERC721Items(account, currentPage, currentLimit)

        setNfts(nftItems.data)
        setTotalPages(nftItems.total)
      }
    }
    getNfts()
  }, [currentLimit, currentPage, location, account])

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
                image={`${nftItem.image_url}`}
                name={nftItem.name}
                price={0}
                url={`/securitize/${nftItem.address}/${nftItem.tokenId}`}
              />
            ))}
          </S.CardsContainer>
        </S.Content>
      </S.Main>
      {totalPages && <S.Pagination total={totalPages} limit={currentLimit} defaultCurrent={currentPage} onChange={paginate} />}
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
