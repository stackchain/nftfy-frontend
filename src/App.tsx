import React from 'react'
import WalletContextWrapper from './context/WalletContext'
import Routes from './Routes'

function App() {
  return (
    <WalletContextWrapper>
      <Routes />
    </WalletContextWrapper>
  )
}

export default App
