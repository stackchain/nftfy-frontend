import { ApolloProvider, useReactiveVar } from '@apollo/client'
import * as Sentry from '@sentry/react'
import 'antd/dist/antd.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { graphQlClient } from '../graphql/ClientGraphql'
import { accountVar, chainIdVar, connectWalletModalVar } from '../graphql/variables/WalletVariable'
import FallbackPage from '../pages/FallbackPage'
import Routes from '../routes/Routes'
import { autoConnect, listenWalletEvents } from '../services/WalletService'
import '../styles/fonts.css'
import '../styles/reset.css'
import { ConnectWalletModal } from './wallet/ConnectWalletModal'

export default function App() {
  const account = useReactiveVar(accountVar)
  const chainId = useReactiveVar(chainIdVar)
  const connectWalletModal = useReactiveVar(connectWalletModalVar)

  useEffect(() => {
    autoConnect()
    listenWalletEvents()
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
