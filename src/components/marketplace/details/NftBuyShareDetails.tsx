import { Button, Tooltip } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import clip from '../../../assets/icons/clip.svg'
import iconInfo from '../../../assets/icons/info.svg'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface NftBuyShareDetailsProps {
  title: string
  addressERC20: string
  price: number
  price2: number
  profitExitPricePercentage: string
  profitExitPrice: string
}

export const NftBuyShareDetails: React.FC<NftBuyShareDetailsProps> = () => {
  return (
    <S.Content>
      <S.Title>Cat Frost Shares (CFS)</S.Title>
      <S.AddressToken>
        <span>erc20 address</span>
        <CopyToClipboard text='0x32bfaa23447c'>
          <Button type='text'>
            0x32bfaa23447c
            <img src={clip} alt='copy' />
          </Button>
        </CopyToClipboard>
      </S.AddressToken>
      <S.SharePrice>
        <S.Label>
          Share Price
          <Tooltip placement='top' title='info text'>
            <img src={iconInfo} alt='info' />
          </Tooltip>
        </S.Label>
        <S.PriceAction>
          <div>
            <span>
              0.000051
              <small>ETH</small>
            </span>
            <span>$0.04</span>
          </div>
          <S.ButtonBuy>Buy Shares</S.ButtonBuy>
        </S.PriceAction>
        <S.ContentExitPrice>
          <S.Label>
            Profit if Exit Price
            <Tooltip placement='top' title='info text'>
              <img src={iconInfo} alt='info' />
            </Tooltip>
          </S.Label>
          <span>
            <strong>150%</strong>
            <small>(0.00010000 ETH)</small>
          </span>
        </S.ContentExitPrice>
      </S.SharePrice>
    </S.Content>
  )
}
const S = {
  Content: styled.div`
    max-width: 575px;
  `,
  Title: styled.span`
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: ${colors.gray2};
  `,
  AddressToken: styled.div`
    font-family: ${fonts.montserrat};
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: ${colors.gray1};
    }
    button {
      span {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: ${colors.gray2};
      }
      img {
        margin-left: 5px;
      }
      &:hover {
        span {
          text-decoration: underline;
        }
      }
    }

    @media (max-width: ${viewport.sm}) {
    }
  `,
  SharePrice: styled.div`
    margin-top: 24px;
    @media (max-width: ${viewport.sm}) {
      display: flex;
      flex-direction: column;
      span {
        display: flex;
        justify-content: center;
      }
    }
  `,
  Label: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.gray1};
    img {
      margin-left: 5px;
      cursor: pointer;
    }
  `,
  PriceAction: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: ${fonts.montserrat};
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
      span:nth-child(2) {
        font-size: 14px;
        line-height: 22px;
        color: ${colors.gray1};
      }
    }
    span {
      font-style: normal;
      font-weight: 600;
      font-size: 38px;
      line-height: 46px;
      color: ${colors.gray2};
      small {
        color: ${colors.gray1};
        font-size: 14px;
        font-weight: 400;
      }
    }
    @media (max-width: ${viewport.sm}) {
      flex-direction: column;
      div {
        span:nth-child(2) {
          margin-bottom: 16px;
        }
      }
    }
  `,
  ButtonBuy: styled.button`
    font-family: ${fonts.montserrat};
    width: 285px;
    height: 40px;
    border-radius: 8px;
    background: ${colors.blue1};
    border: none;
    outline: none;
    cursor: pointer;
    color: ${colors.white};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    &:hover {
      background: ${colors.blue2};
    }
  `,
  ContentExitPrice: styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 42px;

    span {
      font-family: ${fonts.montserrat};
      strong {
        color: ${colors.green1};
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        margin-left: 32px;
      }
      small {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: ${colors.gray1};
        margin-left: 5px;
      }
    }

    @media (max-width: ${viewport.sm}) {
      small {
        display: none;
      }
    }
  `
}
