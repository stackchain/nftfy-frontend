import { useReactiveVar } from '@apollo/client'
import { Button, Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { claimModalVar } from '../../graphql/variables/PortfolioVariable'
import { claimErc20 } from '../../services/NftfyService'
import { colors, viewport } from '../../styles/variables'

export interface ClaimModalProps {
  className?: string
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ className }: ClaimModalProps) => {
  const erc20Share = useReactiveVar(claimModalVar)

  const handleCancel = () => {
    claimModalVar(undefined)
  }

  const claim = async () => {
    erc20Share && (await claimErc20(erc20Share?.address))
  }

  return (
    <S.ClaimModal title='Claim Share' onCancel={handleCancel} className={className} visible={!!erc20Share} footer={null}>
      {!!erc20Share && (
        <>
          <S.Header>
            <S.HeaderDiv>
              <S.H1header>{erc20Share.name}</S.H1header>
              <S.ShareAddress>{erc20Share.address}</S.ShareAddress>
            </S.HeaderDiv>
            <S.TokenImage />
          </S.Header>

          <S.HeaderMobile>
            <S.TokenImage />
            <S.HeaderDiv>
              <S.H1header>{erc20Share.name}</S.H1header>
              <S.ShareAddress>{erc20Share.address}</S.ShareAddress>
            </S.HeaderDiv>
          </S.HeaderMobile>

          <S.ExitPriceDiv>
            <S.ExitSpan>Exit Price</S.ExitSpan>
            <S.PriceDiv>
              <S.ValueEth>{`${erc20Share.balance} ${erc20Share.symbol}`}</S.ValueEth>
              <S.ValueMoney>{`$${erc20Share.financial.balanceDollar}`}</S.ValueMoney>
            </S.PriceDiv>
          </S.ExitPriceDiv>

          <S.DetailsDiv>
            <S.DetailsH1>Claim Details</S.DetailsH1>

            <S.DetailsBalanceDiv>
              <S.BalanceSpan>Balance</S.BalanceSpan>
              <S.BalanceYcs>{`${erc20Share.balance}YCS`}</S.BalanceYcs>
            </S.DetailsBalanceDiv>

            <S.TotalReceiveDiv>
              <S.TotalReceiveSpan>Total to receive</S.TotalReceiveSpan>
              <S.BalanceValueDiv>
                <S.BalanceEth>{`${erc20Share.balance} ${erc20Share.symbol}`}</S.BalanceEth>
                <S.BalanceMoney>{`$${erc20Share.financial.balanceDollar}`}</S.BalanceMoney>
              </S.BalanceValueDiv>
            </S.TotalReceiveDiv>
          </S.DetailsDiv>

          <S.ButtonClaim onClick={claim}>Claim</S.ButtonClaim>
        </>
      )}
    </S.ClaimModal>
  )
}
export const S = {
  ClaimModal: styled(Modal)`
    background: #ffffff;
    border-radius: 16px;
    flex: 1;
    padding: 0;
    .ant-modal-header {
      border-radius: 16px 16px 0 0;
      padding: 28px 33px 25px 33px;
      @media (max-width: ${viewport.sm}) {
        padding: 21px 33px 18px 24px;
      }
    }
    .ant-modal-content {
      border-radius: 16px;
    }
    .ant-modal-body {
      padding: 33px;
      @media (max-width: ${viewport.sm}) {
        padding: 24px;
      }
    }
    .ant-modal-title {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      height: auto;
      color: ${colors.gray2};
    }
    span.ant-modal-close-x {
      display: none;
    }
  `,
  Header: styled.header`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    @media (max-width: ${viewport.sm}) {
      display: none;
    }
  `,
  HeaderMobile: styled.div`
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-bottom: 18px;

    display: none;
    @media (max-width: ${viewport.sm}) {
      display: flex;
    }
  `,
  HeaderDiv: styled.div`
    display: flex;
    flex-direction: column;
  `,
  H1header: styled.h1`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    margin: 0px;

    color: ${colors.gray2};
  `,
  ShareAddress: styled.a`
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
  TokenImage: styled.div`
    width: 48px;
    height: 48px;

    background: ${colors.black};
    @media (max-width: ${viewport.sm}) {
      margin-right: 10px;
    }
  `,
  ExitPriceDiv: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 18px;
    @media (max-width: ${viewport.sm}) {
      margin-bottom: 8px;
    }
  `,
  ExitSpan: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray2};
  `,
  PriceDiv: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media (max-width: ${viewport.sm}) {
      flex-direction: row;
    }
  `,
  ValueEth: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
    @media (max-width: ${viewport.sm}) {
      margin-right: 16px;
    }
  `,
  ValueMoney: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray1};
  `,

  DetailsDiv: styled.div`
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;

    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    border-radius: 8px;

    margin-bottom: 24px;
  `,
  DetailsH1: styled.h1`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  DetailsBalanceDiv: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0px;
  `,
  BalanceSpan: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  BalanceYcs: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  TotalReceiveDiv: styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  TotalReceiveSpan: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: ${colors.gray2};
  `,
  BalanceValueDiv: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  BalanceEth: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    color: ${colors.gray2};
  `,
  BalanceMoney: styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;

    color: ${colors.gray5};
  `,
  ButtonClaim: styled(Button)`
    flex: 1;
    width: 100%;
    max-height: 40px;
    max-width: 209px;
    background: ${colors.blue1};
    border-radius: 8px;
    margin: 0 auto;
    padding: 19px 0;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.white};

    &:hover {
      color: ${colors.white};
      background: ${colors.blue1};
    }

    &:focus {
      color: ${colors.white};
      background: ${colors.blue1};
    }
  `
}
