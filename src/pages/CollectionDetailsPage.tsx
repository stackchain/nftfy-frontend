import React from 'react'
import styled from 'styled-components'
import imageNft from '../assets/nftImage/catFrost.png'
import { NftImage } from '../components/marketplace/details/NftImage'
import { NftInfoDetails } from '../components/marketplace/details/NftInfoDetails'
import { TitleNftDetails } from '../components/marketplace/details/TitleNFtDetails'
import { SecuritizeERC721 } from '../components/securitize/SecuritizeERC721'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'

export default function CollectionDetailsPage() {
  return (
    <S.Collection>
      <Header />
      <S.Main>
        <S.Content>
          <S.Info>
            <S.MobileTitle>
              <TitleNftDetails name='Name test' created='moon cat 88' />
            </S.MobileTitle>
            <S.Image>
              <NftImage name='cat frost' image={imageNft} />
            </S.Image>
            <S.Details>
              <S.DesktopTitle>
                <TitleNftDetails name='Name Test' created='moon cat 88' />
              </S.DesktopTitle>
              <NftInfoDetails contractName='CryptoKitties' contractAddress='0xfbee74b7d' tokenId='1992671' details='details text' />
              <SecuritizeERC721 />
            </S.Details>
          </S.Info>
        </S.Content>
      </S.Main>
      <Footer />
    </S.Collection>
  )
}

const S = {
  Collection: styled.div``,
  Main: styled.div`
    width: 100%;
    height: 100%;
    margin-top: 80px;
    background: ${colors.white};
    display: flex;
    @media (max-width: ${viewport.md}) {
      margin-top: 20px;
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
    @media (max-width: ${viewport.md}) {
      margin-bottom: 16px;
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
  `
}
