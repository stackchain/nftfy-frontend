import { AbiItem } from 'web3-utils'
import erc20Abi from '../abi/erc20.json'
import erc20SharesAbi from '../abi/erc20shares.json'
import erc721Abi from '../abi/erc721.json'
import erc721WrappedAbi from '../abi/erc721wrapped.json'
import nftfyAbi from '../abi/nftfy.json'
import { getConfigByChainId } from '../config'
import { accountVar, chainIdVar } from '../graphql/variables/WalletVariable'
import { code } from '../messages'
import { notifyError } from './NotificationService'
import { coins, units } from './UtilService'
import { initializeWeb3 } from './WalletService'

const { nftfyAddress } = getConfigByChainId(chainIdVar())

export const approveErc20 = async (erc20Address: string, erc20Decimals: number, erc20Amount: string, spenderAddress?: string) => {
  try {
    const web3 = initializeWeb3('metamask')
    const contractErc20 = new web3.eth.Contract(erc20Abi as AbiItem[], erc20Address)
    await contractErc20.methods.approve(spenderAddress || accountVar(), units(erc20Amount, erc20Decimals)).send({ from: accountVar() })
  } catch (error) {
    notifyError(code[5011], error)
  }
}

export const approveErc721 = async (erc721Address: string, erc721TokenId: number) => {
  try {
    const web3 = initializeWeb3('metamask')
    const contractErc721 = new web3.eth.Contract(erc721Abi as AbiItem[], erc721Address)
    await contractErc721.methods.approve(nftfyAddress, erc721TokenId).send({ from: accountVar() })
  } catch (error) {
    notifyError(code[5011], error)
  }
}

export const isApprovedErc721 = async (erc721Address: string, erc721TokenId: number) => {
  try {
    const web3 = initializeWeb3('infura')
    const contractErc721 = new web3.eth.Contract(erc721Abi as AbiItem[], erc721Address)
    const address = await contractErc721.methods.getApproved(erc721TokenId).call()
    return address === nftfyAddress
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}
export const securitizeErc721 = async (
  erc721Address: string,
  erc721Id: number,
  sharesCount: string,
  sharesDecimals: number,
  exitPrice: string,
  paymentTokenAddress: string,
  remnant: boolean
) => {
  try {
    const web3 = initializeWeb3('metamask')
    const contractNftfy = new web3.eth.Contract(nftfyAbi as AbiItem[], nftfyAddress)
    await contractNftfy.methods
      .securitize(erc721Address, erc721Id, sharesCount, sharesDecimals, exitPrice, paymentTokenAddress, remnant)
      .send({ from: accountVar() })
  } catch (error) {
    notifyError(code[5011], error)
  }
}

export const isSecuritizedErc721 = async (erc721Address: string, erc721TokenId: number) => {
  try {
    const web3 = initializeWeb3('infura')
    const contractNftfy = new web3.eth.Contract(nftfyAbi as AbiItem[], nftfyAddress)
    const wrappedAddress = await contractNftfy.methods.wrappers(erc721Address).call()

    if (!wrappedAddress) {
      throw new Error(code[5012])
    }

    const contractWrappedErc721 = new web3.eth.Contract(erc721WrappedAbi as AbiItem[], wrappedAddress)
    const securitized = await contractWrappedErc721.methods.securitized(erc721TokenId).call()

    return !!securitized
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}

export const isRedeemableErc20 = async (erc20Address: string) => {
  try {
    const web3 = initializeWeb3('infura')
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], erc20Address)
    return !(await contractErc20Shares.methods.released().call())
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}

export const isClaimableErc20 = async (erc20Address: string) => {
  try {
    const web3 = initializeWeb3('infura')
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], erc20Address)
    return contractErc20Shares.methods.released().call()
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}

export const claimErc20 = async (erc20Address: string) => {
  try {
    const web3 = initializeWeb3('metamask')
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], erc20Address)
    return contractErc20Shares.methods.claim().send({ from: accountVar() })
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}

export const redeemErc20 = async (erc20Address: string) => {
  const { balancer } = getConfigByChainId(chainIdVar())
  const { eth } = balancer
  try {
    const web3 = initializeWeb3('metamask')
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], erc20Address)

    let paymentToken = await contractErc20Shares.methods.paymentToken().call()
    paymentToken = String(paymentToken) === eth ? null : paymentToken

    const decimals = Number(await contractErc20Shares.methods.decimals().call())
    const redeemAmount = await getAccountRedeemAmount(erc20Address)

    if (!paymentToken) {
      return contractErc20Shares.methods.redeem().send({ from: accountVar(), value: units(redeemAmount, decimals) })
    }

    return contractErc20Shares.methods.redeem().send({ from: accountVar() })
  } catch (error) {
    notifyError(code[5011], error)
    return false
  }
}
export const getAccountRedeemAmount = async (erc20Address: string) => {
  const { balancer } = getConfigByChainId(chainIdVar())
  const { eth } = balancer

  try {
    const web3 = initializeWeb3('metamask')
    const contractErc20Shares = new web3.eth.Contract(erc20SharesAbi as AbiItem[], erc20Address)
    let paymentToken = await contractErc20Shares.methods.paymentToken().call()
    paymentToken = String(paymentToken) === eth ? null : paymentToken

    const decimals = paymentToken ? await contractErc20Shares.methods.decimals().call() : 18

    return coins(await contractErc20Shares.methods.redeemAmountOf(accountVar()).call(), decimals)
  } catch (error) {
    notifyError(code[5011], error)
    return '0'
  }
}
