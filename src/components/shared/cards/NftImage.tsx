import React from 'react'
import styled from 'styled-components'
import notFound from '../../../assets/notfound.svg'
import { colors, viewport } from '../../../styles/variables'
import { ContractImage } from '../ContractImage'

export interface NftImageProps {
  image: string
  name: string
}

export const NftImage: React.FC<NftImageProps> = ({ image, name }: NftImageProps) => {
  return (
    <S.Content>
      <S.Card className={image === '' ? 'bg-fail' : ''}>
        <ContractImage src={image || notFound} name={name} large />
      </S.Card>
    </S.Content>
  )
}

const S = {
  Content: styled.div`
    .bg-fail {
      background: ${colors.white2};
    }
  `,
  Card: styled.div`
    width: 100%;
    max-width: 624px;
    height: 552px;
    background: ${colors.white};
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;

    @media (max-width: ${viewport.md}) {
      height: auto;
      min-height: 304px;
      padding: 14px;
    }
  `
}
