import Web3 from 'web3'

declare global {
  interface Window {
    ethereum: any
    web3: Web3
  }
}

export const initializeWallet = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()
    return true
  }
  return false
}
