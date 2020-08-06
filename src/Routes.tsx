import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ContractSecuritization from './screens/ContractSecuritization/ContractSecuritization'
import Home from './screens/Home/Home'
import LiquidityPoll from './screens/LiquidityPool/LiquidityPool'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/contract/edit' component={ContractSecuritization} />
        <Route path='/contract/redeem' component={ContractSecuritization} />
        <Route path='/contract/finalized' component={ContractSecuritization} />
        <Route path='/liquidity-pool' component={LiquidityPoll} />
        <Route path='*' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
