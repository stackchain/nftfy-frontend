import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface TitleNftDetailsProps {
  name: string
  created: string
}

export const TitleNftDetails: React.FC<TitleNftDetailsProps> = ({ name, created }: TitleNftDetailsProps) => {
  return (
    <S.Content>
      <small>
        Created by 55786B -
        <Button type='link' danger>
          {created}
        </Button>
      </small>
      <h1>{name}</h1>
    </S.Content>
  )
}
const S = {
  Content: styled.div`
    max-width: 575px;
    font-family: ${fonts.montserrat};
    .ant-btn-link {
      padding-left: 5px;
    }
    small {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: ${colors.gray1};
    }

    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 38px;
      line-height: 46px;
      color: ${colors.gray2};
    }

    @media (max-width: ${viewport.sm}) {
      h1 {
        line-height: 38px;
      }
    }
  `
}
