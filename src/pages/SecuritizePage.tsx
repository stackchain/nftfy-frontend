import { useReactiveVar } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { RouteProps, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import iconEmpty from '../assets/securitize/icon-empty.svg'
import { PaginationButton } from '../components/shared/buttons/PaginationButton'
import { SortDropdownFilter } from '../components/shared/buttons/SortDropdownFilter'
import { NftCard } from '../components/shared/cards/NftCard'
import { Footer, Header } from '../components/shared/layout'
import { accountVar } from '../graphql/variables/WalletVariable'
import { getPagedERC721Items } from '../services/WalletService'
import { colors, fonts, viewport } from '../styles/variables'
import { WalletErc721Item } from '../types/WalletTypes'

export default function SecuritizePage({ location }: RouteProps) {
  const history = useHistory()
  const params = new URLSearchParams(location ? location.search : '')
  const [nfts, setNfts] = useState<WalletErc721Item[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(Number(params.get('page')) || 1)
  const [currentLimit, setCurrentLimit] = useState(Number(params.get('limit')) || 12)
  const account = useReactiveVar(accountVar)

  const paginate = (pageNumber: number, pageSizeNumber: number) => {
    setCurrentPage(pageNumber)
    setCurrentLimit(pageSizeNumber)

    history.push(`/securitize/?page=${pageNumber}&limit=${pageSizeNumber}`)
  }

  useEffect(() => {
    const getNfts = async () => {
      setLoading(true)
      if (account) {
        const nftItems = await getPagedERC721Items(account, currentPage, currentLimit)
        setNfts(nftItems.data)
        setTotalPages(nftItems.total)
      }
      setLoading(false)
    }
    getNfts()
  }, [currentLimit, currentPage, location, account])

  if (!nfts && !loading)
    return (
      <>
        <S.EmptyNft>
          <img src={iconEmpty} alt='Empty' />
          <span>Você não tem nenhum ERC721</span>
          <small>Para comprar seu primeiro Token Erc721 acesse o link abaixo</small>
          <S.ButtonExploreEmpty href='/marketplace'>Explore</S.ButtonExploreEmpty>
        </S.EmptyNft>
      </>
    )

  const loadingCards = []
  for (let i = 1; i <= currentLimit; i += 1) {
    loadingCards.push(<NftCard key={`card-loading-${i}`} loading securitize />)
  }

  return (
    <>
      <Header page='securitize' />
      <S.Main>
        <S.Content>
          {/* {(loading || !!nfts.length) && <S.SortFilter />} */}
          <S.CardsContainer className={`${!loading && !nfts.length && 'empty'}`}>
            {loading && loadingCards}
            {!loading &&
              nfts.map(nftItem => (
                <NftCard
                  key={`${nftItem.address}-${nftItem.tokenId}`}
                  image={`${nftItem.image_url}`}
                  name={nftItem.name}
                  address={nftItem.address}
                  url={`/securitize/${nftItem.address}/${nftItem.tokenId}`}
                  loading={loading}
                  tokenId={nftItem.tokenId}
                  securitize
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
    min-height: calc(100vh - 136px);
    background: ${colors.white};
    display: flex;
    justify-content: center;
  `,
  Content: styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 96px 48px 32px 48px;
    max-width: ${viewport.xxl};
    height: 100%;
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
  EmptyNft: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    span {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: ${colors.gray1};
      margin-top: 20px;
    }
    small {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: ${colors.gray1};
    }

    @media (max-width: ${viewport.sm}) {
      span {
        text-align: center;
      }
      small {
        text-align: center;
      }
    }
  `,
  ButtonExploreEmpty: styled.a`
    width: 192px;
    height: 40px;
    border: 1px solid ${colors.gray5};
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray1};
    margin-top: 28px;
    &:hover {
      color: ${colors.gray2};
      border: 1px solid ${colors.gray4};
    }
  `
}
