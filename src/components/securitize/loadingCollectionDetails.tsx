import { Skeleton, Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'

export const LoadingCollectionDetails: React.FC = () => {
  return (
    <S.Content>
      <S.ContentImg>
        <Spin indicator={<S.SkeletonAvatar active shape='square' />} spinning />
      </S.ContentImg>
      <S.ContentList>
        <S.SkeletonInput active size='small' />
        <S.SkeletonInput active size='small' />
        <S.SkeletonInputSecuritize active size='small' />
      </S.ContentList>
    </S.Content>
  )
}
export const S = {
  Content: styled.div`
    padding: 32px 48px;
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  `,
  SkeletonAvatar: styled(Skeleton.Avatar)`
    width: 550px;
    .ant-skeleton-avatar {
      width: 500px;
      height: 550px;
    }
  `,
  SkeletonInput: styled(Skeleton.Input)`
    width: 600px;
    margin-bottom: 40px;
    .ant-skeleton-input {
      height: 30px;
    }
  `,
  SkeletonInputSecuritize: styled(Skeleton.Input)`
    width: 600px;
    .ant-skeleton-input {
      height: 250px;
    }
  `,
  ContentImg: styled.div``,
  ContentList: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 50px;
  `
}
