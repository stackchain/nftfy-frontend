import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LazyLoading } from '../components/shared/loading'

export const Marketplace = lazy(() => import('../pages/MarketplacePage'))

export default function Routes() {
  return (
    <Suspense fallback={<LazyLoading />}>
      <Switch>
        <Route path='/' exact component={Marketplace} />
        <Redirect exact from='**' to='/' />
      </Switch>
    </Suspense>
  )
}
