import { Skeleton, Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

export const LoadingSkeleton: React.FC = () => {
  return (
    <>
      <S.DivImage>
        <Spin indicator={<Skeleton.Avatar active size={48} shape='square' />} spinning />
        <Skeleton active paragraph={{ rows: 0 }} />
      </S.DivImage>
      <S.DivErc20>
        <Skeleton active paragraph={{ rows: 0 }} />
      </S.DivErc20>
      <S.DivErc20>
        <Skeleton active paragraph={{ rows: 0 }} />
      </S.DivErc20>
      <S.DivErc20>
        <Skeleton active paragraph={{ rows: 0 }} />
      </S.DivErc20>
      <S.DivErc20>
        <Skeleton active paragraph={{ rows: 0 }} />
      </S.DivErc20>
      <S.DivErc20>
        <Skeleton active paragraph={{ rows: 0 }} />
      </S.DivErc20>
      <S.DivErc20>
        <Skeleton active paragraph={{ rows: 0 }} />
      </S.DivErc20>
    </>
  )
}
export const S = {
  DivImage: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    .ant-skeleton-element .ant-skeleton-avatar {
      vertical-align: baseline;
    }
    h3.ant-skeleton-title {
      margin-left: 16px;
    }
    span.ant-skeleton-avatar.ant-skeleton-avatar-square.ant-spin-dot {
      border-radius: 8px;
    }
  `,
  DivErc20: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `
}
