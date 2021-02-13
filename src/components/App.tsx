import { ApolloProvider, useReactiveVar } from '@apollo/client'
import * as Sentry from '@sentry/react'
import 'antd/dist/antd.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { graphQlClient } from '../graphql/ClientGraphql'
import { accountVar, chainIdVar, connectWalletModalVar } from '../graphql/variables/WalletVariable'
import FallbackPage from '../pages/FallbackPage'
import Routes from '../routes/Routes'
import { securitize } from '../services/NftfyService'
import { walletAutoConnect } from '../services/WalletService'
import '../styles/fonts.css'
import '../styles/reset.css'
import { ConnectWalletModal } from './wallet/ConnectWalletModal'

export default function App() {
  const account = useReactiveVar(accountVar)
  const chainId = useReactiveVar(chainIdVar)
  const connectWalletModal = useReactiveVar(connectWalletModalVar)

  useEffect(() => {
    walletAutoConnect()
    securitize('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3', 44, 1000, 0, 1, '0x0000000000000000000000000000000000000000', false)
  }, [])

  return (
    <Sentry.ErrorBoundary fallback={FallbackPage}>
      <ApolloProvider client={graphQlClient}>
        <Router>
          <Routes />
          {!account && !chainId && connectWalletModal && <ConnectWalletModal />}
        </Router>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}
