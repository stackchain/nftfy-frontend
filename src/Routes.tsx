import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ContractSecuritization from './screens/ContractSecuritization/ContractSecuritization'
import Home from './screens/Home/Home'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dapp' exact component={Home} />
        <Route path='/dapp/contract/securitize/:contract/:id' component={ContractSecuritization} />
        <Route path='/dapp/contract/detail/:id' component={ContractSecuritization} />
        <Route path='*' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
