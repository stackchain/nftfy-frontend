import { useReactiveVar } from '@apollo/client'
import { Button, Modal } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { claimModalVar } from '../../graphql/variables/PortfolioVariable'
import { claimErc20 } from '../../services/NftfyService'
import { colors, fonts, viewport } from '../../styles/variables'

export interface ClaimModalProps {
  className?: string
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ className }: ClaimModalProps) => {
  const erc20Share = useReactiveVar(claimModalVar)

  const handleCancel = () => {
    claimModalVar(undefined)
  }

  const claim = async () => {
    erc20Share && (await claimErc20(erc20Share.address))
  }

  return (
    <S.ClaimModal onCancel={handleCancel} className={className} visible={!!erc20Share} footer={null}>
      {!!erc20Share && (
        <S.NftContent>
          <S.Header>
            <div>
              <h3>
                {erc20Share.name}
                <small>{erc20Share.symbol}</small>
              </h3>
            </div>
            <div>
              <img src={erc20Share.erc721.imageUrl} alt={`${erc20Share.erc721.name}`} />
            </div>
          </S.Header>
          <S.NftExitPrice>
            <div>Exit Price</div>
            <div>
              <div>{`${erc20Share.exitPrice.toLocaleString('en-us')} ${erc20Share.paymentTokenSymbol}`}</div>
              <div>{`$${erc20Share.financial.exitPriceDollar.toLocaleString('en-us')}`}</div>
            </div>
          </S.NftExitPrice>
          <S.NftDetails>
            <div>Share Balance</div>
            <div>{`${erc20Share.balance} ${erc20Share.paymentTokenSymbol}`}</div>
            <div>Claim Amount</div>
            <div>
              <div>{`${erc20Share.financial.price} ${erc20Share.paymentTokenSymbol}`}</div>
              <div>{`$${erc20Share.totalSupply}`}</div>
            </div>
          </S.NftDetails>
          <S.NftPay>
            <S.ActionButton onClick={claim}>Claim</S.ActionButton>
          </S.NftPay>
        </S.NftContent>
      )}
    </S.ClaimModal>
  )
}
export const S = {
  ClaimModal: styled(Modal)`
    border-radius: 8px;

    .ant-modal-body {
      padding: 0;
    }
    .ant-modal-content {
      border-radius: 16px;
      max-width: 440px;
    }
    .ant-modal-close-x {
      display: none;
    }
    .ant-modal-footer {
      display: none;
    }
  `,
  NftContent: styled.div`
    padding: 24px 32px;

    @media (max-width: ${viewport.sm}) {
      padding: 32px 16px;
    }
  `,
  Header: styled.div`
    display: flex;
    flex-direction: row;

    div {
      &:nth-child(1) {
        flex: 1;
        display: flex;
        align-items: center;

        h3 {
          font-family: ${fonts.montserrat};
          font-size: 24px;
          font-weight: 600;
          line-height: 24px;
          color: ${colors.gray2};

          small {
            color: ${colors.gray1};
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        display: flex;
      }
    }
  `,
  NftDetails: styled.div`
    display: grid;
    grid-template-columns: 2fr 1.4fr;
    grid-template-rows: 32px 32px;

    border: 1px solid ${colors.gray3};
    border-radius: 8px;
    padding: 16px;
    padding-bottom: 32px;
    margin-bottom: 32px;

    div {
      font-family: ${fonts.montserrat};
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
      color: ${colors.gray2};
      text-align: end;
    }

    > div:nth-child(4) {
      > div:nth-child(2) {
        color: ${colors.gray1};
        font-size: 12px;
        line-height: 16px;
        position: absolute;
        margin-top: 38px;
      }
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    > div:nth-child(1),
    > div:nth-child(3) {
      justify-content: flex-start;
    }
  `,
  NftExitPrice: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    margin-top: 16px;
    margin-bottom: 16px;

    > div:nth-child(1) {
      display: flex;
      flex: 100px 0 0;

      font-family: ${fonts.montserrat};
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      color: ${colors.gray1};
    }

    > div:nth-child(2) {
      flex: 1;

      > div {
        display: flex;
        justify-content: flex-end;
      }

      > div:nth-child(1) {
        font-family: ${fonts.montserrat};
        font-size: 14px;
        line-height: 22px;
        font-weight: 500;
        color: ${colors.gray2};
      }

      > div:nth-child(2) {
        font-family: ${fonts.montserrat};
        font-size: 14px;
        line-height: 22px;
        font-weight: 500;
        color: ${colors.gray1};
      }
    }
  `,
  NftPay: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  `,
  TokenButton: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
    padding: 8px;

    img:nth-child(1) {
      margin-right: 8px;
    }

    span {
      margin-right: 8px;
      font-family: ${fonts.montserrat};
      font-weight: 600;
      color: ${colors.gray2};
    }

    img:nth-child(3) {
      width: 16px;
      height: 16px;
    }

    &.noDropdown {
      cursor: default;
      img:nth-child(3) {
        display: none;
      }
    }
  `,
  ActionButton: styled(Button)`
    height: 40px;
    padding: 0 64px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${fonts.montserrat};
    width: 100%;

    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: ${colors.white};
    background-color: ${colors.blue1};
    border: 1px solid ${colors.blue1};

    &:hover,
    &:focus {
      font-family: ${fonts.montserrat};
      color: ${colors.white};
      background-color: ${colors.blue2};
      border: 1px solid ${colors.blue2};
    }

    @media (max-width: ${viewport.sm}) {
      width: 100%;
    }
  `
}
