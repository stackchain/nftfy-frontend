import React from 'react'
import styled from 'styled-components'
import communityDefy from '../assets/communityDefy.svg'
import { IntroActions } from '../components/intro/IntroActions'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'

export default function IntroPage() {
  return (
    <>
      <Header />
      <S.Main>
        <S.BoxActionIntro>
          <IntroActions />
        </S.BoxActionIntro>
        <S.AreaDivVideo>
          <S.AreaVideo src={communityDefy} />
        </S.AreaDivVideo>
      </S.Main>
      <Footer />
    </>
  )
}

export const S = {
  Main: styled.main`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${colors.white};
    padding: 230px 48px;
    @media (max-width: ${viewport.xxl}) {
      padding: 100px 48px;
    }
    @media (max-width: ${viewport.xl}) {
      flex-direction: column-reverse;
      padding: 100px 24px;
    }
    @media (max-width: ${viewport.sm}) {
      padding: 40px 8px;
    }
  `,
  BoxActionIntro: styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 16px;
    @media (max-width: ${viewport.xl}) {
      margin-right: 0;
      margin-top: 16px;
    }
  `,
  AreaDivVideo: styled.div`
    flex: 1;
    display: flex;
    margin-left: 16px;
    @media (max-width: ${viewport.xl}) {
      align-items: flex-end;
      margin-bottom: 16px;
      margin-left: 0px;
    }
  `,
  AreaVideo: styled.img`
    max-width: 764px;
    max-height: 524px;
    width: 100%;
    height: auto;
  `
}
