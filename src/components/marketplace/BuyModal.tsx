import { useReactiveVar } from '@apollo/client'
import { Modal, Tabs } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { buyModalVar } from '../../graphql/variables/MarketplaceVariable'
import { colors, fonts } from '../../styles/variables'
import { BuyModalNft } from './BuyModalNft'
import { BuyModalShares } from './BuyModalShares'

const { TabPane } = Tabs

export default function BuyModal() {
  const buyModal = useReactiveVar(buyModalVar)

  const handleCancel = () => {
    buyModalVar(undefined)
  }

  const handleChange = (activeKey: string) => {
    if (activeKey === 'shares') {
      buyModalVar(activeKey)
    } else if (activeKey === 'nft') {
      buyModalVar(activeKey)
    }
  }

  return (
    <S.Modal visible={!!buyModal} onCancel={handleCancel}>
      <S.Tabs activeKey={buyModal === 'shares' ? 'shares' : 'nft'} onChange={handleChange}>
        <S.TabPane tab='Buy Shares' key='shares'>
          <BuyModalShares />
        </S.TabPane>
        <S.TabPane tab='Buy NFT' key='nft'>
          <BuyModalNft />
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
  `
}
