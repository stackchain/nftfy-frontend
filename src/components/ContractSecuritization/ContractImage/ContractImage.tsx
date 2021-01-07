import { Image } from 'antd'
import 'antd/dist/antd.css'
import React, { useState } from 'react'
import nftImage from '../../../assets/nft.svg'
import './ContractImage.scss'

interface Props {
  name: string
  meta: string
  description: string
  src: string
}

export default function ContractImage({ name, meta, description, src }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  function setVisible() {
    setIsVisible(!isVisible)
  }

  return (
    <div className='contract-image-item'>
      <div>
        <Image width={180} src={src.includes('ipfs://') ? nftImage : src || nftImage} alt={name} onPreviewClose={setVisible} />
        {isVisible && <div className='title-image-nft'>{name}</div>}
        <div className='contract-name'>{name}</div>
        <div className='contract-meta'>{meta}</div>
        <div className='contract-description'>{description}</div>
      </div>
    </div>
  )
}
