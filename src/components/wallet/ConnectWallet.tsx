import React from 'react'
import styled from 'styled-components'
import exclamationIcon from '../../assets/exclamationIcon.svg'
import metaMask from '../../assets/metaMask.svg'
import shape from '../../assets/shape.svg'
import { colors, viewport } from '../../styles/variables'

export const ConnectWallet: React.FC = () => {
  return (
    <S.ConnectWallet>
      <S.BackArrow>
        <S.ArrowIcon src={shape} alt='go back' />
        <S.Span>Go back</S.Span>
      </S.BackArrow>
      <S.Title>Connect your wallet</S.Title>
      <S.ButtonConnect>
        <S.ConnectIcon src={metaMask} alt='Metamask' />
        <S.ConnectSpan>Metamask</S.ConnectSpan>
      </S.ButtonConnect>
      <S.Info>
        <S.AttentionIcon src={exclamationIcon} alt='exclamation' />
        <S.SpanInfo>We do not own your private keys and cannot access your funds without your confirmation.</S.SpanInfo>
      </S.Info>
    </S.ConnectWallet>
  )
}

const S = {
  ConnectWallet: styled.div`
    width: 100%;
    height: 100%;
    max-width: 416px;
    max-height: 248px;
    display: flex;
    flex-direction: column;
    @media (max-width: ${viewport.sm}) {
      padding: 24px;
      margin-bottom: 118px;
    }
  `,
  BackArrow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;
    cursor: pointer;
  `,
  ArrowIcon: styled.img`
    margin-right: 9px;
    margin-bottom: 2px;
  `,
  Span: styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 24px;
    color: ${colors.gray2};
    @media (max-width: ${viewport.sm}) {
      font-size: 1.4rem;
    }
  `,
  Title: styled.h1`
    font-style: normal;
    font-weight: 500;
    font-size: 3.8rem;
    line-height: 46px;
    color: ${colors.gray2};
    @media (max-width: ${viewport.sm}) {
      font-size: 3.4rem;
    }
  `,
  ButtonConnect: styled.button`
    width: 100%;
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    align-items: center;
    background: ${colors.white};
    margin-bottom: 40px;
    outline: none;
    cursor: pointer;
  `,
  ConnectIcon: styled.img`
    margin-right: 8px;
    margin-left: 16px;
    background: transparent;
  `,
  ConnectSpan: styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 24px;
    color: ${colors.gray2};
    @media (max-width: ${viewport.sm}) {
      font-size: 1.4rem;
    }
  `,
  Info: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  AttentionIcon: styled.img`
    margin-right: 7px;
  `,
  SpanInfo: styled.span`
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 22px;

    display: flex;
    align-items: center;

    color: ${colors.gray1};
    @media (max-width: ${viewport.sm}) {
      font-size: 1.2rem;
    }
  `
}
