import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LazyLoading } from '../components/shared/loading'

export const IntroPage = lazy(() => import('../pages/IntroPage'))
export const MarketplacePage = lazy(() => import('../pages/MarketplacePage'))
export const FallbackPage = lazy(() => import('../pages/FallbackPage'))

export default function Routes() {
  return (
    <Suspense fallback={<LazyLoading />}>
      <Switch>
        <Route path='/' exact component={IntroPage} />
        <Route path='/marketplace/:page' exact component={MarketplacePage} />
        <Route path='/securitize' exact component={FallbackPage} />
        <Route path='/portfolio' exact component={FallbackPage} />
        <Route path='/tutorial' exact component={FallbackPage} />
        <Route path='/terms' exact component={FallbackPage} />
        <Route path='/privacy-policy' exact component={FallbackPage} />
        <Redirect exact from='**' to='/' />
      </Switch>
    </Suspense>
  )
}
