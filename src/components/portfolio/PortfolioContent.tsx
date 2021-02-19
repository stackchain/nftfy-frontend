import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { accountVar } from '../../graphql/variables/WalletVariable'
import { getERC20Shares } from '../../services/WalletService'
import { colors } from '../../styles/variables'
import { WalletERC20Share } from '../../types/WalletTypes'

export interface PortfolioContentProps {
  className?: string
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({ className }: PortfolioContentProps) => {
  const [erc20share, setErc20share] = useState<WalletERC20Share[]>([])
  // const account = useReactiveVar(accountVar)
  const account = '234'

  useEffect(() => {
    const getErc721 = async () => {
      if (account) {
        const nfts = await getERC20Shares(account)
        setErc20share(nfts)
      }
    }

    getErc721()
  }, [account])

  function returnColor(change: number) {
    if (change === 0) return ''
    return change < 0 ? 'red' : 'green'
  }
  return (
    <S.Erc720Content className={className}>
      <S.ERC720TableItem>
        <S.TokenTitle>
          <S.TokenSpanTitle>ERC20 shares</S.TokenSpanTitle>
        </S.TokenTitle>
        <S.TitleTable>Price</S.TitleTable>
        <S.TitleTable>% of Portfolio</S.TitleTable>
        <S.TitleTable>Balance</S.TitleTable>
        <S.TitleTable>Value</S.TitleTable>
        <S.TitleTable>Change</S.TitleTable>
        <S.TitleTable>Actions</S.TitleTable>
        {erc20share.map(erc20Item => (
          <>
            <S.DivImage key={`erc20-${erc20Item.address}`}>
              <S.ImageToken src={erc20Item.imageUrl} />
              <S.Erc20SpanTable>
                {`${erc20Item.name} `}
                <S.Symbol>{erc20Item.symbol}</S.Symbol>
              </S.Erc20SpanTable>
            </S.DivImage>
            <S.DivErc20>
              <S.Erc20SpanTable>{`$${erc20Item.price}`}</S.Erc20SpanTable>
            </S.DivErc20>
            <S.DivErc20>
              <S.Erc20SpanTable>{`${erc20Item.change}%`}</S.Erc20SpanTable>
            </S.DivErc20>
            <S.DivErc20>
              <S.Erc20SpanTable>{erc20Item.balance}</S.Erc20SpanTable>
            </S.DivErc20>
            <S.DivErc20>
              <S.Erc20SpanTable>{`$${erc20Item.dollarBalance}`}</S.Erc20SpanTable>
            </S.DivErc20>
            <S.DivErc20>
              <S.Erc20SpanTable className={returnColor(erc20Item.change)}>{`${erc20Item.change}%`}</S.Erc20SpanTable>
            </S.DivErc20>
            <S.DivErc20>{erc20Item.isClaimable && <S.Claim>Claim</S.Claim>}</S.DivErc20>
          </>
        ))}
      </S.ERC720TableItem>
    </S.Erc720Content>
  )
}
export const S = {
  Erc720Content: styled.div`
    background: ${colors.white};
    flex: 1;
  `,
  ERC720TableItem: styled.div`
    flex: 1;
    margin-bottom: 18px;
    flex: 1;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
  TitleTable: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.gray9};
  `,
  DivImage: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  ImageToken: styled.img`
    width: 48px;
    height: 48px;
    margin-right: 16px;
  `,
  DivErc20: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    .green {
      color: ${colors.green};
    }
    .red {
      color: ${colors.red};
    }
  `,
  Erc20SpanTable: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  Symbol: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray5};
  `,
  Claim: styled(Button)`
    flex: 1;
    max-width: 72px;
    max-height: 24px;

    background: ${colors.blue1};
    border-radius: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.white};

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${colors.blue1};
      color: ${colors.white};
    }
    &:focus {
      background: ${colors.blue1};
      color: ${colors.white};
    }
  `
}
