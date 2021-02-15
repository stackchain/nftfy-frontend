import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'
import erc20Abi from '../abi/erc20shares.json'
import erc721Abi from '../abi/erc721.json'
import erc721WrappedAbi from '../abi/erc721wrapped.json'
import nftfyAbi from '../abi/nftfy.json'
import { addressesERC721Mainnet, addressNftfyMainnet } from '../contracts/mainnet'
import { addressesERC721Rinkeby, addressNftfyRinkeby } from '../contracts/rinkeby'
import { accountVar, chainIdVar } from '../graphql/variables/WalletVariable'
import { code } from '../messages'
import { notifyError } from './NotificationService'

declare const window: { ethereum: provider & { enable: () => void; request: ({ method }: { method: string }) => void } }

export const nftfyAddress = chainIdVar() === 1 ? addressNftfyMainnet : addressNftfyRinkeby
export const erc721Addresses = chainIdVar() === 1 ? addressesERC721Mainnet : addressesERC721Rinkeby

export const initializeWeb3 = () => {
  window.ethereum.request({ method: 'eth_requestAccounts' })
  return new Web3(window.ethereum)
}

export const approveErc20 = async (erc20Address: string, spenderAddress: string, erc20Decimals: number, erc20Amount: number) => {
  try {
    const web3 = initializeWeb3()
    const contractErc20 = new web3.eth.Contract(erc20Abi as AbiItem[], erc20Address)
    await contractErc20.methods
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
    await contractErc721.methods
      .approve(nftfyAddress, erc721AddressId)
      .send({ from: accountVar() })
      .once('error', (error: Error) => notifyError(code[5010], error))
  } catch (error) {
    notifyError(code[5011], error)
  }
}

export const isApprovedErc721 = async (erc721Address: string, erc721AddressId: number) => {
  try {
    const web3 = initializeWeb3()
    const contractErc721 = new web3.eth.Contract(erc721Abi as AbiItem[], erc721Address)
    const address = await contractErc721.methods.getApproved(erc721AddressId).call()
    return address === nftfyAddress
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}

export const securitizeErc721 = async (
  erc721tAddress: string,
  erc721Id: number,
  sharesCount: string,
  sharesDecimals: number,
  exitPrice: string,
  paymentTokenAddress: string,
  remnant: boolean
) => {
  try {
    const web3 = initializeWeb3()
    const contractNftfy = new web3.eth.Contract(nftfyAbi as AbiItem[], nftfyAddress)
    contractNftfy.methods
      .securitize(erc721tAddress, erc721Id, sharesCount, sharesDecimals, exitPrice, paymentTokenAddress, remnant)
      .send({ from: accountVar() })
      .once('error', (error: Error) => {
        notifyError(code[5010], error)
      })
  } catch (error) {
    notifyError(code[5011], error)
  }
}

export const isSecuritizedErc721 = async (tokenAddress: string, tokenId: number) => {
  try {
    const web3 = initializeWeb3()
    const contractNftfy = new web3.eth.Contract(nftfyAbi as AbiItem[], nftfyAddress)
    const wrappedAddress = await contractNftfy.methods.wrappers(tokenAddress).call()

    if (!wrappedAddress) {
      throw new Error(code[5012])
    }

    const contractWrappedErc721 = new web3.eth.Contract(erc721WrappedAbi as AbiItem[], wrappedAddress)
    const securitized = await contractWrappedErc721.methods.securitized(tokenId).call()

    return !!securitized
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}
