import React from 'react'
import styled from 'styled-components'
import communityDefy from '../assets/communityDefy.svg'
import { IntroActions } from '../components/intro/IntroActions'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'

export default function IntroPage() {
  return (
    <>
      <Header page='index' />
      <S.Main>
        <S.Container>
          <S.BoxActionIntro>
            <IntroActions />
          </S.BoxActionIntro>
          <S.AreaDivVideo>
            <S.AreaVideo src={communityDefy} />
          </S.AreaDivVideo>
        </S.Container>
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
    height: calc(100vh - 88px - 48px);
    background: red;
    padding: 0px 48px;
    background: ${colors.white};
    @media (max-width: ${viewport.xxl}) {
      padding: 0px 48px;
    }
    @media (max-width: ${viewport.xl}) {
      padding: 0px 24px;
      height: calc(100vh - 64px - 48px);
    }
    @media (max-width: ${viewport.sm}) {
      padding: 0px 8px;
      margin: 40px 0px;
    }
  `,
  Container: styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media (max-width: ${viewport.xl}) {
      flex-direction: column-reverse;
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

    @media (max-width: ${viewport.xl}) {
      max-height: 380px;
    }
  `
}
