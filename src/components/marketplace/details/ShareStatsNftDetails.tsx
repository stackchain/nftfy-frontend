import { Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import iconInfo from '../../../assets/icons/info.svg'
import iconPizza from '../../../assets/icons/pizza.svg'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface ShareStatsNftDetailsProps {
  exitPriceETH: string
  exitPrice: string
  shareExitPriceETH: string
  shareExitPrice: string
  totalSupply: string
  volume24h: string
  change24h: number
  change7d: number
  change30d: number
}

export const ShareStatsNftDetails: React.FC<ShareStatsNftDetailsProps> = ({
  exitPriceETH,
  exitPrice,
  shareExitPriceETH,
  shareExitPrice,
  totalSupply,
  volume24h,
  change24h,
  change7d,
  change30d
}: ShareStatsNftDetailsProps) => {
  return (
    <S.Content>
      <S.Title>Share Stats</S.Title>
      <S.Box>
        <S.Li>
          <S.Label>
            Exit Price
            <Tooltip placement='top' title='info'>
              <img src={iconInfo} alt='info' />
            </Tooltip>
          </S.Label>
          <div>
            <S.Price>
              {exitPriceETH}
              ETH
            </S.Price>
            <small>{exitPrice}</small>
          </div>
        </S.Li>
        <S.Li>
          <S.Label>
            Share Exit Price
            <Tooltip placement='top' title='info'>
              <img src={iconInfo} alt='info' />
            </Tooltip>
          </S.Label>
          <div>
            <S.Price>
              {shareExitPriceETH}
              ETH
            </S.Price>
            <small>{shareExitPrice}</small>
          </div>
        </S.Li>
        <S.Li>
          <S.Label>Total Supply</S.Label>
          <S.Price>
            {totalSupply}
            YCS
          </S.Price>
        </S.Li>
        <S.Li>
          <S.Label>Volume 24H</S.Label>
          <S.Price>
            {volume24h}
            YCS
          </S.Price>
        </S.Li>
        <div>
          <S.Li>
            <S.Label>Change</S.Label>
          </S.Li>
          <S.Li>
            <S.Label>24H</S.Label>
            <S.Price className={Math.sign(change24h) === 1 ? 'positive' : 'negative'}>{`${change30d}%`}</S.Price>
          </S.Li>
          <S.Li>
            <S.Label>7D</S.Label>
            <S.Price className={Math.sign(change7d) === 1 ? 'positive' : 'negative'}>{`${change7d}%`}</S.Price>
          </S.Li>
          <S.Li>
            <S.Label>30D</S.Label>
            <S.Price className={Math.sign(change30d) === 1 ? 'positive' : 'negative'}>{`${change30d}%`}</S.Price>
          </S.Li>
        </div>
        <S.Liquid>
          <img src={iconPizza} alt='pizza' />
          <span>Liquidity Pools</span>
        </S.Liquid>
      </S.Box>
    </S.Content>
  )
}

const S = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `,
  Title: styled.span`
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: ${colors.gray2};
    margin-bottom: 32px;
  `,
  Box: styled.div`
    background: ${colors.white};
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    width: 100%;
    max-width: 1296px;
    height: 96px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: row;
      li:nth-child(1) {
        display: none;
      }
      li:nth-child(3) {
        margin-left: 30px;
        margin-right: 30px;
      }
    }

    @media (max-width: ${viewport.lg}) {
      flex-direction: column;
      height: auto;
      border: none;
      box-shadow: none;

      div {
        justify-content: space-between;
        margin-bottom: 16px;
        margin-top: 16px;
        li:nth-child(1) {
          display: flex;
        }
        li:nth-child(3) {
          margin: 0px;
        }
        li {
          display: flex;
          flex-direction: column;
        }
      }
    }
  `,
  Li: styled.li`
    list-style: none;
    display: flex;
    flex-direction: column;

    .positive {
      color: ${colors.green1};
    }
    .negative {
      color: ${colors.red};
    }

    small {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray1};
    }

    div {
      display: flex;
      flex-direction: column;
    }
    @media (max-width: ${viewport.lg}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      max-height: 40px;
      small {
        display: flex;
        justify-content: flex-end;
      }
    }
  `,
  Label: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    color: ${colors.gray1};
    img {
      margin-left: 5px;
      cursor: pointer;
    }

    @media (max-width: ${viewport.xl}) {
      font-size: 11px;
    }
  `,
  Price: styled.span`
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray2};
    margin-top: 8px;

    @media (max-width: ${viewport.xl}) {
      font-size: 13px;
    }
  `,
  Liquid: styled.li`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 5px;
    }
    span {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: ${colors.gray2};
      cursor: pointer;
    }
    &:hover {
      span {
        color: ${colors.gray6};
      }
    }

    @media (max-width: ${viewport.xl}) {
      span {
        font-size: 13px;
      }
    }
  `
}
