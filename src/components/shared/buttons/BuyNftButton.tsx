import React from 'react'
import styled from 'styled-components'
import { colors, fonts } from '../../../styles/variables'

export interface BuyNftButtonProps {
  url: string
}
export const BuyNftButton: React.FC<BuyNftButtonProps> = () => {
  return <S.Button>Buy NFT</S.Button>
}
const S = {
  Button: styled.button`
    flex: 1;
    font-family: ${fonts.montserrat};
    max-width: 131px;
    height: 40px;
    max-height: 40px;
    border: 1px solid ${colors.gray5};
    box-sizing: border-box;
    border-radius: 8px;
    background: ${colors.white};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray2};
    padding: 0px 20px;

    &:hover {
      background: ${colors.gray3};
      cursor: pointer;
      border: none;
    }
  `
}
