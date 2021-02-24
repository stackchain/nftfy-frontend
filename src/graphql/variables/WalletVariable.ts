import { makeVar } from '@apollo/client'

export const accountVar = makeVar<string | undefined>(undefined)
export const chainIdVar = makeVar<number>(4)
export const nfyVar = makeVar<number | undefined>(undefined)
export const connectWalletModalVar = makeVar<boolean>(false)

export const setAccount = (account: string | undefined) => {
  accountVar(account)
  account ? window.localStorage.setItem('account', account) : window.localStorage.removeItem('account')
}
export const setChainId = (chainId: number | undefined) => {
  chainIdVar(chainId)
  chainId ? window.localStorage.setItem('chainId', String(chainId)) : window.localStorage.removeItem('chainId')
}
