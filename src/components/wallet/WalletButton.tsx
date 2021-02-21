import { useReactiveVar } from '@apollo/client'
import { Dropdown, Menu, Skeleton } from 'antd'
import React from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import styled from 'styled-components'
import { accountVar, nfyVar } from '../../graphql/variables/WalletVariable'
import { colors, viewport } from '../../styles/variables'

export const WalletButton: React.FC = () => {
  const account = useReactiveVar(accountVar)
  const nfy = useReactiveVar(nfyVar)

  const WalletMenuItems = (
    <S.StyledMenu>
      <Menu.Item key='1'>
        <a href='http://www.google.com/'>Buy NFY</a>
      </Menu.Item>
      <Menu.Item key='3'>
        <a href='http://www.google.com/'>What is NFY</a>
      </Menu.Item>
    </S.StyledMenu>
  )

  return (
    <S.Container>
      <Dropdown overlay={WalletMenuItems} trigger={['click']}>
        <S.WalletButtonArea>
          <S.Skeleton active loading={nfy === undefined} paragraph={{ rows: 0 }}>
            <S.WalletButton type='button'>{`${nfy && nfy.toLocaleString('en-us')} NFY`}</S.WalletButton>
            <S.WalletIcon>
              <Jazzicon diameter={40} seed={jsNumberForAddress(account)} />
            </S.WalletIcon>
          </S.Skeleton>
        </S.WalletButtonArea>
      </Dropdown>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    min-width: 120px;
    margin-right: 24px;
    margin-left: 12px;

    .ant-skeleton-content .ant-skeleton-title {
      width: 100% !important;
      height: 40px;
      margin-top: 25px !important;
    }

    @media (max-width: ${viewport.xl}) {
      margin-right: 0;
    }
  `,
  WalletButtonArea: styled.div`
    display: flex;
  `,
  WalletButton: styled.button`
    flex: 1;
    width: 100%;
    padding: 0 24px;
    min-width: 120px;
    height: 40px;
    background: ${colors.white1};
    border-radius: 8px;
    border: none;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 24px;
    color: ${colors.gray2};
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.5s;

    &:hover {
      background: ${colors.gray3};
    }
    &:focus {
      border: none;
      outline: none;
    }
  `,
  WalletIcon: styled.div`
    width: 40px;
    height: 40px;
    position: relative;
    left: -16px;

    @media (max-width: ${viewport.xl}) {
      margin-right: -16px;
    }
  `,
  StyledMenu: styled(Menu)`
    margin-top: 8px;
    padding: 8px;
    background: ${colors.white};
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    .ant-dropdown-menu-item {
      &:hover {
        background: ${colors.white};
      }
      & > a {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 22px;

        display: flex;
        align-items: center;

        color: ${colors.gray4};
      }
    }
  `,
  Skeleton: styled(Skeleton)``
}
