/* eslint-disable react/prop-types */
import { useReactiveVar } from '@apollo/client'
import { Skeleton, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notFound from '../../../assets/notfound.svg'
import { poolsLoadingVar } from '../../../graphql/variables/MarketplaceVariable'
import { hasLiquidityForErc20Shares } from '../../../services/BalancerService'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface NftCardProps {
  image?: string
  name?: string
  url?: string
  loading?: boolean
  className?: string
  securitize?: boolean
  tokenId?: string
  address?: string
}
export const NftCard: React.FC<NftCardProps> = ({ address, image, name, loading, url, className, securitize, tokenId }) => {
  const poolsLoading = useReactiveVar(poolsLoadingVar)
  const [liquidityChecked, setLiquidityChecked] = useState(false)
  const [hasLiquidity, setHasLiquidity] = useState(true)
  const [priceDollar, setPriceDollar] = useState('')
  // const [priceWeth, setPriceWeth] = useState('')

  console.log('Address que esta chegando', address)

  useEffect(() => {
    const checkLiquidity = async () => {
      if (address) {
        const liquidity = await hasLiquidityForErc20Shares(address)
        setLiquidityChecked(true)
        setHasLiquidity(liquidity.hasLiquidity)
        setPriceDollar(liquidity.priceDollar)
        // setPriceWeth(liquidity.priceWeth)
      }
    }

    checkLiquidity()
  }, [address])
  return (
    <S.Card className={className} to={`${url || '#'}`}>
      <S.BoxImage className={image === '' ? 'bg-fail' : ''}>
        <S.Img src={image || notFound} alt={name || 'not found'} hidden={!!loading} />
        <Spin indicator={<Skeleton.Avatar active size={64} shape='circle' />} spinning={!!loading} />
      </S.BoxImage>
      <S.BoxInfo>
        <S.Content>
          <Skeleton loading={!!loading} active paragraph={{ rows: 0 }}>
            <S.Name>
              {`${name}`}
              {securitize ? ` #${tokenId} Shares` : ''}
            </S.Name>
          </Skeleton>
        </S.Content>
        {!securitize && (
          <S.Content>
            <Skeleton loading={(!!loading && !securitize) || poolsLoading || !liquidityChecked} active paragraph={{ rows: 0 }}>
              {hasLiquidity && <S.Price>{`$${priceDollar}`}</S.Price>}
            </Skeleton>
          </S.Content>
        )}
      </S.BoxInfo>
    </S.Card>
  )
}

const S = {
  Card: styled(Link)`
    width: 100%;
    height: auto;
    max-height: 394px;
    max-width: 314px;

    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.05);
    background: ${colors.white};

    .hidden {
      display: none;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: ${viewport.sm}) {
      margin: 0 auto;
    }
  `,
  BoxImage: styled.div`
    width: 100%;
    min-height: 312px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${viewport.lg}) {
      height: auto;
      min-height: 350px;
    }
  `,
  Img: styled.img`
    width: auto;
    height: auto;
    padding: 16px;
    max-height: 100%;
    max-width: 100%;
    -webkit-user-drag: none;
    border-radius: 20px;
  `,
  BoxInfo: styled.div`
    border-top: 1px solid ${colors.gray3};
    height: 80px;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-title {
      width: 100% !important;
      margin-top: 16px;
    }
    .ant-skeleton {
      height: 26px;
      display: flex;
      align-items: center;
    }
  `,
  Texts: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 22px;
      color: ${colors.gray1};
    }
    .hidden-collection {
      display: none;
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 24px;

      strong {
        text-transform: uppercase;
      }
    }
    .hidden-collection {
      display: none;
    }
  `,
  Name: styled.span`
    color: ${colors.gray2};
  `,
  Price: styled.span`
    color: ${colors.gray1};
  `
}
