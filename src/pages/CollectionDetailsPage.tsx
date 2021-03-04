import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { SecuritizeERC721 } from '../components/securitize/SecuritizeERC721'
import { NftImage } from '../components/shared/cards/NftImage'
import { NftInfoDetails } from '../components/shared/cards/NftInfoDetails'
import { Footer, Header } from '../components/shared/layout'
import { getErc721ByAddress } from '../services/WalletService'
import { colors, fonts, viewport } from '../styles/variables'
import { WalletErc721Item } from '../types/WalletTypes'

export default function CollectionDetailsPage() {
  const { address, tokenId } = useParams<{ address: string | undefined; tokenId: string }>()
  const [erc721, setErc721] = useState<WalletErc721Item | undefined>(undefined)

  useEffect(() => {
    const getNfts = async () => {
      if (address) {
        const nft = await getErc721ByAddress(address, tokenId)
        setErc721(nft)
      }
    }
    getNfts()
  }, [address, tokenId])

  if (!erc721) return <></>

  return (
    <S.Collection>
      <Header page='securitize' />
      <S.Main>
        <S.Content>
          <S.Info>
            <S.MobileTitle>
              <S.TitleNft>
                <h1>
                  {`${erc721.name} #${erc721.tokenId}`}
                  <small>{erc721.symbol}</small>
                </h1>
              </S.TitleNft>
            </S.MobileTitle>
            <S.Image>
              <NftImage name={erc721.name} image={String(erc721.image_url)} />
            </S.Image>
            <S.Details>
              <S.DesktopTitle>
                <S.TitleNft>
                  <h1>
                    {`${erc721.name} #${erc721.tokenId}`}
                    <small>{erc721.symbol}</small>
                  </h1>
                </S.TitleNft>
              </S.DesktopTitle>
              <NftInfoDetails
                contractName={erc721.name}
                contractAddress={erc721.address}
                tokenId={erc721.tokenId}
                details={erc721.description != null ? erc721.description : ''}
              />
              <SecuritizeERC721 erc721Address={erc721.address} erc721AddressId={Number(erc721.tokenId)} />
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
  `
}
