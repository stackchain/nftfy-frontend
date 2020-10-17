import React from 'react'
import nftImage from '../../../assets/nft.svg'
import './ContractImage.scss'

interface Props {
  name: string
  meta: string
  description: string
  src: string
}

export default function ContractImage({ name, meta, description, src }: Props) {
  return (
    <div className='contract-image-item'>
      <div>
        {console.log('src', src)}
        <img src={src.includes('ipfs://') ? nftImage : src || nftImage} alt={name} />
        <div className='contract-name'>{name}</div>
        <div className='contract-meta'>{meta}</div>
        <div className='contract-description'>{description}</div>
      </div>
    </div>
  )
}
