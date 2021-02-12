import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import erc20Abi from '../abi/erc20shares.json'
import nftfyAbi from '../abi/nftfy.json'
import { addressNftfyMainnet } from '../contracts/mainnet'
import { addressNfyRinkeby } from '../contracts/rinkeby'
import { accountVar, chainIdVar } from '../graphql/variables/WalletVariable'
import { code } from '../messages'
import { notifyError } from './NotificationService'

declare const window: { ethereum: provider & { enable: () => void } }

const nftfyAddress = chainIdVar() === 1 ? addressNftfyMainnet : addressNfyRinkeby

export const initializeWeb3 = () => {
  window.ethereum.enable()
  return new Web3(window.ethereum)
}

export const approveErc20 = (tokenAddress: string, params: { spenderAddress: string; tokenDecimals: number; tokenAmount: number }) => {
  const { spenderAddress, tokenDecimals, tokenAmount } = params
  try {
    const web3 = initializeWeb3()
    const contractErc20 = new web3.eth.Contract(erc20Abi as AbiItem[], tokenAddress)
    contractErc20.methods
      .approve(spenderAddress, String(tokenAmount * 10 ** tokenDecimals))
      .send({ from: accountVar() })
      .once('error', (error: Error) => notifyError(code[5010], error))
  } catch (error) {
    notifyError(code[5011], error)
  }
}

export const securitize = (params: {
  targetAddress: string
  tokenId: number
  sharesCount: number
  tokenDecimals: number
  exitPrice: number
  paymentTokenAddress: string
  remnant: boolean
}) => {
  const { targetAddress, tokenId, sharesCount, tokenDecimals, exitPrice, paymentTokenAddress, remnant } = params

  console.log(targetAddress, tokenId, sharesCount, tokenDecimals, exitPrice, paymentTokenAddress, remnant)
  try {
    const web3 = initializeWeb3()
    const contractNftfy = new web3.eth.Contract(nftfyAbi as AbiItem[], nftfyAddress)
    contractNftfy.methods
      .securitize(targetAddress, tokenId, sharesCount, tokenDecimals, exitPrice * 10 ** tokenDecimals, paymentTokenAddress, remnant)
      .send({ from: accountVar() })
      .once('error', (error: Error) => {
        notifyError(code[5010], error)
      })
  } catch (error) {
    console.error(error)
    notifyError(code[5011], error)
  }
}
