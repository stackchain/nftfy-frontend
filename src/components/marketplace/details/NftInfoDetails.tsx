import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import clip from '../../../assets/icons/clip.svg'
import { colors, fonts, viewport } from '../../../styles/variables'
import { BuyNftButton } from '../../shared/buttons/BuyNftButton'

export interface NftInfoDetailsProps {
  contractName: string
  contractAddress: string
  tokenId: string
  details: string
  collectionAttr?: boolean
}
export const NftInfoDetails: React.FC<NftInfoDetailsProps> = ({
  contractName,
  contractAddress,
  tokenId,
  details,
  collectionAttr
}: NftInfoDetailsProps) => {
  return (
    <S.Content>
      <S.InfoTypes>
        <div>
          <small>Contract Name</small>
          <h6>{contractName}</h6>
        </div>
        <div>
          <small>Contract Address</small>
          <CopyToClipboard text={contractAddress}>
            <h6 className='link-copy'>
              {contractAddress}
              <img src={clip} alt='clip' />
            </h6>
          </CopyToClipboard>
        </div>
        <div>
          <small>Token ID</small>
          <h6>{tokenId}</h6>
        </div>
        <div className={collectionAttr ? 'hidden-collection' : ''}>
          <BuyNftButton url='http://exemple.com' />
        </div>
      </S.InfoTypes>
      <S.Details>
        <small>Details</small>
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
    div {
      font-family: ${fonts.montserrat};
      display: flex;
      flex-direction: column;
      justify-content: center;
      small {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: ${colors.gray1};
      }
      .link-copy {
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      h6 {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: ${colors.gray2};
        display: flex;
        align-items: center;
        img {
          margin-left: 5px;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
      }

      @media (max-width: ${viewport.sm}) {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    div:last-child {
      width: 131px;
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
      line-height: 24px;
      color: ${colors.gray2};
    }
  `
}
