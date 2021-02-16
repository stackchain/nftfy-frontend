import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LazyLoading } from '../components/shared/loading'

const IntroPage = lazy(() => import('../pages/IntroPage'))
const MarketplacePage = lazy(() => import('../pages/MarketplacePage'))
const MarketplaceDetailsPage = lazy(() => import('../pages/MarketplaceDetailsPage'))
const PortfolioPage = lazy(() => import('../pages/PortfolioPage'))
const SecuritizePage = lazy(() => import('../pages/SecuritizePage'))
const FallbackPage = lazy(() => import('../pages/FallbackPage'))

export default function Routes() {
  return (
    <Suspense fallback={<LazyLoading />}>
      <Switch>
        <Route path='/' exact component={IntroPage} />
        <Route path='/marketplace' exact component={MarketplacePage} />
        <Route path='/marketplace/:address' exact component={MarketplaceDetailsPage} />
        <Route path='/securitize' exact component={SecuritizePage} />
        <Route path='/portfolio' exact component={PortfolioPage} />
        <Route path='/tutorial' exact component={FallbackPage} />
        <Route path='/terms' exact component={FallbackPage} />
        <Route path='/privacy-policy' exact component={FallbackPage} />
        <Redirect exact from='**' to='/' />
      </Switch>
    </Suspense>
  )
}
