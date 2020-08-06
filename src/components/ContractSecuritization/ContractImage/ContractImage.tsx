import React from 'react'
import './ContractImage.scss'

export default function ContractImage() {
  return (
    <div className='contract-image-item'>
      <div>
        <img src='https://dao.decentraland.org/static/what_is-b6cc98a75c6c5af46dadf7e9b853e13a.png' alt='Descentraland' />
        <div className='contract-name'>Descentraland</div>
        <div className='contract-meta'>Name NFT</div>
      </div>
    </div>
  )
}
