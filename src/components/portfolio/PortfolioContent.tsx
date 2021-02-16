import { useReactiveVar } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { accountVar } from '../../graphql/variables/WalletVariable'
import { getERC721Items } from '../../services/WalletService'
import { colors } from '../../styles/variables'
import { WalletErc721Item } from '../../types/WalletTypes'

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
  const [erc721, setErc721] = useState<WalletErc721Item[]>([])
  const account = useReactiveVar(accountVar)

  useEffect(() => {
    const getErc721 = async () => {
      if (account) {
        const nfts = await getERC721Items(account)
        setErc721(nfts)
      }
    }

    getErc721()
  }, [account])

  return (
    <S.Erc721Content className={className}>
      <S.ERC721TableItem>
        <S.TokenTitle>
          <S.TokenSpanTitle>ECR721</S.TokenSpanTitle>
        </S.TokenTitle>

        <S.ContractName>
          <S.ContractNameSpanTitle>Contract Name</S.ContractNameSpanTitle>
        </S.ContractName>
        <S.TokenId>
          <S.TokenIdSpanTitle>Token ID</S.TokenIdSpanTitle>
        </S.TokenId>
        <S.ContractAddress>
          <S.ContractAddressSpanTitle>Contract Address</S.ContractAddressSpanTitle>
        </S.ContractAddress>

        {erc721.map(erc721Item => (
          <div key={`erc721-${erc721Item.address}`}>
            <S.TokenTitle>
              <S.TokenImage src={erc721Item.image_url} />
            </S.TokenTitle>

            <S.ContractName>
              <S.ContractNameContentSpan>{erc721Item.name}</S.ContractNameContentSpan>
            </S.ContractName>
            <S.TokenId>
              <S.TokenIdContentSpan>{erc721Item.tokenId}</S.TokenIdContentSpan>
            </S.TokenId>
            <S.ContractAddress>
              <S.ContractAddressLink>{erc721Item.address}</S.ContractAddressLink>
            </S.ContractAddress>
          </div>
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
    grid-template-columns: 1fr 1fr 1fr 8fr;
    gap: 16px 0px;
  `,
  TokenTitle: styled.div``,

  TokenSpanTitle: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
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
