import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { NftBuyShareDetails } from '../components/marketplace/details/NftBuyShareDetails'
import { NftImage } from '../components/marketplace/details/NftImage'
import { NftInfoDetails } from '../components/marketplace/details/NftInfoDetails'
import { ShareStatsNftDetails } from '../components/marketplace/details/ShareStatsNftDetails'
import { TitleNftDetails } from '../components/marketplace/details/TitleNFtDetails'
import { BuyNftButton } from '../components/shared/buttons/BuyNftButton'
import { Footer, Header } from '../components/shared/layout'
import { getMarketplaceItemByAddress } from '../services/MarketplaceService'
import { colors, viewport } from '../styles/variables'
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
            <S.MobileTitle>
              <TitleNftDetails name={erc20.name} />
            </S.MobileTitle>
            <S.Image>
              <NftImage name='cat frost' image={erc20.erc721.image_url} />
            </S.Image>
            <S.Details>
              <S.DesktopTitle>
                <TitleNftDetails name={erc20.name} created='moon cat 88' />
              </S.DesktopTitle>
              <NftInfoDetails
                contractName={erc20.erc721.name}
                contractAddress={erc20.erc721.address}
                tokenId={erc20.erc721.tokenId}
                details={erc20.erc721.description}
              />
              <S.BtnMobile>
                <BuyNftButton url='http://exemplo.com' />
              </S.BtnMobile>
              <S.Division />
              <NftBuyShareDetails
                title={erc20.name}
                addressERC20={erc20.address}
                price={0.000051}
                price2={0.04}
                profitExitPricePercentage='150'
                profitExitPrice='0.00010000'
              />
            </S.Details>
          </S.Info>
          <S.Stats>
            <ShareStatsNftDetails
              exitPriceETH='10.000000'
              exitPrice='4.600,00'
              shareExitPriceETH='0.00010000'
              shareExitPrice='0.12'
              totalSupply='1,000,000'
              volume24h='7,500'
              change24h={2.5}
              change7d={-1.5}
              change30d={3.2}
            />
          </S.Stats>
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
  Division: styled.div`
    width: 100%;
    height: 2px;
    background: ${colors.gray3};
    margin: 24px 0;
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
  Stats: styled.div`
    margin-bottom: 247px;
  `,
  DesktopTitle: styled.div`
    @media (max-width: ${viewport.md}) {
      display: none;
    }
  `,
  MobileTitle: styled.div`
    display: none;
    @media (max-width: ${viewport.md}) {
      display: flex;
    }
  `,
  BtnMobile: styled.div`
    display: none;
    justify-content: center;
    @media (max-width: ${viewport.lg}) {
      display: flex;
    }
  `
}
