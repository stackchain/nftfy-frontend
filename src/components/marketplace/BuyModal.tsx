import { useReactiveVar } from '@apollo/client'
import { Button, Input, Modal, Tabs } from 'antd'
import React from 'react'
import styled from 'styled-components'
import arrowDown from '../../assets/arrowDown.svg'
import switchTopDown from '../../assets/switchTopDown.svg'
import ethereum from '../../assets/tokens/ethereum.svg'
import { buyModalVar } from '../../graphql/variables/MarketplaceVariable'
import { colors, fonts, viewport } from '../../styles/variables'

const { TabPane } = Tabs

export default function BuyModal() {
  const buyModal = useReactiveVar(buyModalVar)

  const handleCancel = () => {
    buyModalVar(undefined)
  }

  return (
    <S.Modal visible onCancel={handleCancel}>
      <S.Tabs defaultActiveKey={buyModal === 'shares' ? '2' : '2'} onChange={() => null}>
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
                  <S.TokenButton>
                    <img src={ethereum} alt='Ethereum' />
                    <span>ETH</span>
                    <img src={arrowDown} alt='Arrow Down' />
                  </S.TokenButton>
                </div>
                <div>
                  <S.TokenInput placeholder='0.0000' />
                </div>
              </div>
            </S.SharesFrom>
            <S.SharesSwitch>
              <div>
                <div>
                  <img src={switchTopDown} alt='Switch Token' />
                </div>
              </div>
              <div>
                <span>1 Share =</span>
                <span>
                  0.0000053 ETH
                  <span>$0,50</span>
                </span>
              </div>
            </S.SharesSwitch>
            <S.SharesTo>
              <div>Balance: 100.0</div>
              <div>
                <div>To</div>
                <div>
                  <S.TokenButton className='noDropdown'>
                    <img src={ethereum} alt='Ethereum' />
                    <span>KIE24</span>
                    <img src={arrowDown} alt='Arrow Down' />
                  </S.TokenButton>
                </div>
                <div>
                  <S.TokenInput placeholder='0.0000' />
                </div>
              </div>
            </S.SharesTo>
            <S.SharesUnlock>
              <S.ActionButton>Unlock</S.ActionButton>
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
            <S.NftExitPrice>
              <div>Exit Price</div>
              <div>
                <div>50.0 ETH</div>
                <div>$63.875</div>
              </div>
            </S.NftExitPrice>
            <S.NftDetails>
              <div>Order Details</div>
              <div>%</div>
              <div>Value</div>
              <div>Your Participation</div>
              <div>35%</div>
              <div>100 KIE24</div>
              <div>Pay Amount</div>
              <div>65%</div>
              <div>
                <div>32.5 ETH</div>
                <div>$25.750</div>
              </div>
            </S.NftDetails>
            <S.NftPayment>
              <div>Balance: 100.0</div>
              <div>
                <div>Payment</div>
                <div>
                  <S.TokenButton className='noDropdown'>
                    <img src={ethereum} alt='Ethereum' />
                    <span>ETH</span>
                    <img src={arrowDown} alt='Arrow Down' />
                  </S.TokenButton>
                </div>
                <div>
                  <S.TokenInput placeholder='0.0000' disabled />
                </div>
              </div>
              <div>$ 300,00</div>
            </S.NftPayment>
            <S.NftUnlock>
              <S.ActionButton>Unlock</S.ActionButton>
            </S.NftUnlock>
          </S.NftContent>
        </S.TabPane>
      </S.Tabs>
    </S.Modal>
  )
}

export const S = {
  Modal: styled(Modal)`
    border-radius: 8px;

    .ant-modal-body {
      padding: 0;
    }
    .ant-modal-content {
      border-radius: 16px;
      max-width: 460px;
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

    @media (max-width: ${viewport.sm}) {
      padding: 24px 16px;
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
        flex: 100px 0 0;

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
  SharesSwitch: styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;

    @media (max-width: ${viewport.sm}) {
      margin-top: 24px;
      margin-bottom: 24px;
    }

    > div:nth-child(1) {
      display: flex;
      flex: 64px 0 0;

      div {
        background-color: ${colors.gray4};
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 40px 0 0;
        cursor: pointer;

        margin-top: 24px;
        margin-bottom: 24px;

        width: 40px;
        height: 40px;
        border-radius: 100%;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;

        img {
          width: 20px;
          height: 18px;
        }

        &:hover {
          background-color: ${colors.gray1};
        }
      }
    }

    > div:nth-child(2) {
      display: flex;
      flex: 1;
      font-family: ${fonts.montserrat};
      font-size: 16px;
      line-height: 24px;
      color: ${colors.gray2};
      font-weight: 500;

      span:nth-child(1) {
        margin-right: 4px;
      }

      span:nth-child(2) {
        span {
          color: ${colors.gray1};
          margin-left: 8px;
          font-size: 12px;
          font-weight: 600;
        }
      }

      @media (max-width: ${viewport.sm}) {
        flex-direction: column;
      }
    }
  `,
  SharesTo: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -32px;
    margin-bottom: 32px;

    > div:nth-child(1) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-family: ${fonts.montserrat};
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray1};
      font-weight: 500;

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
        flex: 100px 0 0;
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
  SharesUnlock: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
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
  NftDetails: styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1.4fr;
    grid-template-rows: 1fr 1fr 1fr;

    border: 1px solid ${colors.gray3};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;

    div {
      font-family: ${fonts.montserrat};
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
      color: ${colors.gray2};
      text-align: end;
    }

    > div:nth-child(1),
    > div:nth-child(2),
    > div:nth-child(3) {
      color: ${colors.gray1};
    }

    > div:nth-child(9) {
      > div:nth-child(2) {
        color: ${colors.gray1};
        font-size: 12px;
        line-height: 16px;
      }
    }

    > div:nth-child(1),
    > div:nth-child(4),
    > div:nth-child(7) {
      text-align: start;
    }
  `,
  NftPayment: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    > div:nth-child(1) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-family: ${fonts.montserrat};
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray1};
      font-weight: 500;

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
        flex: 100px 0 0;
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
        flex: 100px 0 0;
        background-color: ${colors.white1};
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
        background-color: ${colors.white1};
      }
    }

    > div:nth-child(3) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-family: ${fonts.montserrat};
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray1};
      font-weight: 500;

      height: 32px;
    }
  `,
  NftUnlock: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  `,
  ActionButton: styled(Button)`
    height: 40px;
    padding: 0 64px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${fonts.montserrat};

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
