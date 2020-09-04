import { Card } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { errorNotification, infoNotification } from '../../../services/notification'
import ContractClaim from '../ContractClaim/ContractClaim'
import ContractData from '../ContractData/ContractData'
import ContractImage from '../ContractImage/ContractImage'
import ContractRedeem from '../ContractRedeem/ContractRedeem'
import './ContractSecuritizationDetail.scss'

export default function ContractSecuritizationDetail() {
  const { accountShares, accountIndex, accounts } = useContext(WalletContext)
  const [contractImg, setContractImg] = useState<string>('')
  const [contractName, setContractName] = useState<string>('')
  const [contractDescription, setContractDescription] = useState('')
  const [contractMeta, setContractMeta] = useState('')
  const [isRedeemable, setIsRedeemable] = useState(false)
  const [isClaimable, setIsClaimable] = useState(false)

  const [totalSupply, setTotalSupply] = useState('')
  const [sharesCount, setSharesCount] = useState('')
  const [issuedShare, setIssuedShare] = useState('')
  const [exitPrice, setExitPrice] = useState('')
  const [pay, setPay] = useState('')
  const [receive, setReceive] = useState('')
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const history = useHistory()
  const contractId = location.pathname.split('/contract/detail/')[1]

  const contract = accountShares.find(accountShare => accountShare.address === contractId)

  if (!contract) history.push('/')

  const getContractImg = useCallback(async () => {
    if (contract) {
      const erc721 = await contract.getERC721Item()
      setContractImg(erc721.imageUri || '')
      setContractDescription(erc721.description || '')
      setContractMeta(`#${erc721?.tokenId}`)
      setContractName(erc721.name || '')
    }
  }, [contract])

  const getContractData = useCallback(async () => {
    if (contract) {
      setIsRedeemable(await contract.isRedeemable())
      setIsClaimable(await contract.isClaimable())
      setIssuedShare(await contract.getAccountBalance(accounts[accountIndex]))
      setExitPrice(`${Number(await contract.getExitPrice()).toFixed(8)} ${(await contract.getPaymentToken())?.symbol || 'ETH'}`)
      setTotalSupply(`${Number(await contract.getTotalSupply()).toLocaleString()}`)
      setSharesCount(await contract.getSharesCount())
      setReceive(await contract.getVaultBalance())
      setPay(
        `${Number(await contract.getAccountRedeemAmount(accounts[accountIndex])).toFixed(8)} ${
          (await contract.getPaymentToken())?.symbol || 'ETH'
        }`
      )
    }
  }, [contract, accounts, accountIndex])

  useEffect(() => {
    getContractImg()
    getContractData()
  }, [getContractImg, getContractData])

  const redeemContract = async () => {
    if (contract && redeemContract) {
      infoNotification('Allow redeem transaction in the wallet')

      try {
        setLoading(true)
        await contract.redeem(accounts[accountIndex])
        setIsRedeemable(false)
        setLoading(false)
        history.push('/')
      } catch (error) {
        errorNotification('Redeem transaction failure, please check in the wallet')
        setLoading(false)
      }
    }
  }

  const claimContract = async () => {
    if (contract && claimContract) {
      setLoading(true)
      await contract.claim(accounts[accountIndex])
      setIsClaimable(false)
      setLoading(false)
      history.push('/')
    }
  }

  return (
    <Card className='contract-securitization-detail'>
      <div className='content'>
        <div className='contract-image'>
          {contractImg && <ContractImage name={contractName} meta={contractMeta} description={contractDescription} src={contractImg} />}
        </div>
        {contract && (
          <div className='contract-item'>
            {isRedeemable && (
              <div className='contract-redeem-item'>
                <ContractRedeem
                  sharesCount={sharesCount}
                  redeem={redeemContract}
                  participation={`${(issuedShare && totalSupply && (Number(issuedShare) / Number(totalSupply)) * 100) || 100}%`}
                  shareBalance={issuedShare}
                  pay={pay}
                  loading={loading}
                />
              </div>
            )}

            {isClaimable && (
              <div className='contract-claim-item'>
                <ContractClaim claim={claimContract} receive={receive} shares={issuedShare} loading={loading} />
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
