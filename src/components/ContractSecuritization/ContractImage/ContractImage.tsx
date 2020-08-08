import React from 'react'
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
        <img src={src} alt={name} />
        <div className='contract-name'>{name}</div>
        <div className='contract-meta'>{meta}</div>
        <div className='contract-description'>{description}</div>
      </div>
    </div>
  )
}
