import { Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import iconInfo from '../assets/icons/info.svg'
import random from '../assets/nft-card/random.png'
import { NftCard } from '../components/marketplace/NftCard'
import { PaginationButton } from '../components/shared/buttons/PaginationButton'
import { SortDropdownFilter } from '../components/shared/buttons/SortDropdownFilter'
import { Footer, Header } from '../components/shared/layout'
import { colors, fonts, viewport } from '../styles/variables'

export default function SecuritizePage() {
  return (
    <S.PageContent>
      <Header />
      <S.Main>
        <S.Content>
          <S.Top>
            <h1>Securitize</h1>
            <SortDropdownFilter />
          </S.Top>
          <S.List>
            <NftCard image={random} name='Nft Test' url='/securitize' />
            <NftCard image={random} name='Nft Test' url='/securitize' />
            <NftCard image={random} name='Nft Test' url='/securitize' />
            <NftCard image={random} name='Nft Test' url='/securitize' />
            <NftCard image={random} name='Nft Test' url='/securitize' />
            <NftCard image={random} name='Nft Test' url='/securitize' />
          </S.List>
          <S.Pagination>
            <PaginationButton total={6} defaultCurrent={1} limit={12} onChange={() => null} />
          </S.Pagination>
          <S.ActionToken>
            <Tooltip placement='top' title='info'>
              <img src={iconInfo} alt='info' />
            </Tooltip>
            <span>If your token not is listed, add it here </span>
            <S.ButtonToken>Add Token</S.ButtonToken>
          </S.ActionToken>
        </S.Content>
      </S.Main>
      <S.FooterContent>
        <Footer />
      </S.FooterContent>
    </S.PageContent>
  )
}

const S = {
  PageContent: styled.div`
    height: 100%;
    min-height: 100%;
  `,
  Main: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin-top: 80px;
    background: ${colors.white};
    display: flex;
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: ${viewport.xxl};
  `,
  Top: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 41px;
    h1 {
      font-style: normal;
      font-weight: 500;
      font-size: 30px;
      line-height: 38px;
      font-family: ${fonts.montserrat};
      color: ${colors.gray2};
    }
  `,
  List: styled.div`
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
  `,
  ActionToken: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 40px 0;
    span {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: ${colors.gray9};
      padding: 0px 4px 0px 4px;
    }
    @media (max-width: ${viewport.sm}) {
      display: none;
    }
  `,
  ButtonToken: styled.button`
    width: 119px;
    height: 24px;
    border: 1px solid ${colors.gray5};
    box-sizing: border-box;
    border-radius: 8px;
    background: ${colors.white};
    cursor: pointer;
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.gray1};

    &:hover {
      border: 1px solid ${colors.gray2};
      color: ${colors.gray2};
    }
  `,
  Pagination: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  `,
  FooterContent: styled.div`
    margin-top: auto;
  `
}
