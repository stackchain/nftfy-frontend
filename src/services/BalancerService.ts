import { SOR } from '@balancer-labs/sor'
import { Swap } from '@balancer-labs/sor/dist/types'
import { InfuraProvider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import exchangeProxyAbi from '../abi/exchangeProxy.json'
import { getConfigByChainId } from '../config'
import { accountVar, chainIdVar } from '../graphql/variables/WalletVariable'
import { code } from '../messages'
import { notifyError } from './NotificationService'
import { scale } from './UtilService'
import { initializeWeb3 } from './WalletService'

let sor: SOR | undefined

export async function balancerSyncPools() {
  const { id, balancer, name } = getConfigByChainId(chainIdVar())
  const { subgraphBackupUrl } = balancer
  const provider = new InfuraProvider(name, process.env.REACT_APP_INFURA_KEY)
  const gasPrice = new BigNumber(process.env.REACT_APP_GAS_PRICE || 100000000000)
  const maxPools = 4

  const poolsUrl = `${subgraphBackupUrl}?timestamp=${Date.now()}`
  sor = new SOR(provider, gasPrice, maxPools, id, poolsUrl)
  await sor.fetchPools()
}

export async function balancerAssetQuote(
  assetInAddress: string,
  assetInDecimals: number,
  assetOutAddress: string,
  assetOutDecimals: number,
  swapType: 'swapExactIn' | 'swapExactOut',
  amount: string
): Promise<{ exitAmount: string; slippage: number; tradeSwaps: Swap[][] } | null> {
  const { balancer } = getConfigByChainId(chainIdVar())
  const { precision } = balancer

  if (sor) {
    await sor.setCostOutputToken(assetOutAddress)

    if (swapType === 'swapExactIn' && sor) {
      const assetInAmountRaw = new BigNumber(amount)
      const assetInAmount = scale(assetInAmountRaw, assetInDecimals)

      const [tradeSwaps, tradeAmount, spotPrice] = await sor.getSwaps(assetInAddress, assetOutAddress, swapType, assetInAmount)

      const assetOutAmountRaw = scale(tradeAmount, -assetOutDecimals)
      const assetOutPrecision = precision

      const exitAmount = assetOutAmountRaw.toFixed(assetOutPrecision, BigNumber.ROUND_DOWN)
      let slippage = 0

      if (tradeSwaps.length > 0) {
        const price = assetInAmount.div(tradeAmount).times('1e18')
        const slippageNumber = price.div(spotPrice).minus(1)
        slippage = slippageNumber.isNegative() ? 0.00001 : slippageNumber.toNumber()
      }

      // eslint-disable-next-line no-console
      console.log('swapExactIn', exitAmount, slippage, tradeSwaps)
      return { exitAmount, slippage, tradeSwaps }
    }
    if (swapType === 'swapExactOut' && sor) {
      const assetOutAmountRaw = new BigNumber(amount)
      const assetOutAmount = scale(assetOutAmountRaw, assetOutDecimals)

      const [tradeSwaps, tradeAmount, spotPrice] = await sor.getSwaps(assetInAddress, assetOutAddress, swapType, assetOutAmount)

      const assetInAmountRaw = scale(tradeAmount, -assetInDecimals)
      const assetInPrecision = precision

      const exitAmount = assetInAmountRaw.toFixed(assetInPrecision, BigNumber.ROUND_UP)
      let slippage = 0

      if (tradeSwaps.length > 0) {
        slippage = 0
      } else {
        const price = tradeAmount.div(assetOutAmount).times('1e18')
        const slippageNumber = price.div(spotPrice).minus(1)
        slippage = slippageNumber.isNegative() ? 0.00001 : slippageNumber.toNumber()
      }

      // eslint-disable-next-line no-console
      console.log('swapExactOut', exitAmount, slippage, tradeSwaps)
      return { exitAmount, slippage, tradeSwaps }
    }
  }

  return null
}

export async function balancerSwapIn(
  assetInAddress: string,
  assetOutAddress: string,
  assetInAmount: string,
  assetOutAmount: string,
  tradeSwaps: Swap[][]
) {
  try {
    const web3 = initializeWeb3('metamask')
    const { balancer } = getConfigByChainId(chainIdVar())

    const slippageBufferRate = 0.005
    const assetOutAmountMin = new BigNumber(assetOutAmount).div(1 + slippageBufferRate).integerValue(BigNumber.ROUND_DOWN)

    const contractExchangeProxy = new web3.eth.Contract(exchangeProxyAbi as AbiItem[], balancer.addresses.exchangeProxy)
    contractExchangeProxy.methods
      .multihopBatchSwapExactIn(
        '0',
        tradeSwaps,
        assetInAddress,
        assetOutAddress,
        new BigNumber(assetInAmount).toString(),
        assetOutAmountMin.toString()
      )
      .send({ from: accountVar() })
  } catch (error) {
    notifyError(code[5011], error)
  }
}
