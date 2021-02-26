import { useReactiveVar } from '@apollo/client'
import { Button, Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { claimModalVar } from '../../graphql/variables/PortfolioVariable'
import { accountVar } from '../../graphql/variables/WalletVariable'
import { colors, viewport } from '../../styles/variables'
import { WalletERC20Share } from '../../types/WalletTypes'
import { Erc20ShareNotFound } from './Erc20ShareNotFound'
import { LoadingMobileSkeleton } from './LoadingMobileSkeleton'

export const PortfolioContentMobile: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [erc20share, setErc20share] = useState<WalletERC20Share[]>([])
  const [loading, setLoading] = useState(true)
  const { Panel } = Collapse
  const account = useReactiveVar(accountVar)

  useEffect(() => {
    const getErc721 = async () => {
      if (account) {
        // const nfts = await getERC20Shares(account)
        // setErc20share(nfts)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    getErc721()
  }, [account])

  function returnColor(change: number) {
    if (change === 0) return ''
    return change < 0 ? 'red' : 'green'
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
    <S.Erc720Content>
      <S.ERC20TableItemMobile>
        <S.TokenTitle>
          <S.TokenSpanTitle>ERC20 shares</S.TokenSpanTitle>
        </S.TokenTitle>
        <S.ERC20ContentMobile>
          <S.Collapse expandIconPosition='right' ghost>
            {loading && <LoadingMobileSkeleton loading={loading} />}
            {erc20share.map(erc20Item => (
              <Panel header={headerMobile(erc20Item)} key={`erc20share-${erc20Item.address}`}>
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
      {!loading && !erc20share.length && <Erc20ShareNotFound account={!!account} />}
    </S.Erc720Content>
  )
}
export const S = {
  Erc720Content: styled.div`
    display: none;
    @media (max-width: ${viewport.md}) {
      background: ${colors.white};
      display: flex;
      flex: 1;
    }
  `,
  ERC20TableItemMobile: styled.div`
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

  ImageToken: styled.img`
    width: 48px;
    height: 48px;
    margin-right: 16px;
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
  `
}
