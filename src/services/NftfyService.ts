import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import erc20Abi from '../abi/erc20shares.json'
import erc721Abi from '../abi/erc721.json'
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

export const approveErc20 = (erc20Address: string, spenderAddress: string, erc20Decimals: number, erc20Amount: number) => {
  try {
    const web3 = initializeWeb3()
    const contractErc20 = new web3.eth.Contract(erc20Abi as AbiItem[], erc20Address)
    contractErc20.methods
      .approve(spenderAddress, String(erc20Amount * 10 ** erc20Decimals))
      .send({ from: accountVar() })
      .once('error', (error: Error) => notifyError(code[5010], error))
  } catch (error) {
    notifyError(code[5011], error)
  }
}
export const approveErc721 = async (erc721Address: string, erc721AddressId: number) => {
  try {
    const web3 = initializeWeb3()
    const contractErc721 = new web3.eth.Contract(erc721Abi as AbiItem[], erc721Address)
    contractErc721.methods
      .approve(nftfyAddress, erc721AddressId)
      .send({ from: accountVar() })
      .once('error', (error: Error) => notifyError(code[5010], error))
  } catch (error) {
    notifyError(code[5011], error)
  }
}

export const securitize = async (
  erc721tAddress: string,
  erc721Id: number,
  sharesCount: number,
  sharesDecimals: number,
  exitPrice: number,
  paymentTokenAddress: string,
  remnant: boolean
) => {
  try {
    const web3 = initializeWeb3()
    await approveErc721(erc721tAddress, erc721Id)
    const contractNftfy = new web3.eth.Contract(nftfyAbi as AbiItem[], nftfyAddress)
    contractNftfy.methods
      .securitize(erc721tAddress, erc721Id, sharesCount, sharesDecimals, exitPrice * 10 ** sharesDecimals, paymentTokenAddress, remnant)
      .send({ from: accountVar() })
      .once('error', (error: Error) => {
        notifyError(code[5010], error)
      })
  } catch (error) {
    notifyError(code[5011], error)
  }
}
