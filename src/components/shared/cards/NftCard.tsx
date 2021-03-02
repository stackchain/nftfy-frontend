/* eslint-disable react/prop-types */
import { Skeleton, Spin } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notFound from '../../../assets/notfound.svg'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface NftCardProps {
  image?: string
  name?: string
  price?: number
  url?: string
  loading?: boolean
  className?: string
}

export const NftCard: React.FC<NftCardProps> = ({ image, name, price, loading, url, className }) => {
  return (
    <S.Card className={className} to={`${url || '#'}`}>
      <S.BoxImage className={image === '' ? 'bg-fail' : ''}>
        <S.Img src={image || notFound} alt={name || 'not found'} hidden={!!loading} />
        <Spin indicator={<Skeleton.Avatar active size={64} shape='circle' />} spinning={!!loading} />
      </S.BoxImage>
      <S.BoxInfo>
        <S.Content>
          <Skeleton loading={!!loading} active paragraph={{ rows: 0 }}>
            <S.Name>{`${name}`}</S.Name>
          </Skeleton>
        </S.Content>
        <S.Content>
          <Skeleton loading={!!loading} active paragraph={{ rows: 0 }}>
            <S.Price>{`${price} usd`}</S.Price>
          </Skeleton>
        </S.Content>
      </S.BoxInfo>
    </S.Card>
  )
}

const S = {
  Card: styled(Link)`
    width: 100%;
    height: auto;
    max-width: 576px;

    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.05);
    background: ${colors.white};

    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
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
