import React from 'react'
import styled from 'styled-components'
import catFrost from '../assets/nftImage/catFrost.png'
import { NftBuyShareDetails } from '../components/marketplace/details/NftBuyShareDetails'
import { NftImage } from '../components/marketplace/details/NftImage'
import { NftInfoDetails } from '../components/marketplace/details/NftInfoDetails'
import { ShareStatsNftDetails } from '../components/marketplace/details/ShareStatsNftDetails'
import { TitleNftDetails } from '../components/marketplace/details/TitleNFtDetails'
import { BuyNftButton } from '../components/shared/buttons/BuyNftButton'
import { Footer, Header } from '../components/shared/layout'
import { colors, viewport } from '../styles/variables'

export default function MarketplaceDetailsPage() {
  return (
    <>
      <Header />
      <S.Main>
        <S.Content>
          <S.Info>
            <div className='mobileTitle'>
              <TitleNftDetails name='Cat Frost' created='moon cat 88' />
            </div>
            <S.Image>
              <NftImage name='cat frost' image={catFrost} />
            </S.Image>
            <S.Details>
              <div className='desktopTitle'>
                <TitleNftDetails name='Cat Frost' created='moon cat 88' />
              </div>
              <NftInfoDetails contractName='CryptoKitties' contractAddress='0xfbee...74b7d' tokenId={1122334} details='Descriptor of nft' />
              <div className='btnMobile'>
                <BuyNftButton url='http://exemplo.com' />
              </div>
              <S.Division />
              <NftBuyShareDetails
                title='Cat Frost Shares (CFS)'
                addressERC20='0x32bfaa23447c'
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

    .mobileTitle {
      display: none;
    }

    @media (max-width: ${viewport.md}) {
      flex-direction: column;
      .mobileTitle {
        display: flex;
      }
      .desktopTitle {
        display: none;
      }
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

    .btnMobile {
      display: none;
      justify-content: center;
    }

    @media (min-width: ${viewport.md}) {
      padding-left: 10px;
    }

    @media (max-width: ${viewport.lg}) {
      .btnMobile {
        display: flex;
      }
    }

    @media (max-width: ${viewport.md}) {
      width: 100%;
      .btnMobile {
        display: flex;
      }
    }
  `,
  Stats: styled.div`
    margin-bottom: 247px;
  `
}
