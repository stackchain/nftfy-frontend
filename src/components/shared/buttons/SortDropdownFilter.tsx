import { Dropdown, Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import filterIcon from '../../../assets/filterIcon.svg'
import { colors } from '../../../styles/variables'

export interface SortDropdownFilterProps {
  className?: string
}

export const SortDropdownFilter: React.FC<SortDropdownFilterProps> = ({ className }: SortDropdownFilterProps) => {
  const SortMenuItems = (
    <S.StyledMenu>
      <Menu.Item key='0'>
        <span>Recently added</span>
      </Menu.Item>
      <Menu.Item key='1'>
        <span>Cheapest</span>
      </Menu.Item>
      <Menu.Item key='3'>
        <span>Highest price</span>
      </Menu.Item>
      <Menu.Item key='4'>
        <span>Best sellers</span>
      </Menu.Item>
    </S.StyledMenu>
  )
  return (
    <Dropdown overlay={SortMenuItems} trigger={['click']}>
      <S.SortButton className={className} type='button'>
        Sort by
        <img src={filterIcon} alt='wallet token' />
      </S.SortButton>
    </Dropdown>
  )
}

const S = {
  SortButton: styled.button`
    width: 136px;
    height: 32px;
    padding: 8px 16px;
    background: ${colors.white};
    border-radius: 8px;
    border: 1px solid ${colors.gray3};
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 22px;
    color: ${colors.gray5};
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.5s;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
    &:hover {
      background: ${colors.gray3};
    }
    &:focus {
      outline: none;
    }
  `,
  StyledMenu: styled(Menu)`
    width: 192px;
    margin-top: 8px;
    padding: 8px;
    background: ${colors.white};
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    .ant-dropdown-menu-item {
      height: 40px;
      &:hover {
        background: ${colors.white};
      }
      & > span {
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
  `
}
