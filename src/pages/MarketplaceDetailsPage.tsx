import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { NftBuyShareDetails } from '../components/marketplace/details/NftBuyShareDetails'
import { NftImage } from '../components/marketplace/details/NftImage'
import { NftInfoDetails } from '../components/marketplace/details/NftInfoDetails'
import { TitleNftDetails } from '../components/marketplace/details/TitleNFtDetails'
import { Footer, Header } from '../components/shared/layout'
import { getMarketplaceItemByAddress } from '../services/MarketplaceService'
import { colors, fonts, viewport } from '../styles/variables'
import { MarketplaceERC20Item } from '../types/MarketplaceTypes'

export default function MarketplaceDetailsPage() {
  const [erc20, setErc20] = useState<MarketplaceERC20Item | undefined>(undefined)
  const { address } = useParams<{ address: string | undefined }>()
  useEffect(() => {
    const getNfts = async () => {
      if (address) {
        const nft = await getMarketplaceItemByAddress(address)
        setErc20(nft)
      }
    }
    getNfts()
  }, [address])

  // TODO: Implement Empty
  if (!erc20) return <></>

  return (
    <>
      <Header />
      <S.Main>
        <S.Content>
          <S.Info>
            <S.BoxImage>
              <NftImage name={erc20.erc721.name} image={erc20.erc721.image_url} />
            </S.BoxImage>
            <S.Details>
              <S.TitleArea>
                <S.TitleBox>
                  <TitleNftDetails name={erc20.erc721.name} />
                </S.TitleBox>
                <S.BuyNft>Buy NFT</S.BuyNft>
              </S.TitleArea>
              <NftInfoDetails
                contractName={erc20.erc721.name}
                contractAddress={erc20.erc721.address}
                tokenId={erc20.erc721.tokenId}
                details={erc20.erc721.description}
              />
              <S.BtnMobile>
                <S.BuyNft>Buy NFT</S.BuyNft>
              </S.BtnMobile>
              <S.Division />
              <NftBuyShareDetails name={erc20.name} addressERC20={erc20.address} price={0.000051} price2={0.04} />
            </S.Details>
          </S.Info>
        </S.Content>
      </S.Main>
      <Footer />
    </>
  )
}

const S = {
  Main: styled.div`
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 136px);
    background: ${colors.white};
    display: flex;
    justify-content: center;
  `,
  Content: styled.div`
    flex-direction: column;
    padding: 32px 48px;
    margin-top: 64px;
    height: 100%;
    flex: 1;
    max-width: ${viewport.xxl};

    @media (max-width: ${viewport.lg}) {
      margin-top: 32px;
    }
  `,
  Info: styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 32px;

    @media (max-width: ${viewport.lg}) {
      flex-direction: column;
    }
  `,
  Image: styled.div``,
  BoxImage: styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 48px;
    margin-bottom: 64px;

    @media (max-width: ${viewport.lg}) {
      justify-content: center;
      margin-right: 0;

      img {
        max-width: 400px;
        max-height: 400px;
      }
    }
  `,
  Division: styled.div`
    width: 100%;
    height: 2px;
    background: ${colors.gray3};
    margin: 36px 0;
    max-width: 575px;
    @media (max-width: ${viewport.lg}) {
      max-width: none;
    }
  `,
  Details: styled.div`
    flex: 1;
  `,
  Stats: styled.div`
    margin-bottom: 247px;
  `,
  TitleBox: styled.div`
    flex: 1;
    max-width: 450px;

    @media (max-width: ${viewport.lg}) {
      max-width: none;
    }
  `,
  MobileTitle: styled.div`
    display: none;
  `,
  BtnMobile: styled.div`
    display: none;
    justify-content: center;
  `,

  TitleArea: styled.div`
    display: flex;
    flex-direction: row;
    max-width: 575px;
    min-height: 50px;
    max-width: none;

    @media (max-width: ${viewport.lg}) {
      max-width: none;
    }
  `,
  BuyNft: styled(Button)`
    height: 40px;
    padding: 0 32px;
    border-radius: 8px;
    font-family: ${fonts.montserrat};
    font-weight: 500;
    color: ${colors.gray2};
  `
}
