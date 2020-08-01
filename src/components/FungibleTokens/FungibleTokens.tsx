import React, { useState } from 'react'
import FungibleTokensEmpty from './FungibleTokensEmpty/FungibleTokensEmpty'
import FungibleTokensList from './FungibleTokensList/FungibleTokensList'

export default function FungibleTokens() {
  const [ft] = useState<any[]>([])

  if (!ft.length) {
    return <FungibleTokensEmpty />
  }

  return <FungibleTokensList />
}
