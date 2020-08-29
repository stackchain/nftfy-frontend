import { Card } from 'antd'
import React from 'react'
import ft from '../../../assets/ft.svg'
import Loading from '../../shared/layout/Loading/Loading'
import './FungibleTokensEmpty.scss'

interface Props {
  loading: boolean
}

export default function FungibleTokensEmpty({ loading }: Props) {
  return (
    <Card className='fungible-tokens-empty'>
      <img src={ft} alt='Fungible Token' />
      <p>You need to convert some Non-Fungible Token into Fungible Token</p>
      {loading && <Loading />}
    </Card>
  )
}
