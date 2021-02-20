import { Button, Tooltip } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import clip from '../../../assets/icons/clip.svg'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface NftBuyShareDetailsProps {
  name: string
  symbol: string
  addressERC20: string
  price: number
  price2: number
}

export const NftBuyShareDetails: React.FC<NftBuyShareDetailsProps> = ({ name, symbol, addressERC20 }: NftBuyShareDetailsProps) => {
  return (
    <S.Content>
      <S.Title>
        {name}
        <small>{symbol}</small>
      </S.Title>
      <S.AddressToken>
        <S.CopyToClipboard text={addressERC20}>
          <Tooltip placement='right' title='Copy ERC20 Shares Address'>
            <h6>{addressERC20}</h6>
            <img src={clip} alt='clip' />
          </Tooltip>
        </S.CopyToClipboard>
      </S.AddressToken>
      <S.SharePrice>
        <S.PriceAction>
          <div>
            <S.MainPrice>
              0.000051
              <small>ETH</small>
            </S.MainPrice>
            <S.DollarPrice>
              <small>$</small>
              0.04
            </S.DollarPrice>
          </div>
          <S.TradeSharesButton>Buy Shares</S.TradeSharesButton>
        </S.PriceAction>
      </S.SharePrice>
    </S.Content>
  )
}
const S = {
  Content: styled.div`
    flex: 1;
    max-width: 575px;
    @media (max-width: ${viewport.lg}) {
      max-width: none;
    }
  `,
  Title: styled.span`
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 4px;

    color: ${colors.gray2};

    small {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: ${colors.gray1};
      margin-left: 8px;
      font-weight: 600;
    }
  `,

  AddressToken: styled.div`
    font-family: ${fonts.montserrat};
    display: flex;
    h6 {
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
    margin-top: 32px;
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

    @media (max-width: ${viewport.sm}) {
      flex-direction: column;
    }
  `,
  MainPrice: styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 42px;
    height: 42px;
    color: ${colors.gray2};
    font-family: ${fonts.montserrat};

    small {
      font-size: 14px;
      margin-left: 4px;
    }

    &:last-child small {
      margin-right: 4px;
    }
  `,
  DollarPrice: styled.div`
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.gray1};
    margin-bottom: 16px;
    small {
      margin-left: 4px;
    }
  `,
  TradeSharesButton: styled(Button)`
    height: 40px;
    padding: 0 64px;
    border-radius: 8px;
    font-family: ${fonts.montserrat};
    font-weight: 500;
    color: ${colors.white};
    background-color: ${colors.blue1};

    &:hover,
    &:focus {
      color: ${colors.white};
      background-color: ${colors.blue2};
      border: 1px solid ${colors.blue2};
    }

    @media (max-width: ${viewport.sm}) {
      width: 100%;
      margin-bottom: 32px;
    }
  `,
  CopyToClipboard: styled(CopyToClipboard)`
    font-size: 12px;
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 500;
    color: ${colors.gray3};
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      margin-left: 8px;
      width: 12px;
      height: 12px;
    }

    &:hover {
      opacity: 0.8;
    }

    @media (max-width: ${viewport.sm}) {
      h6 {
        width: 80vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `
}
