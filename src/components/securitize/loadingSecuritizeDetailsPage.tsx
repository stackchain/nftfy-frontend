import { Skeleton } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { colors, fonts, viewport } from '../../styles/variables'

export const LoadingSecuritizeDetailsPage: React.FC = () => {
  return (
    <S.Collection>
      <S.Main>
        <S.Content>
          <S.Info>
            <S.MobileTitle>
              <S.TitleNft>
                <S.SkeletonTitle paragraph={{ rows: 1 }} />
              </S.TitleNft>
            </S.MobileTitle>
            <S.Image>
              <S.SkeletonAvatar active shape='circle' />
            </S.Image>
            <S.Details>
              <S.DesktopTitle>
                <S.TitleNft>
                  <S.SkeletonTitle active paragraph={{ rows: 1 }} />
                </S.TitleNft>
              </S.DesktopTitle>
              <S.SkeletonText active paragraph={{ rows: 4 }} />
              <S.ContentSecuritize>
                <div className='cardTitle'>
                  <Skeleton active paragraph={{ rows: 0 }} />
                </div>
                <div className='contentForm'>
                  <S.SkeletonInput active />
                  <S.SkeletonInput active />
                  <Skeleton.Button active size='large' />
                </div>
              </S.ContentSecuritize>
            </S.Details>
          </S.Info>
        </S.Content>
      </S.Main>
    </S.Collection>
  )
}

const S = {
  Collection: styled.div``,
  Main: styled.div`
    flex: 1;
    padding: 32px 48px;
    min-height: calc(100vh - 136px);
    padding-top: 80px;
    background: ${colors.white};
    display: flex;
    @media (max-width: ${viewport.md}) {
      margin-top: 20px;
      padding: 32px 10px;
    }
  `,
  Content: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: ${viewport.xxl};
  `,
  Info: styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 32px;

    @media (max-width: ${viewport.md}) {
      flex-direction: column;
    }
  `,
  Image: styled.div`
    width: 100%;
    max-width: 624px;
    height: 552px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: ${viewport.md}) {
      margin-bottom: 16px;
      height: auto;
      min-height: 300px;
    }
  `,
  MobileTitle: styled.div`
    display: none;
    @media (max-width: ${viewport.md}) {
      display: flex;
    }
  `,
  DesktopTitle: styled.div`
    @media (max-width: ${viewport.md}) {
      display: none;
    }
  `,
  Details: styled.div`
    width: 50%;
    margin: 0 auto;

    @media (min-width: ${viewport.md}) {
      padding-left: 10px;
    }

    @media (max-width: ${viewport.md}) {
      width: 100%;
    }
  `,
  TitleNft: styled.div`
    max-width: 575px;
    font-family: ${fonts.montserrat};
    .ant-btn-link {
      padding-left: 5px;
    }

    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 38px;
      line-height: 40px;
      margin-bottom: 4px;
      color: ${colors.gray2};

      small {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: ${colors.gray1};
        margin-left: 8px;
        font-weight: 600;
      }
    }

    @media (max-width: ${viewport.sm}) {
      h1 {
        line-height: 38px;
      }
    }
  `,
  SkeletonAvatar: styled(Skeleton.Avatar)`
    width: 100%;
    display: flex;
    justify-content: center;
    .ant-skeleton-avatar {
      width: 100px;
      height: 100px;
    }
  `,
  SkeletonTitle: styled(Skeleton)`
    .ant-skeleton-content {
      .ant-skeleton-title {
        width: 60% !important;
      }
      .ant-skeleton-paragraph {
        li {
          width: 100% !important;
        }
      }
    }
  `,
  SkeletonText: styled(Skeleton)`
    margin-top: 20px;
    .ant-skeleton-content {
      .ant-skeleton-title {
        display: none;
      }
      .ant-skeleton-paragraph {
        li {
          width: 100% !important;
        }
      }
    }
  `,
  ContentSecuritize: styled.div`
    margin-top: 20px;
    width: 100%;
    height: 304px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
    border-radius: 8px;
    .cardTitle {
      border-bottom: 1px solid #e8e8e8;
      padding-left: 20px;
    }
    .contentForm {
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `,
  SkeletonInput: styled(Skeleton.Input)`
    width: 100%;
    margin-bottom: 15px;
  `
}

// import { Skeleton, Spin } from 'antd'
// import React from 'react'
// import styled from 'styled-components'

// export const LoadingCollectionDetails: React.FC = () => {
//   return (
//     <S.Content>
//       <S.ContentImg>
//         <Spin indicator={<S.SkeletonAvatar active shape='square' />} spinning />
//       </S.ContentImg>
//       <S.ContentList>
//         <S.SkeletonInput active size='small' />
//         <S.SkeletonInput active size='small' />
//         <S.SkeletonInputSecuritize active size='small' />
//       </S.ContentList>
//     </S.Content>
//   )
// }
// export const S = {
//   Content: styled.div`
//     padding: 32px 48px;
//     width: 100%;
//     height: 600px;
//     display: flex;
//     flex-direction: row;
//     margin-top: 50px;
//   `,
//   SkeletonAvatar: styled(Skeleton.Avatar)`
//     width: 550px;
//     .ant-skeleton-avatar {
//       width: 500px;
//       height: 550px;
//     }
//   `,
//   SkeletonInput: styled(Skeleton.Input)`
//     width: 600px;
//     margin-bottom: 40px;
//     .ant-skeleton-input {
//       height: 30px;
//     }
//   `,
//   SkeletonInputSecuritize: styled(Skeleton.Input)`
//     width: 600px;
//     .ant-skeleton-input {
//       height: 250px;
//     }
//   `,
//   ContentImg: styled.div``,
//   ContentList: styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding-left: 50px;
//   `
// }
