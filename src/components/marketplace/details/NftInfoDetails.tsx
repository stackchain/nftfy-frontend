import { Tooltip } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import clip from '../../../assets/icons/clip.svg'
import { colors, fonts, viewport } from '../../../styles/variables'

export interface NftInfoDetailsProps {
  contractName: string
  contractAddress: string
  tokenId: string
  details: string
  collectionAttr?: boolean
}
export const NftInfoDetails: React.FC<NftInfoDetailsProps> = ({ contractAddress, details }: NftInfoDetailsProps) => {
  return (
    <S.Content>
      <S.InfoTypes>
        <S.CopyToClipboard text={contractAddress}>
          <Tooltip placement='right' title='Copy ERC721 Address'>
            <h6 className='link-copy'>
              {contractAddress}
              <img src={clip} alt='clip' />
            </h6>
          </Tooltip>
        </S.CopyToClipboard>
      </S.InfoTypes>
      <S.Details>
        <p>{details}</p>
      </S.Details>
    </S.Content>
  )
}

const S = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 575px;
  `,
  InfoTypes: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: ${viewport.sm}) {
      flex-direction: row;
      justify-content: space-between;
    }

    .hidden-collection {
      display: none;
    }
    @media (max-width: ${viewport.sm}) {
      flex-direction: column;
      div:last-child {
        display: none;
      }
    }
    @media (max-width: ${viewport.lg}) {
      div:last-child {
        display: none;
      }
    }
  `,
  Details: styled.div`
    margin-top: 32px;
    small {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: ${colors.gray1};
    }

    p {
      font-family: ${fonts.montserrat};
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: ${colors.gray2};
    }
  `,
  CopyToClipboard: styled(CopyToClipboard)`
    font-size: 14px;
    font-family: ${fonts.montserrat};
    font-style: normal;
    font-weight: 500;
    color: ${colors.gray1};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    img {
      margin-left: 8px;
      width: 12px;
      height: 12px;
    }
  `
}
