import { Image, ImageProps } from 'antd'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { viewport } from '../../styles/variables'

export interface ContractImageProps {
  className?: string
  name: string
  src: string
  large: boolean
}

export const ContractImage: React.FC<ContractImageProps> = ({ className, name, large, src }: ContractImageProps) => {
  const [isVisible, setIsVisible] = useState(false)

  function setVisible() {
    setIsVisible(!isVisible)
  }
  return (
    <S.ContractImage className={className}>
      <S.Image src={src} alt={name} onPreviewClose={setVisible} className={large ? 'large' : 'small'} />
      {isVisible && <div className='title-image-nft'>{name}</div>}
    </S.ContractImage>
  )
}
export const S = {
  ContractImage: styled.div`
    display: flex;
    justify-content: center;
    .title-image-nft {
      position: fixed;
      bottom: 20px;
      left: 20px;
      color: black;
      font-weight: 500;
      font-size: 1.5rem;
      z-index: 999999;
    }
    .ant-image-mask-info {
      text-align: center;
      @media (max-width: ${viewport.md}) {
        display: none;
      }
    }
  `,
  Image: styled(Image)<ImageProps>`
    ${props =>
      props.className === 'large'
        ? css`
            width: 100%;
            height: auto;
            max-width: 575px;
            max-height: 504px;
            object-fit: cover;
            border-radius: 4px;
          `
        : css`
            width: 48px;
            height: 48px;
            border-radius: 8px;
          `}
  `
}
