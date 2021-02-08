import { ApolloProvider, useReactiveVar } from '@apollo/client'
import * as Sentry from '@sentry/react'
import 'antd/dist/antd.css'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { graphQlClient } from '../graphql/ClientGraphql'
import { connectWalletModalVar } from '../graphql/variables/GlobalVariables'
import FallbackPage from '../pages/FallbackPage'
import Routes from '../routes/Routes'
import '../styles/fonts.css'
import '../styles/reset.css'
import { ConnectWalletModal } from './wallet/ConnectWalletModal'

export default function App() {
  const connectWalletModal = useReactiveVar(connectWalletModalVar)
  return (
    <Sentry.ErrorBoundary fallback={FallbackPage}>
      <ApolloProvider client={graphQlClient}>
        <Router>
          <Routes />
          {connectWalletModal && <ConnectWalletModal />}
        </Router>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}
