import { Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import iconInfo from '../../assets/icons/info.svg'
import { colors, fonts } from '../../styles/variables'

export interface SecuritizeERC721Props {
  tokens: [
    {
      name: string
      icon: string
    }
  ]
}

export const SecuritizeERC721: React.FC<SecuritizeERC721Props> = () => {
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
          <input type='text' />
        </S.FormControl>

        <S.FormControl>
          <S.Label>
            Exit Price
            <Tooltip placement='top' title='info'>
              <img src={iconInfo} alt='info' />
            </Tooltip>
          </S.Label>
          <input type='text' />
        </S.FormControl>
      </S.Form>
    </S.Content>
  )
}

const S = {
  Content: styled.div`
    flex: 1;
    max-width: 624px;
    height: 304px;
    background: ${colors.white};
    font-family: ${fonts.montserrat};
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    border: 1px solid ${colors.gray3};
    box-sizing: border-box;
  `,
  Title: styled.div`
    padding: 33px 0px 33px 33px;
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
  FormControl: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0 0;

    input {
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
  `
}
