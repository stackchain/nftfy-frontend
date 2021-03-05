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
    flex: 1;
    min-height: calc(100vh - 136px);
    background: ${colors.white};
    display: flex;
    justify-content: center;
  `,
  Container: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 32px 48px;

    max-width: ${viewport.xxl};

    @media (max-width: ${viewport.xxl}) {
      padding: 0px 48px;
    }
    @media (max-width: ${viewport.xl}) {
      padding: 0px 24px;
      height: calc(100vh - 64px - 48px);
      flex-direction: column-reverse;
    }
    @media (max-width: ${viewport.sm}) {
      padding: 0px 8px;
      margin: 40px 0px;
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
