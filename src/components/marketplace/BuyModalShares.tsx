import { Swap } from '@balancer-labs/sor/dist/types'
import { Button, Input } from 'antd'
import BigNumber from 'bignumber.js'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import arrowDown from '../../assets/arrowDown.svg'
import switchTopDown from '../../assets/switchTopDown.svg'
import { getConfigByChainId } from '../../config'
import { chainIdVar } from '../../graphql/variables/WalletVariable'
import { balancerAssetQuote, balancerSwapIn, balancerSwapOut } from '../../services/BalancerService'
import { scale } from '../../services/UtilService'
import { getErc20Balance } from '../../services/WalletService'
import { colors, fonts, viewport } from '../../styles/variables'
import { ERC20Asset, MarketplaceERC20Item } from '../../types/MarketplaceTypes'

interface BuyModalSharesProps {
  account: string
  erc20: MarketplaceERC20Item
}

export function BuyModalShares({ account, erc20 }: BuyModalSharesProps) {
  const { name, symbol } = erc20
  const { image_url } = erc20.erc721

  const { balancer } = getConfigByChainId(chainIdVar())
  const { precision } = balancer
  const asset1 = {
    id: '2',
    name: 'Uniswap Coin',
    symbol: 'UNI',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    imageUrl: '',
    decimals: 18
  }

  const asset2 = {
    id: '1',
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5',
    imageUrl: '',
    decimals: 6
  }

  const [assetIn, setAssetIn] = useState<ERC20Asset>(asset1)
  const [assetOut, setAssetOut] = useState<ERC20Asset>(asset2)

  const [assetInAmount, setAssetInAmount] = useState('')
  const [assetOutAmount, setAssetOutAmount] = useState('')

  const [assetInBalance, setAssetInBalance] = useState<BigNumber | undefined>(undefined)
  const [assetOutBalance, setAssetOutBalance] = useState<BigNumber | undefined>(undefined)

  const [tradeSwapsIn, setTradeSwapsIn] = useState<Swap[][]>([])
  const [tradeSwapsOut, setTradeSwapsOut] = useState<Swap[][]>([])

  const [swapType, setSwapType] = useState<'swapExactIn' | 'swapExactOut' | undefined>(undefined)

  const [switchPosition, setSwitchPosition] = useState(true)

  useEffect(() => {
    const getAssetOutBalance = async () => {
      const balance = await getErc20Balance(account, assetIn.address, assetIn.decimals)
      setAssetInBalance(balance)
    }
    getAssetOutBalance()
  }, [account, assetIn.address, assetIn.decimals])

  useEffect(() => {
    const getAssetInBalance = async () => {
      const balance = await getErc20Balance(account, assetOut.address, assetOut.decimals)

      setAssetOutBalance(balance)
    }
    getAssetInBalance()
  }, [account, assetOut.address, assetOut.decimals])

  const handleAssetInAmount = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setAssetInAmount(event.target.value)

      if (new BigNumber(event.target.value).isLessThan(0)) {
        setAssetOutAmount('0')
      } else {
        const quoteResult = await balancerAssetQuote(
          assetIn.address,
          assetIn.decimals,
          assetOut.address,
          assetOut.decimals,
          'swapExactIn',
          event.target.value || '0'
        )

        if (quoteResult) {
          setAssetOutAmount(new BigNumber(quoteResult.exitAmount).decimalPlaces(assetOut.decimals).toString())
          setTradeSwapsIn(quoteResult.tradeSwaps)
        } else {
          setAssetOutAmount('0')
          setTradeSwapsIn([])
        }

        setSwapType('swapExactIn')
      }
    } else {
      setAssetInAmount('')
      setAssetOutAmount('')
      setSwapType(undefined)
    }
  }

  const handleAssetOutAmount = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setAssetOutAmount(event.target.value)

      if (new BigNumber(event.target.value).isLessThan(0)) {
        setAssetInAmount('0')
      } else {
        const quoteResult = await balancerAssetQuote(
          assetIn.address,
          assetIn.decimals,
          assetOut.address,
          assetOut.decimals,
          'swapExactOut',
          event.target.value || '0'
        )

        if (quoteResult) {
          setAssetInAmount(new BigNumber(quoteResult?.exitAmount).decimalPlaces(assetIn.decimals).toString())
          setTradeSwapsOut(quoteResult.tradeSwaps)
        } else {
          setAssetInAmount('0')
          setTradeSwapsOut([])
        }

        setSwapType('swapExactOut')
      }
    } else {
      setAssetInAmount('')
      setAssetOutAmount('')
      setSwapType(undefined)
    }
  }

  const switchAsset = () => {
    const temp = {
      assetIn,
      assetInAmount,
      tradeSwapsIn,
      assetOut,
      assetOutAmount,
      tradeSwapsOut
    }

    setAssetIn(temp.assetOut)
    setAssetInAmount(temp.assetOutAmount)
    setTradeSwapsIn(temp.tradeSwapsOut)

    setAssetOut(temp.assetIn)
    setAssetOutAmount(temp.assetInAmount)
    setTradeSwapsOut(temp.tradeSwapsIn)

    setSwitchPosition(!switchPosition)
  }

  const swapIn = async () => {
    await balancerSwapIn(
      assetIn.address,
      assetOut.address,
      scale(new BigNumber(assetInAmount), assetIn.decimals).toString(),
      scale(new BigNumber(assetOutAmount), assetOut.decimals).toString(),
      tradeSwapsIn
    )
  }

  const swapOut = async () => {
    await balancerSwapOut(
      assetIn.address,
      assetOut.address,
      scale(new BigNumber(assetInAmount), assetIn.decimals).toString(),
      tradeSwapsOut
    )
  }

  const ruleNotEmpty = new BigNumber(assetInAmount).isGreaterThan(0) && new BigNumber(assetOutAmount).isGreaterThan(0)
  const ruleHasBalance =
    !(assetOutBalance && new BigNumber(assetOutAmount).isGreaterThan(assetOutBalance)) &&
    !(assetInBalance && new BigNumber(assetInAmount).isGreaterThan(assetInBalance))
  const ruleSwapIn = ruleNotEmpty && ruleHasBalance && swapType === 'swapExactIn'
  const ruleSwapOut = ruleNotEmpty && ruleHasBalance && swapType === 'swapExactOut'
  const ruleNotEnoughBalance =
    ((assetOutBalance && new BigNumber(assetOutAmount).isGreaterThan(assetOutBalance)) ||
      (assetInBalance && new BigNumber(assetInAmount).isGreaterThan(assetInBalance))) &&
    swapType

  const ruleNotEnoughLiquidity =
    ((swapType === 'swapExactOut' && !new BigNumber(assetInAmount).isGreaterThan(0)) ||
      (swapType === 'swapExactIn' && !new BigNumber(assetOutAmount).isGreaterThan(0))) &&
    (new BigNumber(assetInAmount).isGreaterThan(0) || new BigNumber(assetOutAmount).isGreaterThan(0))

  console.log('ruleNotEnoughLiquidity', ruleNotEnoughLiquidity)

  return (
    <S.SharesContent>
      <S.Header>
        <div>
          <h3>
            {name}
            <small>{symbol}</small>
          </h3>
        </div>
        <div>
          <img src={image_url} alt={`${name} ${symbol}`} />
        </div>
      </S.Header>
      <S.SharesFrom>
        <div className={assetInBalance && new BigNumber(assetInAmount).isGreaterThan(assetInBalance) ? 'no-balance' : ''}>
          {`Balance: `}
          {assetInBalance && assetInBalance.decimalPlaces(5).toString()}
        </div>
        <div>
          <div>From</div>
          <div>
            <S.TokenButton>
              <span>{assetIn.symbol}</span>
              <img src={arrowDown} alt='Arrow Down' />
            </S.TokenButton>
          </div>
          <div>
            <S.TokenInput type='number' placeholder='0' value={assetInAmount} onChange={handleAssetInAmount} />
          </div>
        </div>
      </S.SharesFrom>
      <S.SharesSwitch>
        <div>
          <div>
            <S.SwitchButton onClick={switchAsset} className={`${switchPosition ? 'up' : 'down'}`}>
              <img src={switchTopDown} alt='Switch Token' />
            </S.SwitchButton>
          </div>
        </div>
        <div>
          <span>
            {ruleNotEmpty &&
              !ruleNotEnoughBalance &&
              `${new BigNumber(1).decimalPlaces(assetIn.decimals).toString()} ${assetIn.symbol} = ${new BigNumber(assetOutAmount)
                .div(new BigNumber(assetInAmount))
                .decimalPlaces(precision)
                .toString()} ${assetOut.symbol}`}
          </span>
        </div>
      </S.SharesSwitch>
      <S.SharesTo>
        <div className={assetOutBalance && new BigNumber(assetOutAmount).isGreaterThan(assetOutBalance) ? 'no-balance' : ''}>
          {`Balance: `}
          {assetOutBalance && assetOutBalance.decimalPlaces(5).toString()}
        </div>
        <div>
          <div>To</div>
          <div>
            <S.TokenButton className='noDropdown'>
              <span>{assetOut.symbol}</span>
              <img src={arrowDown} alt='Arrow Down' />
            </S.TokenButton>
          </div>
          <div>
            <S.TokenInput type='number' placeholder='0' value={assetOutAmount} onChange={handleAssetOutAmount} />
          </div>
        </div>
      </S.SharesTo>
      <S.SharesUnlock>
        {!ruleNotEmpty && !ruleNotEnoughBalance && !ruleNotEnoughLiquidity && <S.ActionButton disabled>Enter Amount</S.ActionButton>}
        {ruleSwapIn && <S.ActionButton onClick={swapIn}>Swap In</S.ActionButton>}
        {ruleSwapOut && <S.ActionButton onClick={swapOut}>Swap Out</S.ActionButton>}
        {ruleNotEnoughBalance && <S.ActionButton disabled>Not Enough Balance</S.ActionButton>}
        {ruleNotEnoughLiquidity && !ruleNotEnoughBalance && <S.ActionButton disabled>Not Enough Liquidity</S.ActionButton>}
      </S.SharesUnlock>
    </S.SharesContent>
  )
}
export const S = {
  SharesContent: styled.div`
    padding: 24px 32px;

    @media (max-width: ${viewport.sm}) {
      padding: 24px 16px;
    }
  `,
  Header: styled.div`
    display: flex;
    flex-direction: row;

    div {
      &:nth-child(1) {
        flex: 1;
        display: flex;
        align-items: center;

        h3 {
          font-family: ${fonts.montserrat};
          font-size: 24px;
          font-weight: 600;
          line-height: 24px;
          color: ${colors.gray2};

          small {
            color: ${colors.gray1};
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        display: flex;
      }
    }
  `,
  SharesFrom: styled.div`
    display: flex;
    flex-direction: column;

    > div:nth-child(1) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-family: ${fonts.montserrat};
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray1};
      font-weight: 500;

      margin-top: 24px;
      height: 32px;

      &.no-balance {
        color: ${colors.red};
      }
    }

    > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      height: 40px;

      > div:nth-child(1) {
        display: flex;
        font-family: ${fonts.montserrat};
        font-size: 16px;
        line-height: 24px;
        color: ${colors.gray2};
        font-weight: 600;
        flex: 64px 0 0;
        height: 40px;
        align-items: center;
      }

      > div:nth-child(2) {
        border: 1px solid ${colors.gray3};
        height: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        flex: 100px 0 0;

        &:hover {
          background-color: ${colors.white2};
        }
      }

      > div:nth-child(3) {
        border: 1px solid ${colors.gray3};
        height: 40px;
        display: flex;
        align-items: center;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        flex: 1 1 0;
        border-left: 0;
        justify-content: flex-end;
        padding-right: 16px;
      }
    }
  `,
  SharesSwitch: styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;

    @media (max-width: ${viewport.sm}) {
      margin-top: 24px;
      margin-bottom: 24px;
    }

    > div:nth-child(1) {
      display: flex;
      flex: 64px 0 0;

      div {
        background-color: ${colors.gray4};
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 40px 0 0;
        cursor: pointer;

        margin-top: 24px;
        margin-bottom: 24px;

        width: 40px;
        height: 40px;
        border-radius: 100%;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;

        img {
          width: 20px;
          height: 18px;
        }

        &:hover {
          background-color: ${colors.gray1};
        }
      }
    }

    > div:nth-child(2) {
      display: flex;
      flex: 1;
      font-family: ${fonts.montserrat};
      font-size: 14px;
      line-height: 24px;
      color: ${colors.gray2};
      font-weight: 500;

      span:nth-child(1) {
        margin-right: 4px;
      }

      span:nth-child(2) {
        span {
          color: ${colors.gray1};
          margin-left: 8px;
          font-size: 12px;
          font-weight: 600;
        }
      }

      @media (max-width: ${viewport.sm}) {
        flex-direction: column;
      }
    }
  `,
  SharesTo: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -32px;
    margin-bottom: 32px;

    > div:nth-child(1) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      font-family: ${fonts.montserrat};
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray1};
      font-weight: 500;

      height: 32px;

      &.no-balance {
        color: ${colors.red};
      }
    }

    > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      height: 40px;

      > div:nth-child(1) {
        display: flex;
        font-family: ${fonts.montserrat};
        font-size: 16px;
        line-height: 24px;
        color: ${colors.gray2};
        font-weight: 600;
        flex: 64px 0 0;
        height: 40px;
        align-items: center;
      }

      > div:nth-child(2) {
        border: 1px solid ${colors.gray3};
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        flex: 100px 0 0;
      }

      > div:nth-child(3) {
        border: 1px solid ${colors.gray3};
        height: 40px;
        display: flex;
        align-items: center;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        flex: 1 1 0;
        border-left: 0;
        justify-content: flex-end;
        padding-right: 16px;
      }
    }
  `,
  SharesUnlock: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  `,
  TokenButton: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
    padding: 8px;

    img:nth-child(1) {
      margin-right: 8px;
    }

    span {
      margin-right: 8px;
      font-family: ${fonts.montserrat};
      font-weight: 600;
      color: ${colors.gray2};
    }

    img:nth-child(3) {
      width: 16px;
      height: 16px;
    }

    &.noDropdown {
      cursor: default;
      img:nth-child(3) {
        display: none;
      }
    }
  `,
  SwitchButton: styled(Button)`
    &,
    &:active,
    &:hover,
    &:focus {
      background: none;
      height: 40px;
      width: 40px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      border: 0;
      box-shadow: none;
      outline: none;
    }
    &:after,
    &:before {
      display: none;
    }

    &.up {
      transform: rotate(0deg);
      animation-name: rotateUp;
      animation-duration: 0.5s;
    }

    &.down {
      transform: rotate(180deg);
      animation-name: rotateDown;
      animation-duration: 0.5s;
    }

    @keyframes rotateUp {
      from {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(0deg);
      }
    }

    @keyframes rotateDown {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(180deg);
      }
    }
  `,
  ActionButton: styled(Button)`
    height: 40px;
    padding: 0 64px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${fonts.montserrat};
    width: 100%;

    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: ${colors.white};
    background-color: ${colors.blue1};
    border: 1px solid ${colors.blue1};

    &:hover,
    &:focus {
      font-family: ${fonts.montserrat};
      color: ${colors.white};
      background-color: ${colors.blue2};
      border: 1px solid ${colors.blue2};
    }

    &:disabled {
      border: none;
    }
  `,
  TokenInput: styled(Input)`
    border: none;
    outline: none;
    box-shadow: none;
    text-align: end;
    padding: 0;

    width: 100%;
    height: 100%;

    font-family: ${fonts.montserrat};
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray2};
    font-weight: 500;

    &:hover,
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  `
}
