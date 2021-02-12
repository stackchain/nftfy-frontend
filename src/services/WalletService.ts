import detectEthereumProvider from '@metamask/detect-provider'
import { accountVar, chainIdVar, connectWalletModalVar, setAccount, setChainId } from '../graphql/variables/WalletVariable'
import { code } from '../messages'
import { notifyError, notifyWarning } from './NotificationService'

export const initializeMetamaskWallet = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    startApp(provider)
  } else {
    notifyError(code[5003])
  }
}

const startApp = async (provider: unknown) => {
  if (provider !== window.ethereum) {
    notifyError(code[5002])
  }
  await connect()
}

const connect = async () => {
  try {
    if (window.ethereum) {
      const accounts = await (window.ethereum as { request: (args: { method: string }) => Promise<string[]> }).request({
        method: 'eth_requestAccounts'
      })
      if (accounts[0]) {
        setAccount(accounts[0])
      } else {
        notifyError(code[5004])
      }

      const chainId = await (window.ethereum as { request: (args: { method: string }) => Promise<string> }).request({
        method: 'eth_chainId'
      })

      if (chainId) {
        setChainId(parseInt(chainId, 16))
      } else {
        notifyError(code[5006])
      }
    } else {
      notifyWarning(code[5004])
    }
  } catch (error) {
    if (error.code === 4001) {
      notifyError(code[5001], error)
    }
  }
}

export const walletAutoConnect = async () => {
  const account = window.localStorage.getItem('account')
  account && setAccount(account)

  const chainId = Number(window.localStorage.getItem('chainId'))
  chainId && setChainId(chainId)
  if (account && chainId) {
    const provider = await detectEthereumProvider()
    startApp(provider)
  }

  walletListenEvents()
}

export const walletListenEvents = () => {
  window.ethereum &&
    (window.ethereum as { on: (eventKey: string, callback: (accounts: string[]) => void) => void }).on('accountsChanged', handleAccounts)

  window.ethereum &&
    (window.ethereum as { on: (eventKey: string, callback: (chainId: string) => void) => void }).on('chainChanged', handleChainChanged)
}

const handleAccounts = (accounts: string[]) => {
  if (accounts.length > 0) {
    const currentAccount = accountVar()
    currentAccount && accounts[0] !== currentAccount && notifyWarning(code[5008])
    setAccount(accounts[0])
  } else {
    notifyWarning(code[5007])
    setAccount(undefined)
    setChainId(undefined)
    connectWalletModalVar(undefined)
  }
}

const handleChainChanged = (chainId: string) => {
  if (chainId) {
    const currentChainId = chainIdVar()
    parseInt(chainId, 16) !== currentChainId && notifyWarning(code[5009])
    setChainId(parseInt(chainId, 16))
  }
}
