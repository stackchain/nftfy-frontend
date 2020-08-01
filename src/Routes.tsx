import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './screens/Home'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path='/about'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
