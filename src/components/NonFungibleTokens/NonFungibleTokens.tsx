import React, { useCallback, useContext, useEffect, useState } from 'react'
import { WalletContext } from '../../context/WalletContext'
import { ERC721Item } from '../../services/api'
import NonFungibleTokensEmpty from './NonFungibleTokensEmpty/NonFungibleTokensEmpty'
import NonFungibleTokensList from './NonFungibleTokensList/NonFungibleTokensList'

export default function NonFungibleTokens() {
  const { wallet, accounts, accountIndex } = useContext(WalletContext)

  const [nft, setNft] = useState<ERC721Item[]>([])

  const loadNft = useCallback(async () => {
    if (wallet) {
      const nfts = await wallet.listAccountItems(accounts[accountIndex], 9, 10)
      setNft(nfts.items)
    }
  }, [wallet, accounts, accountIndex])

  useEffect(() => {
    loadNft()
  }, [loadNft])

  if (!nft.length) {
    return <NonFungibleTokensEmpty />
  }

  return <NonFungibleTokensList />
}
