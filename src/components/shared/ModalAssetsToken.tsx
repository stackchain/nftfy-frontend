import { useReactiveVar } from '@apollo/client'
import { Input, Modal } from 'antd'
import Fuse from 'fuse.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { assetsModalVar } from '../../graphql/variables/SecuritizeVariables'
import { getAssetsTokenList } from '../../services/WalletService'
import { colors, fonts, viewport } from '../../styles/variables'

interface Assets {
  id: string
  name: string
  symbol: string
  address: string
  imageUrl: string
  value: string
  decimals: number
}

export function ModalAssetsToken() {
  const [assetsToken, setAssetsToken] = useState<Assets[]>()

  useEffect(() => {
    const getAssetsTokens = async () => {
      const tokens = await getAssetsTokenList()
      setAssetsToken(tokens)
    }
    getAssetsTokens()
  }, [assetsToken])

  const isVisible = useReactiveVar(assetsModalVar)

  const handleCancel = () => {
    assetsModalVar(false)
  }

  const options = {
    includeMatches: true,
    keys: ['name', 'symbol', 'address']
  }
  const searchToken = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (assetsToken && e.target.value) {
      const listTokens = new Fuse(assetsToken, options)
      const results = listTokens.search(e.target.value)
      const characterResults = results.map(character => character.item)
      setAssetsToken(characterResults)
    }
  }

  if (!assetsToken) return <></>
  return (
    <S.Content visible={isVisible} onCancel={handleCancel} footer={null}>
      <S.ContentList>
        <S.ContentTitle>
          <span>Select Asset</span>
        </S.ContentTitle>
        <S.SearchToken placeholder='Search by symbol, name, or address' onChange={searchToken} />
        <S.ListToken>
          {assetsToken.map(asset => (
            <S.Li key={asset.id}>
              <span>{asset.symbol}</span>
              <span>{asset.value}</span>
            </S.Li>
          ))}
        </S.ListToken>
      </S.ContentList>
    </S.Content>
  )
}
export const S = {
  Content: styled(Modal)`
    border-radius: 8px;

    .ant-modal-body {
      padding: 0;
    }
    .ant-modal-content {
      border-radius: 16px;
      max-width: 440px;
    }
    .ant-modal-close-x {
      display: none;
    }
    .ant-modal-footer {
      display: none;
    }
  `,
  ContentList: styled.div`
    padding: 24px 32px;

    @media (max-width: ${viewport.sm}) {
      padding: 32px 16px;
    }
  `,
  ContentTitle: styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    span {
      font-family: ${fonts.montserrat};
      font-size: 24px;
      font-weight: 600;
      line-height: 24px;
      color: ${colors.gray2};
    }
  `,
  ListToken: styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    li:last-child {
      border-bottom: none;
    }
  `,
  Li: styled.li`
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${colors.gray3};
    cursor: pointer;
    span:first-child {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: ${colors.gray2};
    }
    span:last-child {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: ${colors.gray1};
    }
    &:hover {
      background-color: ${colors.white2};
    }
  `,
  SearchToken: styled(Input)`
    border: none;
    outline: none;
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding-left: 0px;
    color: ${colors.gray1};
    &:focus {
      box-shadow: none !important;
    }
  `
}
