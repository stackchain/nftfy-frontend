/* eslint-disable react/prop-types */
import { LoadingOutlined } from '@ant-design/icons'
import { Skeleton, Spin } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notFound from '../../assets/notfound.svg'
import { colors, fonts, viewport } from '../../styles/variables'

export interface NftCardProps {
  image: string
  name: string
  price?: number
  url?: string
  loading?: boolean
  className?: string
}

export const NftCard: React.FC<NftCardProps> = ({ image, name, price, loading, url, className }) => {
  const Spinner = <LoadingOutlined spin />
  return (
    <S.Card className={className} to={`${url || '#'}`}>
      <S.BoxImg className={image === '' ? 'bg-fail' : ''}>
        <S.Img src={image || notFound} alt={name || 'not found'} hidden={!!loading} />
        <Spin indicator={Spinner} spinning={!!loading} />
      </S.BoxImg>
      <S.BoxInfo>
        <S.Texts>
          <Skeleton loading={!!loading} active paragraph={{ rows: 0 }}>
            <span>Name</span>
          </Skeleton>
          <S.SkeletonRight className={!price ? 'hidden-collection' : ''} loading={!!loading} active paragraph={{ rows: 0 }}>
            <span className={!price ? 'hidden-collection' : ''}>Share Price</span>
          </S.SkeletonRight>
        </S.Texts>
        <S.Content>
          <Skeleton loading={!!loading} active paragraph={{ rows: 0 }}>
            <span>{`${name}`}</span>
          </Skeleton>
          <S.SkeletonRight loading={!!loading} active paragraph={{ rows: 0 }}>
            <span className={!price ? 'hidden-collection' : ''}>{`${price} usd`}</span>
          </S.SkeletonRight>
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

    .bg-fail {
      background: ${colors.white2};
    }
    &:hover {
      cursor: pointer;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.1);
    }
  `,
  BoxImg: styled.div`
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${viewport.xxl}) {
      height: 220px;
    }

    @media (max-width: ${viewport.lg}) {
      height: 320px;
    }
  `,
  Img: styled.img`
    width: auto;
    height: auto;
    padding: 16px;
    max-height: 100%;
    max-width: 100%;
    -webkit-user-drag: none;
  `,
  BoxInfo: styled.div`
    border-top: 1px solid ${colors.gray3};
    height: 80px;
    display: flex;
    flex-direction: column;
    padding: 16px;

    .ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-title {
      margin: 0px !important;
      width: 90% !important;
    }
    .ant-skeleton {
      height: 30px;
      display: flex;
      align-items: center;
    }
    .skeleton-right {
      display: flex;
      justify-content: flex-end;
      .ant-skeleton-content {
        width: 60%;
      }
    }
  `,
  SkeletonRight: styled(Skeleton)`
    display: flex;
    justify-content: flex-end;
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
    margin-top: 5px;

    span {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 24px;
      color: ${colors.gray2};
      strong {
        text-transform: uppercase;
      }
    }
    .hidden-collection {
      display: none;
    }
  `
}
