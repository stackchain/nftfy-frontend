import React from 'react'
import styled from 'styled-components'
import search from '../../../../assets/searchIcon.svg'
import { colors, fonts } from '../../../../styles/variables'

export const HeaderSearch: React.FC = () => {
  return (
    <S.Search>
      <S.SearchIcon src={search} alt='search icon' />
      <S.SearchInput placeholder='Search' />
    </S.Search>
  )
}

const S = {
  Search: styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 24px;
    margin-right: 0;
  `,

  SearchInput: styled.input.attrs({ type: 'text' })`
    width: 100%;
    background: ${colors.white1};
    border-radius: 8px;
    border: none;
    height: 100%;
    outline: none;
    font-family: ${fonts.montserrat};
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 24px;
    padding-left: 48px;
    padding-right: 8px;
    color: ${colors.gray2};
  `,
  SearchIcon: styled.img`
    position: absolute;
    margin-left: 12px;
    width: 28px;
    height: 28px;
  `
}
