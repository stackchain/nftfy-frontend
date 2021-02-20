import { Tooltip } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import clip from '../../../assets/icons/clip.svg'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface NftBuyShareDetailsProps {
  name: string
  addressERC20: string
  price: number
  price2: number
}

export const NftBuyShareDetails: React.FC<NftBuyShareDetailsProps> = ({ name, addressERC20 }: NftBuyShareDetailsProps) => {
  return (
    <S.Content>
      <S.Title>{name}</S.Title>

      <S.AddressToken>
        <S.CopyToClipboard text={addressERC20}>
          <Tooltip placement='right' title='Copy ERC20 Shares Address'>
            <h3 className='link-copy'>
              {addressERC20}
              <img src={clip} alt='clip' />
            </h3>
          </Tooltip>
        </S.CopyToClipboard>
      </S.AddressToken>
      <S.SharePrice>
        {/* <S.Label>
          Share Price
          <Tooltip placement='right' title='Quote of the last price'>
            <img src={iconInfo} alt='info' />
          </Tooltip>
        </S.Label> */}
        <S.PriceAction>
          <div>
            <span>
              0.000051
              <small>ETH</small>
            </span>
            <span>
              <small>$</small>
              0.04
            </span>
          </div>
          <S.ButtonBuy>Buy Shares</S.ButtonBuy>
        </S.PriceAction>
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
    margin-bottom: 4px;

    color: ${colors.gray2};
  `,

  AddressToken: styled.div`
    font-family: ${fonts.montserrat};
    display: flex;
    h3 {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 26px;
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
    cursor: default;
    img {
      margin-left: 6px;
      height: 14px;
      width: 14px;
      cursor: default;
    }
  `,
  PriceAction: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: ${fonts.montserrat};
    align-items: flex-start;

    span {
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      line-height: 42px;
      color: ${colors.gray2};
      small {
        color: ${colors.gray1};
        font-size: 14px;
        font-weight: 500;
        margin-left: 4px;
        line-height: 22px;
      }

      &:last-child small {
        margin-right: 4px;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      span:nth-child(2) {
        font-size: 14px;
        line-height: 22px;
        color: ${colors.gray1};
        small {
          margin-left: 4px;
        }
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
  CopyToClipboard: styled(CopyToClipboard)`
    font-size: 14px;
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 500;
    color: ${colors.gray1};
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      margin-left: 8px;
      width: 12px;
      height: 12px;
    }
  `
}
