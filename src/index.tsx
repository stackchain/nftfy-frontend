import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn: 'https://5f01256df48f493799286d68b54cc0ed@o501737.ingest.sentry.io/5583250',
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: 'development'
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.register()
