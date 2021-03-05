import { useReactiveVar } from '@apollo/client'
import { Button, Skeleton, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import clip from '../../../assets/icons/clip.svg'
import { buyModalVar, poolsLoadingVar } from '../../../graphql/variables/MarketplaceVariable'
import { hasLiquidityForErc20Shares } from '../../../services/BalancerService'
import { colors, fonts, viewport } from '../../../styles/variables'
import { MarketplaceERC20Item } from '../../../types/MarketplaceTypes'

export interface SharesDetailsProps {
  erc20: MarketplaceERC20Item
}

export const SharesDetails: React.FC<SharesDetailsProps> = ({ erc20 }: SharesDetailsProps) => {
  const { name, symbol, address } = erc20

  const poolsLoading = useReactiveVar(poolsLoadingVar)
  const [liquidityChecked, setLiquidityChecked] = useState(false)
  const [hasLiquidity, setHasLiquidity] = useState(true)
  const [priceDollar, setPriceDollar] = useState('')
  const [priceWeth, setPriceWeth] = useState('')

  useEffect(() => {
    const checkLiquidity = async () => {
      const liquidity = await hasLiquidityForErc20Shares(erc20.address)
      setLiquidityChecked(true)
      setHasLiquidity(liquidity.hasLiquidity)
      setPriceDollar(liquidity.priceDollar)
      setPriceWeth(liquidity.priceWeth)
    }

    checkLiquidity()
  }, [erc20.address])

  const buySharesModal = () => {
    buyModalVar({
      type: 'shares',
      item: erc20
    })
  }

  return (
    <S.Content>
      <S.Title>
        {name}
        <small>{symbol}</small>
      </S.Title>
      <S.AddressToken>
        <S.CopyToClipboard text={address}>
          <Tooltip placement='right' title='Copy ERC20 Shares Address'>
            <h6>{address}</h6>
            <img src={clip} alt='clip' />
          </Tooltip>
        </S.CopyToClipboard>
      </S.AddressToken>
      <Skeleton loading={poolsLoading || !liquidityChecked} paragraph={{ rows: 0 }}>
        {hasLiquidity ? (
          <S.SharePrice>
            <S.PriceAction>
              <div>
                <S.MainPrice>
                  {priceWeth}
                  <small>ETH</small>
                </S.MainPrice>
                <S.DollarPrice>
                  <small>$</small>
                  {priceDollar}
                </S.DollarPrice>
              </div>
              <S.TradeSharesButton onClick={buySharesModal}>Buy Shares</S.TradeSharesButton>
            </S.PriceAction>
          </S.SharePrice>
        ) : (
          <div>
            <b>Without Liquidity, please add liquidity in balancer</b>
          </div>
        )}
      </Skeleton>
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
