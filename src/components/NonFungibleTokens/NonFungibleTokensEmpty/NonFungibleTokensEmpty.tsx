import { Card } from 'antd'
import React, { useContext } from 'react'
import nft from '../../../assets/nft.svg'
import { WalletContext } from '../../../context/WalletContext'
import Loading from '../../shared/layout/Loading/Loading'
import AddNonFungibleTokens from '../AddNonFungibleTokens/AddNonFungibleTokens'
import './NonFungibleTokensEmpty.scss'

interface Props {
  loading: boolean
}

export default function NonFungibleTokensEmpty({ loading }: Props) {
  const { accounts, accountIndex } = useContext(WalletContext)

  return (
    <Card className='non-fungible-tokens-empty'>
      {loading && <Loading />}
      <img src={nft} alt='Non Fungible Token' />
      {!accounts[accountIndex] ? (
        <p>Connect your Ethereum Wallet to set Non-Fungible Tokens</p>
      ) : (
          <p>Input your Non Fungible Token Hash on the form</p>
        )}
      <AddNonFungibleTokens />
    </Card>
  )
}
