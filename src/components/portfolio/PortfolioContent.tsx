import { Button, Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { claimModalVar } from '../../graphql/variables/PortfolioVariable'
// import { accountVar } from '../../graphql/variables/WalletVariable'
import { getERC20Shares } from '../../services/WalletService'
import { colors, viewport } from '../../styles/variables'
import { WalletERC20Share } from '../../types/WalletTypes'
import { Erc20ShareNotFound } from './Erc20ShareNotFound'

export interface PortfolioContentProps {
  className?: string
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({ className }: PortfolioContentProps) => {
  const [erc20share, setErc20share] = useState<WalletERC20Share[]>([])
  const [loading, setLoading] = useState(true)
  const { Panel } = Collapse
  // const account = useReactiveVar(accountVar)
  const account = '234'

  const headerMobile = () => {
    return (
      <S.PanelHeader>
        <S.PanelDivImage>image</S.PanelDivImage>
        <S.PanelDivInfo>
          <S.PanelErc20Name>Cat Frost erc20 share</S.PanelErc20Name>
          <S.PriceDiv>
            <S.PanelErc20Price>Price</S.PanelErc20Price>
            <S.PanelErc20PriceValue>$0.35</S.PanelErc20PriceValue>
          </S.PriceDiv>
          <S.BalanceDiv>
            <S.PanelErc20Balance>Balance</S.PanelErc20Balance>
            <S.PanelErc20BalanceValue>150.00</S.PanelErc20BalanceValue>
          </S.BalanceDiv>
        </S.PanelDivInfo>
      </S.PanelHeader>
    )
  }

  useEffect(() => {
    const getErc721 = async () => {
      if (account) {
        const nfts = await getERC20Shares(account)
        setErc20share(nfts)
        setLoading(false)
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
        {!loading &&
          erc20share.map(erc20Item => (
            <>
              <S.DivImage key={`erc20share-${erc20Item.address}`}>
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
              <S.DivErc20>{erc20Item.isClaimable && <S.Claim onClick={() => claimModalVar(erc20Item)}>Claim</S.Claim>}</S.DivErc20>
            </>
          ))}
      </S.ERC720TableItem>
      <S.ERC20TableItemMobile>
        <S.TokenTitle>
          <S.TokenSpanTitle>ERC20 shares</S.TokenSpanTitle>
        </S.TokenTitle>
        <S.ERC20ContentMobile>
          <S.Collapse expandIconPosition='right' ghost>
            <Panel header={headerMobile()} key='1'>
              <S.PanelContentItems>
                <S.PanelContentTitle>Details</S.PanelContentTitle>
                <S.PanelContent>
                  <S.PanelTitle>% of Portfolio</S.PanelTitle>
                  <S.PanelValue>1%</S.PanelValue>
                </S.PanelContent>
                <S.PanelContent>
                  <S.PanelTitle>Value</S.PanelTitle>
                  <S.PanelValue>$50.00</S.PanelValue>
                </S.PanelContent>
                <S.PanelContent>
                  <S.PanelTitle>change</S.PanelTitle>
                  <S.PanelValue>1%</S.PanelValue>
                </S.PanelContent>
                <S.PanelContent>
                  <S.PanelTitle>action</S.PanelTitle>
                  <S.PanelValue>1%</S.PanelValue>
                </S.PanelContent>
              </S.PanelContentItems>
            </Panel>
          </S.Collapse>
        </S.ERC20ContentMobile>
      </S.ERC20TableItemMobile>
      {!loading && !erc20share.length && <Erc20ShareNotFound />}
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
    @media (max-width: ${viewport.md}) {
      display: none;
    }
  `,
  ERC20TableItemMobile: styled.div`
    display: none;

    @media (max-width: ${viewport.md}) {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `,
  ERC20ContentMobile: styled.div`
    flex: 1;
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
  `,
  Collapse: styled(Collapse)`
    .ant-collapse-header {
      padding: 0 !important;
    }
    .ant-collapse-content > .ant-collapse-content-box {
      padding: 0px 16px 0px 0px;
    }
  `,
  PanelHeader: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    margin-top: 16px;
  `,
  PanelDivImage: styled.div`
    flex: 1;
    max-width: 48px;
    height: 56px;
    background: black;
    margin-right: 16px;
  `,
  PanelDivInfo: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  PriceDiv: styled.div`
    display: flex;
    flex-direction: row;
  `,
  PanelErc20Name: styled.h1`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  PanelErc20Price: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray9};
  `,
  PanelErc20PriceValue: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray2};
  `,
  BalanceDiv: styled.div`
    display: flex;
    flex-direction: row;
  `,
  PanelErc20Balance: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray9};
  `,
  PanelErc20BalanceValue: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray2};
  `,
  PanelContentItems: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  PanelContentTitle: styled.h1`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 8px;

    color: ${colors.gray2};
  `,
  PanelContent: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    margin-bottom: 4px;
  `,
  PanelTitle: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray1};
  `,
  PanelValue: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray2};
  `
}
