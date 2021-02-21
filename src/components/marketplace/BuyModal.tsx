import { useReactiveVar } from '@apollo/client'
import { Button, Input, Modal, Tabs } from 'antd'
import React from 'react'
import styled from 'styled-components'
import arrowDown from '../../assets/arrowDown.svg'
import ethereum from '../../assets/tokens/ethereum.svg'
import { buyModalVar } from '../../graphql/variables/MarketplaceVariable'
import { colors, fonts } from '../../styles/variables'

const { TabPane } = Tabs

export default function BuyModal() {
  const buyModal = useReactiveVar(buyModalVar)

  const handleCancel = () => {
    buyModalVar(undefined)
  }

  const callback = () => {
    console.log('callback')
  }
  console.log('buyModal', buyModal)
  return (
    <S.Modal visible onCancel={handleCancel}>
      <S.Tabs defaultActiveKey={buyModal === 'shares' ? '1' : '1'} onChange={callback}>
        <S.TabPane tab='Buy Shares' key='1'>
          <S.SharesContent>
            <S.Header>
              <div>
                <h3>
                  BLOCKIE # 24 shares
                  <small>KIE24</small>
                </h3>
              </div>
              <div>
                <img
                  src='https://lh3.googleusercontent.com/9fhtFiCAKNQfwUMxCs7vTPJTnDj9gWcEB-9TWPwL6cLxgE3DhDP7Kq4Yvs82MU4vutYuZgpc9Mu3l0TGuvAjtZgiUoiXzLKtjM_jpA'
                  alt='Google'
                />
              </div>
            </S.Header>
            <S.SharesFrom>
              <div>Balance: 1500</div>
              <div>
                <div>From</div>
                <div>
                  <S.TokenDropdownButton>
                    <img src={ethereum} alt='Ethereum' />
                    <span>ETH</span>
                    <img src={arrowDown} alt='arrow down' />
                  </S.TokenDropdownButton>
                </div>
                <div>
                  <S.TokenInput placeholder='0.0000' />
                </div>
              </div>
            </S.SharesFrom>
            <S.SharesSwitch>
              <div>switch</div>
              <div>1 share =</div>
            </S.SharesSwitch>
            <S.SharesTo>
              <div>balance</div>
              <div>
                <div>to</div>
                <div>KIE28</div>
                <div>Input</div>
              </div>
            </S.SharesTo>
            <S.SharesUnlock>
              <S.ActionButton>unlock</S.ActionButton>
            </S.SharesUnlock>
          </S.SharesContent>
        </S.TabPane>
        <S.TabPane tab='Buy NFT' key='2'>
          <S.NftContent>
            <S.Header>
              <div>
                <h3>
                  BLOCKIE 24
                  <small>KIE</small>
                </h3>
              </div>
              <div>
                <img
                  src='https://lh3.googleusercontent.com/9fhtFiCAKNQfwUMxCs7vTPJTnDj9gWcEB-9TWPwL6cLxgE3DhDP7Kq4Yvs82MU4vutYuZgpc9Mu3l0TGuvAjtZgiUoiXzLKtjM_jpA'
                  alt='Google'
                />
              </div>
            </S.Header>
            <S.NftExitPrice>ExitPrice</S.NftExitPrice>
            <S.NftDetails>Details</S.NftDetails>
            <S.NftPayment>Payment</S.NftPayment>
            <S.NftUnlock>Unlock</S.NftUnlock>
          </S.NftContent>
        </S.TabPane>
      </S.Tabs>
    </S.Modal>
  )
}

export const S = {
  Modal: styled(Modal)`
    border-radius: 8px;
    max-width: 500px;
    .ant-modal-body {
      padding: 0;
    }
    .ant-modal-content {
      border-radius: 16px;
    }
    .ant-modal-close-x {
      display: none;
    }
    .ant-modal-footer {
      display: none;
    }
  `,
  Tabs: styled(Tabs)`
    width: 100%;

    .ant-tabs-nav-list {
      width: 100%;
    }

    .ant-tabs-tab {
      width: 50%;
      height: 64px;
      justify-content: center;
      font-family: ${fonts.montserrat};
      font-weight: 600;
      color: ${colors.gray9};
      margin-right: 0;
      border-bottom: 1px solid ${colors.gray3};

      &:nth-child(1) {
        border-right: 1px solid ${colors.gray3};
      }
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      font-family: ${fonts.montserrat};
      font-weight: 600;
      color: ${colors.gray2};

      &:focus {
        font-family: ${fonts.montserrat};
        font-weight: 600;
        color: ${colors.gray2};
      }
    }

    .ant-tabs-nav {
      margin: 0;
    }
  `,
  TabPane: styled(TabPane)`
    min-height: 400px;
  `,
  SharesContent: styled.div`
    padding: 24px 32px;
  `,
  NftContent: styled.div`
    padding: 24px 32px;
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
  SharesFrom: styled.div`
    display: flex;
    flex-direction: column;

    > div:nth-child(1) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-family: ${fonts.montserrat};
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray1};
      font-weight: 500;

      margin-top: 24px;
      height: 32px;
    }

    > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      height: 40px;

      > div:nth-child(1) {
        display: flex;
        font-family: ${fonts.montserrat};
        font-size: 16px;
        line-height: 24px;
        color: ${colors.gray2};
        font-weight: 600;
        flex: 64px 0 0;
        height: 40px;
        align-items: center;
      }

      > div:nth-child(2) {
        border: 1px solid ${colors.gray3};
        height: 40px;
        display: flex;
        align-items: center;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        flex: 120px 0 0;
        padding-left: 16px;
        padding-right: 8px;

        &:hover {
          background-color: ${colors.white2};
        }
      }

      > div:nth-child(3) {
        border: 1px solid ${colors.gray3};
        height: 40px;
        display: flex;
        align-items: center;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        flex: 1 1 0;
        border-left: 0;
        justify-content: flex-end;
        padding-right: 16px;
      }
    }
  `,
  SharesSwitch: styled.div``,
  SharesTo: styled.div``,
  SharesUnlock: styled.div``,
  NftExitPrice: styled.div``,
  NftDetails: styled.div``,
  NftPayment: styled.div``,
  NftUnlock: styled.div``,
  ActionButton: styled(Button)``,
  TokenDropdownButton: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;

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
  `,
  TokenInput: styled(Input)`
    border: none;
    outline: none;
    box-shadow: none;
    text-align: end;
    padding: 0;

    width: 100%;
    height: 100%;

    font-family: ${fonts.montserrat};
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray2};
    font-weight: 500;

    &:hover,
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  `
}
