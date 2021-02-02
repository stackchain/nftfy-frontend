import { Pagination } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../styles/variables'

export interface PaginationButtonProps {
  className?: string
  total: number
}
export const PaginationButton: React.FC<PaginationButtonProps> = ({ className, total }: PaginationButtonProps) => {
  return <S.Pagination className={className} size='small' total={total} />
}

export const S = {
  Pagination: styled(Pagination)`
    height: 32px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.gray2};

    li {
      width: 32px !important;
      height: 32px !important;
      border-radius: 8px;
      margin: 0px 8px !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    li:first-child {
      display: none;
    }
    li:last-child {
      display: none;
    }

    li.ant-pagination-item.ant-pagination-item-active {
      background: ${colors.gray3};
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
      border: 1px solid ${colors.gray3};
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-pagination-item a,
    .ant-pagination-item-active a {
      color: ${colors.gray2};
      &:hover,
      &:link,
      &:focus {
        color: ${colors.gray2};
      }

      &:hover {
        color: ${colors.gray1};
      }
    }
  `
}
