import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LazyLoading } from '../components/shared/loading'
import FallbackPage from '../pages/FallbackPage'
import IntroPage from '../pages/IntroPage'
import MarketplaceDetailsPage from '../pages/MarketplaceDetailsPage'
import MarketplacePage from '../pages/MarketplacePage'
import PortfolioPage from '../pages/PortfolioPage'
import SecuritizePage from '../pages/SecuritizePage'

export default function Routes() {
  return (
    <Suspense fallback={<LazyLoading />}>
      <Switch>
        <Route path='/' exact component={IntroPage} />
        <Route path='/marketplace' exact component={MarketplacePage} />
        <Route path='/marketplace/:address' exact component={MarketplaceDetailsPage} />
        <Route path='/securitize' exact component={SecuritizePage} />
        <Route path='/securitize/:address/:tokenId' exact component={FallbackPage} />
        <Route path='/portfolio' exact component={PortfolioPage} />
        <Route path='/tutorial' exact component={FallbackPage} />
        <Route path='/terms' exact component={FallbackPage} />
        <Route path='/privacy-policy' exact component={FallbackPage} />
        <Redirect exact from='**' to='/' />
      </Switch>
    </Suspense>
  )
}
