import React from 'react'
import styled from 'styled-components'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface TitleNftDetailsProps {
  name: string
  symbol: string
  created?: string
}

export const TitleNftDetails: React.FC<TitleNftDetailsProps> = ({ name, symbol }: TitleNftDetailsProps) => {
  return (
    <S.Content>
      <h1>
        {name}
        <small>{symbol}</small>
      </h1>
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

    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 38px;
      line-height: 40px;
      margin-bottom: 4px;
      color: ${colors.gray2};

      small {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: ${colors.gray1};
        margin-left: 8px;
        font-weight: 600;
      }
    }

    @media (max-width: ${viewport.sm}) {
      h1 {
        line-height: 38px;
      }
    }
  `
}
