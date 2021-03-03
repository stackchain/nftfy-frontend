/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import iconInfo from '../../assets/icons/info.svg'
import { approveErc721, isApprovedErc721, securitizeErc721 } from '../../services/NftfyService'
import { units } from '../../services/UtilService'
import { colors, fonts, viewport } from '../../styles/variables'

export interface securitizeErc721Props {
  erc721Address: string
  erc721AddressId: number
}

export const SecuritizeERC721: React.FC<securitizeErc721Props> = ({ erc721Address, erc721AddressId }: securitizeErc721Props) => {
  const shares = '1000000'

  const asset = {
    id: '0',
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    imageUrl: '',
    decimals: 18
  }

  const [loading, setLoading] = useState(false)
  const [approved, setApproved] = useState(false)
  const [exitPrice, setExitPrice] = useState('')

  useEffect(() => {
    const statusApprove = async () => {
      const statusApproved = await isApprovedErc721(erc721Address, erc721AddressId)
      setApproved(statusApproved)
    }
    statusApprove()
  }, [approved, erc721Address, erc721AddressId])

  const approve = async () => {
    setLoading(true)
    await approveErc721(erc721Address, erc721AddressId)
    const statusApproved = await isApprovedErc721(erc721Address, erc721AddressId)
    setApproved(statusApproved)
    setLoading(false)
  }

  const securitize = async () => {
    setLoading(true)
    await securitizeErc721(erc721Address, erc721AddressId, shares, 0, units(exitPrice, asset.decimals), asset.address, false)
    setLoading(false)
  }

  const setToken = <span>token</span>

  const handleExitPrice = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setExitPrice(event.target.value)
  }

  return (
    <S.Content>
      <S.Title>
        <span>Securitize ERC721 Contract</span>
      </S.Title>
      <S.Form>
        <S.FormControl>
          <S.Label>
            Shares
            <Tooltip placement='top' title='info'>
              <img src={iconInfo} alt='info' />
            </Tooltip>
          </S.Label>
          <S.SetExitPrice type='text' value={Number(shares).toLocaleString('en-US')} disabled />
        </S.FormControl>

        <S.FormControlPrice>
          <S.Label>
            Exit Price
            <Tooltip placement='top' title='info'>
              <img src={iconInfo} alt='info' />
            </Tooltip>
          </S.Label>
          <div>
            <S.DropDownSetToken overlay={setToken} placement='bottomCenter' disabled>
              <Button>
                {asset.symbol}
                <DownOutlined />
              </Button>
            </S.DropDownSetToken>
            <S.SetExitPrice type='number' onChange={handleExitPrice} />
          </div>
        </S.FormControlPrice>
        <S.Action>
          {!approved ? (
            <S.TradeSharesButton loading={loading} onClick={approve}>
              Unlock
            </S.TradeSharesButton>
          ) : (
            <S.TradeSharesButton loading={loading} onClick={securitize}>
              Securitize
            </S.TradeSharesButton>
          )}
        </S.Action>
      </S.Form>
    </S.Content>
  )
}

const S = {
  Content: styled.div`
    flex: 1;
    max-width: 624px;
    min-height: 304px;
    background: ${colors.white};
    font-family: ${fonts.montserrat};
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
    @media (max-width: ${viewport.xl}) {
      height: auto;
    }
  `,
  Title: styled.div`
    padding: 20px 0px 20px 33px;
    border-bottom: 1px solid ${colors.gray3};
    span {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: ${colors.gray2};
    }
  `,
  Form: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
  `,
  SetExitPrice: styled(Input)`
    width: 440px;
    height: 40px;
    background: ${colors.white1};
    border-radius: 8px;
    border: none;
    outline: none;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    font-family: ${fonts.montserrat};
    color: ${colors.gray2};
    text-align: end;
    padding-right: 15px;
    outline: none !important;
  `,
  DropDownSetToken: styled(Dropdown)`
    width: 152px;
    height: 40px;
    border-right: none;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: ${colors.gray2};
    }

    &:hover {
      border-color: ${colors.gray3};
    }
    &:focus {
      border-color: ${colors.gray3};
    }
  `,
  FormControl: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0 0;
    @media (max-width: ${viewport.xl}) {
      flex-direction: column;
      label {
        width: 100%;
        margin-bottom: 5px;
      }
      input {
        width: 100%;
      }
    }
  `,
  FormControlPrice: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0 0;
    input {
      width: 288px;
      height: 40px;
      border: 1px solid ${colors.gray3};
      background: ${colors.white};
      border-bottom-right-radius: 8px !important;
      border-top-right-radius: 8px !important;
      border-bottom-left-radius: 0px !important;
      border-top-left-radius: 0px !important;
      &:focus {
        border-color: ${colors.gray3} !important;
        box-shadow: none !important;
      }
      &:hover {
        border-color: ${colors.gray3} !important;
        box-shadow: none !important;
      }
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: ${viewport.xl}) {
      flex-direction: column;
      label {
        width: 100%;
        margin-bottom: 5px;
      }
      div {
        display: flex;
        flex-direction: row;
        width: 100%;
        select {
          width: 25%;
        }
        input {
          width: 75%;
        }
      }
    }
  `,
  Label: styled.label`
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray2};

    img {
      padding-left: 5px;
      cursor: pointer;
    }
  `,
  Action: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `,
  ButtonSecuritize: styled.a`
    width: 209px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background: ${colors.blue1};
    border-radius: 8px;
    cursor: pointer;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.white};
    &:hover {
      background: ${colors.blue2};
      color: ${colors.white};
    }
  `,
  TradeSharesButton: styled(Button)`
    height: 40px;
    padding: 0 64px;
    border-radius: 8px;
    font-family: ${fonts.montserrat};
    font-weight: 500;
    color: ${colors.white};
    background-color: ${colors.blue1};
    margin-top: 20px;
    margin-bottom: 17px;

    &:hover,
    &:focus {
      color: ${colors.white};
      background-color: ${colors.blue2};
      border: 1px solid ${colors.blue2};
    }

    @media (max-width: ${viewport.sm}) {
      width: 100%;
      margin-bottom: 32px;
    }
  `
}
