import { Card } from 'antd'
import React from 'react'
import ft from '../../../assets/ft.svg'
import './FungibleTokensEmpty.scss'

export default function FungibleTokensEmpty() {
  return (
    <Card className='fungible-tokens-empty'>
      <img src={ft} alt='Fungible Token' />
      <p>You need to convert some Non-Fungible Token into Fungible Token</p>
    </Card>
  )
}
