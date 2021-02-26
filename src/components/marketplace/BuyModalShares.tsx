import { Swap } from '@balancer-labs/sor/dist/types'
import { Button, Input } from 'antd'
import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import arrowDown from '../../assets/arrowDown.svg'
import switchTopDown from '../../assets/switchTopDown.svg'
import ethereum from '../../assets/tokens/ethereum.svg'
import { balancerAssetQuote } from '../../services/BalancerService'
import { colors, fonts, viewport } from '../../styles/variables'
import { ERC20Asset } from '../../types/MarketplaceTypes'

export function BuyModalShares() {
  const [assetIn] = useState<ERC20Asset>({
    id: '1',
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5',
    imageUrl: '',
    decimals: 6
  })

  const [assetInAmount, setAssetInAmount] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tradeSwapsIn, setTradeSwapsIn] = useState<Swap[][]>([])

  const handleAssetInAmount = async (event: ChangeEvent<HTMLInputElement>) => {
    setAssetInAmount(event.target.value)

    const quoteResult = await balancerAssetQuote(
      assetIn.address,
      assetIn.decimals,
      assetOut.address,
      assetOut.decimals,
      'swapExactIn',
      event.target.value || '0'
    )

    if (quoteResult) {
      setAssetOutAmount(quoteResult?.exitAmount)
      setTradeSwapsIn(quoteResult.tradeSwaps)
    } else {
      setAssetOutAmount('0')
      setTradeSwapsIn([])
    }
  }

  const [assetOut] = useState<ERC20Asset>({
    id: '2',
    name: 'Uniswap Coin',
    symbol: 'UNI',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    imageUrl: '',
    decimals: 18
  })

  const [assetOutAmount, setAssetOutAmount] = useState('')
  // const [tradeSwapsOut, setTradeSwapsOut] = useState<Swap[][]>([])

  const handleAssetOutAmount = async (event: ChangeEvent<HTMLInputElement>) => {
    setAssetOutAmount(event.target.value)

    const quoteResult = await balancerAssetQuote(
      assetIn.address,
      assetIn.decimals,
      assetOut.address,
      assetOut.decimals,
      'swapExactOut',
      event.target.value || '0'
    )

    if (quoteResult) {
      setAssetInAmount(quoteResult?.exitAmount)
      // setTradeSwapsOut(quoteResult.tradeSwaps)
    } else {
      setAssetInAmount('0')
      // setTradeSwapsOut([])
    }
  }

  const swapIn = () => {
    // eslint-disable-next-line no-console
    console.log('Swap')
  }

  return (
    <S.SharesContent>
      <S.Header>
        <div>
          <h3>
            BLOCKIE # 24 shares
            <small>KIE24</small>
          </h3>
        </div>
        <div>
          <img
            src='https://lh3.googleusercontent.com/9fhtFiCAKNQfwUMxCs7vTPJTnDj9gWcEB-9TWPwL6cLxgE3DhDP7Kq4Yvs82MU4vutYuZgpc9Mu3l0TGuvAjtZgiUoiXzLKtjM_jpA'
            alt='Google'
          />
        </div>
      </S.Header>
      <S.SharesFrom>
        <div>Balance: 1500</div>
        <div>
          <div>From</div>
          <div>
            <S.TokenButton>
              <img src={ethereum} alt={assetIn.name} />
              <span>{assetIn.symbol}</span>
              <img src={arrowDown} alt='Arrow Down' />
            </S.TokenButton>
          </div>
          <div>
            <S.TokenInput placeholder='0' value={assetInAmount} onChange={handleAssetInAmount} />
          </div>
        </div>
      </S.SharesFrom>
      <S.SharesSwitch>
        <div>
          <div>
            <img src={switchTopDown} alt='Switch Token' />
          </div>
        </div>
        <div>
          <span>1 Share =</span>
          <span>
            0.0000053 ETH
            <span>$0,50</span>
          </span>
        </div>
      </S.SharesSwitch>
      <S.SharesTo>
        <div>Balance: 100.0</div>
        <div>
          <div>To</div>
          <div>
            <S.TokenButton className='noDropdown'>
              <img src={ethereum} alt={assetOut.name} />
              <span>{assetOut.symbol}</span>
              <img src={arrowDown} alt='Arrow Down' />
            </S.TokenButton>
          </div>
          <div>
            <S.TokenInput placeholder='0' value={assetOutAmount} onChange={handleAssetOutAmount} />
          </div>
        </div>
      </S.SharesTo>
      <S.SharesUnlock>
        <S.ActionButton onClick={swapIn}>Unlock</S.ActionButton>
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
      font-size: 16px;
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
  ActionButton: styled(Button)`
    height: 40px;
    padding: 0 64px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${fonts.montserrat};

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

    @media (max-width: ${viewport.sm}) {
      width: 100%;
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
