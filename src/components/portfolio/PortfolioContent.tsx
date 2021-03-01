import { Button, Collapse } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { claimModalVar } from '../../graphql/variables/PortfolioVariable'
import { connectWalletModalVar } from '../../graphql/variables/WalletVariable'
import { colors, viewport } from '../../styles/variables'
import { WalletERC20Share } from '../../types/WalletTypes'
import { LoadingMobileSkeleton } from './LoadingMobileSkeleton'
import { LoadingSkeleton } from './LoadingSkeleton'

export interface PortfolioContentProps {
  className?: string
  erc20share: WalletERC20Share[]
  loading: boolean
  account: boolean
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({ className, erc20share, loading, account }: PortfolioContentProps) => {
  const { Panel } = Collapse

  function returnColor(change: number) {
    if (change === 0) return ''
    return change < 0 ? 'red' : 'green'
  }

  const openConnectWalletModal = () => {
    connectWalletModalVar(true)
  }

  const loadingShares = []
  const loadingMobile = []

  for (let i = 1; i <= 4; i += 1) {
    loadingShares.push(<LoadingSkeleton key={`loading-${i}`} />)
  }

  for (let i = 1; i <= 4; i += 1) {
    loadingMobile.push(<LoadingMobileSkeleton key={`loadingMobile-${i}`} />)
  }

  const headerMobile = (erc20Item: WalletERC20Share) => {
    return (
      <S.PanelHeader>
        <S.ImageToken src={erc20Item.erc721.imageUrl} />
        <S.PanelDivInfo>
          <S.PanelErc20Name>{erc20Item.name}</S.PanelErc20Name>
          <S.PriceDiv>
            <S.PanelErc20Price>Price </S.PanelErc20Price>
            <S.PanelErc20PriceValue>{` $${erc20Item.financial.balanceDollar}`}</S.PanelErc20PriceValue>
          </S.PriceDiv>
          <S.BalanceDiv>
            <S.PanelErc20Balance>Balance </S.PanelErc20Balance>
            <S.PanelErc20BalanceValue>{erc20Item.balance}</S.PanelErc20BalanceValue>
          </S.BalanceDiv>
        </S.PanelDivInfo>
      </S.PanelHeader>
    )
  }

  return (
    <S.Erc720Content className={className}>
      <S.ERC720TableItem>
        <S.PanelHeaderTable>
          <S.TokenTitle>
            <S.TokenSpanTitle>ERC20 shares</S.TokenSpanTitle>
          </S.TokenTitle>
          <S.TitleTable>Price</S.TitleTable>
          <S.TitleTable>% of Portfolio</S.TitleTable>
          <S.TitleTable>Balance</S.TitleTable>
          <S.TitleTable>Value</S.TitleTable>
          <S.TitleTable>Change</S.TitleTable>
          <S.TitleTable>Actions</S.TitleTable>
          {loading && loadingShares}
        </S.PanelHeaderTable>
        {account &&
          erc20share.map(erc20Item => (
            <S.PanelContentTable key={`erc20share-${erc20Item.address}`}>
              <S.DivImage>
                <S.ImageToken src={erc20Item.erc721.imageUrl} />
                <S.Erc20SpanTable hidden={!!loading}>
                  {`${erc20Item.name} `}
                  <S.Symbol>{erc20Item.symbol}</S.Symbol>
                </S.Erc20SpanTable>
              </S.DivImage>
              <S.DivErc20>
                <S.Erc20SpanTable>{`$${erc20Item.financial.price}`}</S.Erc20SpanTable>
              </S.DivErc20>
              <S.DivErc20>
                <S.Erc20SpanTable>0%</S.Erc20SpanTable>
              </S.DivErc20>
              <S.DivErc20>
                <S.Erc20SpanTable>{erc20Item.balance}</S.Erc20SpanTable>
              </S.DivErc20>
              <S.DivErc20>
                <S.Erc20SpanTable>{`$${erc20Item.financial.balanceDollar}`}</S.Erc20SpanTable>
              </S.DivErc20>
              <S.DivErc20>
                <S.Erc20SpanTable className={returnColor(erc20Item.financial.change)}>{`${erc20Item.financial.change}%`}</S.Erc20SpanTable>
              </S.DivErc20>
              <S.DivErc20>{erc20Item.released && <S.Claim onClick={() => claimModalVar(erc20Item)}>Claim</S.Claim>}</S.DivErc20>
            </S.PanelContentTable>
          ))}
      </S.ERC720TableItem>
      <S.ERC20TableItemMobile>
        <S.TokenTitle>
          <S.TokenSpanTitle>ERC20 shares</S.TokenSpanTitle>
        </S.TokenTitle>
        <S.ERC20ContentMobile>
          <S.Collapse expandIconPosition='right' ghost>
            {loading && loadingMobile}
            {account &&
              erc20share.map(erc20Item => (
                <Panel header={headerMobile(erc20Item)} key={`erc20shareMobile-${erc20Item.address}`}>
                  <S.PanelContentItems>
                    <S.PanelContentTitle>Details</S.PanelContentTitle>
                    <S.PanelContent>
                      <S.PanelTitle>% of Portfolio</S.PanelTitle>
                      <S.PanelValue>0%</S.PanelValue>
                    </S.PanelContent>
                    <S.PanelContent>
                      <S.PanelTitle>Value</S.PanelTitle>
                      <S.PanelValue>{`$${erc20Item.financial.balanceDollar}`}</S.PanelValue>
                    </S.PanelContent>
                    <S.PanelContent>
                      <S.PanelTitle>Change</S.PanelTitle>
                      <S.PanelValue className={returnColor(erc20Item.financial.change)}>{`${erc20Item.financial.change}%`}</S.PanelValue>
                    </S.PanelContent>
                    <S.PanelContent>
                      <S.PanelTitle>Action</S.PanelTitle>
                      <S.PanelValue>{erc20Item.released && <S.Claim onClick={() => claimModalVar(erc20Item)}>Claim</S.Claim>}</S.PanelValue>
                    </S.PanelContent>
                  </S.PanelContentItems>
                </Panel>
              ))}
          </S.Collapse>
        </S.ERC20ContentMobile>
      </S.ERC20TableItemMobile>
      {!loading && !erc20share.length && account && (
        <S.Erc20ShareNotFound className={className}>
          <S.H1>You have no ERC20 shares!</S.H1>
          <S.Span>To buy your first Erc20 Shares Token access the link below</S.Span>
          <S.LinkItem to='/marketplace'>
            <S.Button>Explore</S.Button>
          </S.LinkItem>
        </S.Erc20ShareNotFound>
      )}
      {!account && (
        <S.Erc20ShareNotFound className={className}>
          <S.H1>Please connect your wallet</S.H1>
          <S.Span>To see the portfolio you will need to connect the wallet</S.Span>
          <S.Button onClick={openConnectWalletModal}>Connect Wallet</S.Button>
        </S.Erc20ShareNotFound>
      )}
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
    @media (max-width: ${viewport.md}) {
      display: none;
    }
  `,
  PanelHeaderTable: styled.div`
    flex: 1;
    margin-bottom: 18px;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 16px 0px;
  `,
  PanelContentTable: styled.div`
    flex: 1;
    margin-bottom: 18px;
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
    .ant-skeleton-element .ant-skeleton-avatar {
      vertical-align: baseline;
    }
    h3.ant-skeleton-title {
      margin-left: 16px;
    }
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
    align-items: center;
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
    margin-right: 4px;

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
    margin-bottom: 8px;
    .green {
      color: ${colors.green};
    }
    .red {
      color: ${colors.red};
    }
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
  `,

  Erc20ShareNotFound: styled.section`
    flex: 1;
    background: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 5px;

    border: 1px solid ${colors.gray10};
    box-sizing: border-box;
    border-radius: 8px;
    @media (max-width: ${viewport.md}) {
      text-align: center;
    }
  `,
  H1: styled.h1`
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 2.3rem;
    line-height: 3rem;

    color: ${colors.gray1};
    @media (max-width: ${viewport.md}) {
      font-size: 2.2rem;
    }
  `,
  Span: styled.span`
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 2.2rem;

    color: ${colors.gray1};
    @media (max-width: ${viewport.md}) {
      font-size: 1.2rem;
    }
  `,
  Button: styled(Button)`
    width: 100%;
    max-width: 192px;
    height: 40px;

    border: 1px solid ${colors.gray5};
    box-sizing: border-box;
    border-radius: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: ${colors.gray1};
    &:focus {
      color: ${colors.gray1};
      border: 1px solid ${colors.gray5};
      outline: none;
    }
    &:hover {
      color: ${colors.gray1};
      border: 1px solid ${colors.gray5};
    }
  `,
  LinkItem: styled(Link)`
    text-decoration: none;
  `
}
