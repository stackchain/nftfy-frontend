import { ApolloProvider } from '@apollo/client'
import * as Sentry from '@sentry/react'
import 'antd/dist/antd.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { graphQlClient } from '../graphql/ClientGraphql'
import FallbackPage from '../pages/FallbackPage'
import Routes from '../routes/Routes'

export default function App() {
  return (
    <Sentry.ErrorBoundary fallback={FallbackPage}>
      <ApolloProvider client={graphQlClient}>
        <Router>
          <Routes />
        </Router>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}
