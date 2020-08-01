import React, { useState } from 'react'
import NonFungibleTokensEmpty from './NonFungibleTokensEmpty/NonFungibleTokensEmpty'
import NonFungibleTokensList from './NonFungibleTokensList/NonFungibleTokensList'

export default function NonFungibleTokens() {
  const [nft] = useState<any[]>([])

  if (!nft.length) {
    return <NonFungibleTokensEmpty />
  }

  return <NonFungibleTokensList />
}
