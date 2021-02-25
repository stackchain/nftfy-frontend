import { SOR } from '@balancer-labs/sor'
import { InfuraProvider } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { getConfigByChainId } from '../config'
import { chainIdVar } from '../graphql/variables/WalletVariable'
import { scale } from './UtilService'

let sor: SOR | undefined

export async function syncPools() {
  const { id, balancer, name } = getConfigByChainId(chainIdVar())
  const { subgraphBackupUrl } = balancer
  const provider = new InfuraProvider(name, process.env.REACT_APP_INFURA_KEY)
  const gasPrice = new BigNumber(process.env.REACT_APP_GAS_PRICE || 100000000000)
  const maxPools = 4

  const poolsUrl = `${subgraphBackupUrl}?timestamp=${Date.now()}`
  sor = new SOR(provider, gasPrice, maxPools, id, poolsUrl)
  await sor.fetchPools()
}

export async function assetQuote(
  assetInAddress: string,
  assetInDecimals: number,
  assetOutAddress: string,
  assetOutDecimals: number,
  swapType: 'swapExactIn' | 'swapExactOut',
  amount: string
) {
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

      console.log('Result IN', exitAmount, slippage)
    } else if (swapType === 'swapExactOut' && sor) {
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

      console.log('Result OUT', tradeSwaps, exitAmount, slippage)
    }
  }
}
