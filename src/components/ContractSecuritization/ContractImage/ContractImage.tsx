import React from 'react'
import ft from '../../../assets/ft.svg'
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
        <img src={src.split('https://cors-anywhere.herokuapp.com/')[1] || src || ft} alt={name} />
        <div className='contract-name'>{name}</div>
        <div className='contract-meta'>{meta}</div>
        <div className='contract-description'>{description}</div>
      </div>
    </div>
  )
}
