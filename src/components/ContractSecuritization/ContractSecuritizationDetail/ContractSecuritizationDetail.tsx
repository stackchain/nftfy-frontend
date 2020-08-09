import { Card } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import ContractClaim from '../ContractClaim/ContractClaim'
import ContractData from '../ContractData/ContractData'
import ContractImage from '../ContractImage/ContractImage'
import ContractRedeem from '../ContractRedeem/ContractRedeem'
import './ContractSecuritizationDetail.scss'

export default function ContractSecuritizationDetail() {
  const { accountShares, accountIndex, accounts } = useContext(WalletContext)
  const [contractImg, setContractImg] = useState<string>('')
  const [isRedeemable, setIsRedeemable] = useState(false)
  const [isClaimable, setIsClaimable] = useState(false)

  const [totalSupply, setTotalSupply] = useState('')
  const [issuedShare, setIssuedShare] = useState('')
  const [exitPrice, setExitPrice] = useState('')
  const [pay, setPay] = useState('')
  const [receive, setReceive] = useState('')

  const location = useLocation()
  const history = useHistory()
  const contractId = location.pathname.split('/contract/detail/')[1]

  const contract = accountShares.find(accountShare => accountShare.address === contractId)

  if (!contract) history.push('/')

  const getContractImg = useCallback(async () => {
    if (contract) {
      const erc721 = await contract.getERC721Item()
      setContractImg(erc721.imageUri || '')
    }
  }, [contract])

  const getContractData = useCallback(async () => {
    if (contract) {
      console.log('CONTRACT', contract)

      console.log('REDEEM', await contract.isRedeemable())
      console.log('CLAIM', await contract.isClaimable())
      setIsRedeemable(await contract.isRedeemable())
      setIsClaimable(await contract.isClaimable())
      setIssuedShare(await contract.getAccountBalance(accounts[accountIndex]))
      setExitPrice(await contract.getExitPrice())
      setTotalSupply(await contract.getTotalSupply())
      setReceive(await contract.getVaultBalance())
      setPay(`${await contract.getAccountRedeemAmount(accounts[accountIndex])} ${(await contract.getPaymentToken())?.symbol || 'ETH'}`)
    }
  }, [contract, accounts, accountIndex])

  useEffect(() => {
    getContractImg()
    getContractData()
  }, [getContractImg, getContractData])

  const redeemContract = async () => {
    if (contract && redeemContract) {
      await contract.redeem(accounts[accountIndex])
      setIsRedeemable(false)
    }
  }

  const claimContract = async () => {
    if (contract && claimContract) {
      await contract.claim(accounts[accountIndex])
      setIsClaimable(false)
    }
  }

  return (
    <Card className='contract-securitization-detail'>
      <div className='content'>
        <div className='contract-image'>
          {contractImg && <ContractImage name={contract?.name || ''} meta='' description='' src={contractImg} />}
        </div>
        {contract && (
          <div className='contract-item'>
            {isRedeemable && (
              <div className='contract-redeem-item'>
                <ContractRedeem
                  redeem={redeemContract}
                  participation={`${(issuedShare && totalSupply && (Number(issuedShare) / Number(totalSupply)) * 100) || 100}%`}
                  shareBalance={issuedShare}
                  pay={pay}
                />
              </div>
            )}

            {isClaimable && (
              <div className='contract-claim-item'>
                <ContractClaim claim={claimContract} receive={receive} shares={issuedShare} />
              </div>
            )}
            <div className='contract-data-item'>
              <ContractData name={contract?.name || ''} totalSupply={totalSupply} exitPrice={exitPrice} address={contract.address} />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
