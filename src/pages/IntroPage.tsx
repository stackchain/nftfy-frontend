import React from 'react'
import styled from 'styled-components'
import comunityDefy from '../assets/comunityDefy.svg'
import { IntroAction } from '../components/intro/IntroAction'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'

export default function IntroPage() {
  return (
    <>
      <Header />
      <S.Main>
        <S.ActionIntro />
        <S.AreaVideo src={comunityDefy} />
      </S.Main>
      <Footer />
    </>
  )
}

export const S = {
  Main: styled.main`
    display: flex;
    height: 100vh;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${colors.white};
    padding: 0 48px;
    flex-wrap: wrap-reverse;
    @media (max-width: ${viewport.xl}) {
      flex-wrap: nowrap;
      flex-flow: column-reverse;
    }
    @media (max-width: ${viewport.md}) {
      padding: 0 24px;
    }
    @media (max-width: ${viewport.sm}) {
      padding: 0 8px;
    }
  `,

  ActionIntro: styled(IntroAction)`
    margin-right: 32px;
    @media (max-width: ${viewport.xl}) {
      margin-right: 0;
      margin-top: 32px;
    }
  `,
  AreaVideo: styled.img`
    @media (max-width: ${viewport.lg}) {
      width: 100%;
      height: auto;
    }
  `
}
