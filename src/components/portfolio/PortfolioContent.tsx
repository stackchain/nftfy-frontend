import React, { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../styles/variables'
import { erc721Mock } from '../../__mocks__/pages/PagePortfolio.mock'

export interface PortfolioContentProps {
  className?: string
}

export interface ERC721 {
  tokenImage: string
  tokenName: string
  contractAddress: string
  contractName: string
  tokenId: number
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({ className }: PortfolioContentProps) => {
  const [erc721] = useState<ERC721[]>(erc721Mock)
  return (
    <S.Erc721Content className={className}>
      <S.ERC721TableItem>
        <S.TokenTitle>
          <S.TokenSpanTitle>ECR721</S.TokenSpanTitle>
        </S.TokenTitle>
        <S.ContractAddress>
          <S.ContractAddressSpanTitle>Contract Address</S.ContractAddressSpanTitle>
        </S.ContractAddress>
        <S.ContractName>
          <S.ContractNameSpanTitle>Contract Name</S.ContractNameSpanTitle>
        </S.ContractName>
        <S.TokenId>
          <S.TokenIdSpanTitle>Token ID</S.TokenIdSpanTitle>
        </S.TokenId>

        {erc721.map(erc721Item => (
          <>
            <S.TokenTitle>
              <S.TokenArea>
                <S.TokenImage src={erc721Item.tokenImage} />
                <S.TokenName>
                  {erc721Item.tokenName}
                  <S.TokenNameNft> NFT</S.TokenNameNft>
                </S.TokenName>
              </S.TokenArea>
            </S.TokenTitle>
            <S.ContractAddress>
              <S.ContractAddressLink>{erc721Item.contractAddress}</S.ContractAddressLink>
            </S.ContractAddress>
            <S.ContractName>
              <S.ContractNameContentSpan>{erc721Item.contractName}</S.ContractNameContentSpan>
            </S.ContractName>
            <S.TokenId>
              <S.TokenIdContentSpan>{erc721Item.tokenId}</S.TokenIdContentSpan>
            </S.TokenId>
          </>
        ))}
      </S.ERC721TableItem>
    </S.Erc721Content>
  )
}
export const S = {
  Erc721Content: styled.div`
    background: ${colors.white};
    flex: 1;
  `,
  ERC721TableItem: styled.div`
    flex: 1;
    margin-bottom: 18px;
    flex: 1;
    display: grid;
    grid-template-columns: 4fr 3fr 1fr 1fr;
    gap: 16px 0px;
  `,
  TokenTitle: styled.div``,
  TokenName: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  TokenNameNft: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray5};
  `,
  TokenSpanTitle: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  TokenArea: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  TokenImage: styled.img`
    width: 48px;
    height: 48px;
    margin-right: 18px;
  `,
  ContractAddress: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  ContractAddressSpanTitle: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray9};
  `,
  ContractAddressLink: styled.a`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.blue1};
    &:hover {
      color: ${colors.blue1};
    }
  `,
  ContractName: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  ContractNameSpanTitle: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray9};
  `,
  ContractNameContentSpan: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  TokenId: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  TokenIdSpanTitle: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray9};
  `,
  TokenIdContentSpan: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `
}
