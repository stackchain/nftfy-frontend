import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BuyModal from '../components/marketplace/BuyModal'
import { NftBuyShareDetails } from '../components/marketplace/details/NftBuyShareDetails'
import { TitleNftDetails } from '../components/marketplace/details/TitleNFtDetails'
import { NftImage } from '../components/shared/cards/NftImage'
import { NftInfoDetails } from '../components/shared/cards/NftInfoDetails'
import { Footer, Header } from '../components/shared/layout'
import { buyModalVar } from '../graphql/variables/MarketplaceVariable'
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

  const buyNftModal = () => {
    buyModalVar({
      type: 'nft',
      item: erc20
    })
  }

  return (
    <>
      <Header page='marketplaceDetails' />
      <S.Main>
        <S.Content>
          <S.Info>
            <S.BoxImage>
              <NftImage name={erc20.erc721.name} image={erc20.erc721.image_url} />
            </S.BoxImage>
            <S.Details>
              <S.TitleArea>
                <S.TitleBox>
                  <TitleNftDetails name={erc20.erc721.name} symbol={erc20.erc721.symbol} />
                </S.TitleBox>
                <S.BtnDesktop>
                  <S.BuyNft onClick={buyNftModal}>Buy NFT</S.BuyNft>
                </S.BtnDesktop>
              </S.TitleArea>
              <NftInfoDetails
                contractName={erc20.erc721.name}
                contractAddress={erc20.erc721.address}
                tokenId={erc20.erc721.tokenId}
                details={erc20.erc721.description}
              />
              <S.BtnMobile>
                <S.BuyNft onClick={buyNftModal}>Buy NFT</S.BuyNft>
              </S.BtnMobile>
              <S.Division />
              <NftBuyShareDetails erc20={erc20} price={0.000051} price2={0.04} />
            </S.Details>
          </S.Info>
        </S.Content>
      </S.Main>
      <Footer />
      <BuyModal />
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

    @media (max-width: ${viewport.sm}) {
      padding: 16px;
      margin-top: 16px;
    }
  `,
  Info: styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 32px;

    @media (max-width: ${viewport.lg}) {
      flex-direction: column;
    }

    @media (max-width: ${viewport.sm}) {
      margin-bottom: 0px;
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

    @media (max-width: ${viewport.sm}) {
      margin-bottom: 32px;
    }
  `,
  Division: styled.div`
    width: 100%;
    height: 2px;
    background: ${colors.gray3};
    margin: 36px 0;
    max-width: 575px;
    @media (max-width: ${viewport.lg}) {
      max-width: 100%;
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
      max-width: 100%;
    }
  `,
  MobileTitle: styled.div`
    display: none;
  `,
  BtnMobile: styled.div`
    display: none;

    @media (max-width: ${viewport.sm}) {
      display: flex;
      justify-content: center;
      margin-top: 32px;
    }
  `,
  BtnDesktop: styled.div`
    @media (max-width: ${viewport.sm}) {
      display: none;
    }
  `,

  TitleArea: styled.div`
    display: flex;
    flex-direction: row;
    max-width: 575px;

    max-width: 100%;

    @media (max-width: ${viewport.lg}) {
      max-width: 100%;
    }
  `,
  BuyNft: styled(Button)`
    height: 40px;
    padding: 0 32px;
    border-radius: 8px;
    font-family: ${fonts.montserrat};
    font-weight: 500;
    color: ${colors.gray2};

    @media (max-width: ${viewport.sm}) {
      width: 100%;
    }
  `
}
