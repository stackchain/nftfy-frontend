import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { colors, viewport } from '../../styles/variables'

export interface ActionIntroProps {
  className?: string
}

export const IntroActions: React.FC<ActionIntroProps> = ({ className }: ActionIntroProps) => {
  return (
    <S.ContentInfoPage className={className}>
      <S.H1>Explore and discovery a world of NFT securitization</S.H1>
      <S.H2>Welcome to Nftfy</S.H2>
      <S.AreaActionButtons>
        <S.ButtonExplore href='/marketplace'>Explore</S.ButtonExplore>
        <S.ButtonSecuritize href='/securitize'>Securitize</S.ButtonSecuritize>
      </S.AreaActionButtons>
    </S.ContentInfoPage>
  )
}

const S = {
  ContentInfoPage: styled.section`
    max-width: 592px;
    max-height: 242px;
    background: ${colors.white};
  `,
  H1: styled.h1`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 3.8rem;
    line-height: 4.6rem;
    color: ${colors.gray2};
    margin-bottom: 18px;

    @media (max-width: ${viewport.sm}) {
      font-size: 3rem;
      line-height: 3.8rem;
      margin-bottom: 8px;
    }
  `,
  H2: styled.h2`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 3.2rem;

    color: ${colors.gray2};
    margin-bottom: 60px;

    @media (max-width: ${viewport.sm}) {
      font-size: 1.6rem;
      line-height: 2.4rem;
      margin-bottom: 32px;
    }
  `,
  AreaActionButtons: styled.div`
    display: flex;
    flex-direction: row;
  `,
  ButtonExplore: styled(Button)`
    flex: 1;
    max-width: 190px;
    height: 40px;
    cursor: pointer;

    background: linear-gradient(90deg, #fe8367 5.73%, #fe7688 100%);
    border-radius: 8px;
    margin-right: 32px;
    border: none;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;

    color: ${colors.white};
    &:focus {
      border: none;
      outline: none;
    }
  `,
  ButtonSecuritize: styled(Button)`
    flex: 1;
    max-width: 190px;
    height: 40px;
    cursor: pointer;

    background: ${colors.white};
    border-radius: 8px;
    border: 1px solid ${colors.gray6};
    box-sizing: border-box;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.4rem;

    color: ${colors.gray2};
    &:focus {
      outline: none;
    }
  `
}
