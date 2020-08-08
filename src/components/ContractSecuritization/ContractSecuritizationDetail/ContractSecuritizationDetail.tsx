import { Card } from 'antd'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import ContractClaim from '../ContractClaim/ContractClaim'
import ContractImage from '../ContractImage/ContractImage'
import ContractRedeem from '../ContractRedeem/ContractRedeem'
import ContractShares from '../ContractShares/ContractShares'
import './ContractSecuritizationDetail.scss'

export default function ContractSecuritizationDetail() {
  const { accountShares } = useContext(WalletContext)
  const [contractImg, setContractImg] = useState<string>('')
  const [isRedeemable, setIsRedeemable] = useState(false)
  const [isClaimable, setIsClaimable] = useState(false)

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

  const getContractShares = useCallback(async () => {
    if (contract) {
      setIsRedeemable(await contract.isRedeemable())
      setIsClaimable(await contract.isClaimable())
    }
  }, [contract])

  useEffect(() => {
    getContractImg()
    getContractShares()
  }, [getContractImg, getContractShares])

  return (
    <Card className='contract-securitization-detail'>
      <div className='content'>
        <div className='contract-image'>
          {contract?.name && <ContractImage name={contract?.name || ''} meta='' description='' src={contractImg} />}
        </div>
        <div className='contract-item'>
          {isRedeemable && (
            <div className='contract-redeem'>
              <ContractRedeem />
            </div>
          )}

          {isClaimable && (
            <div className='contract-claim'>
              <ContractClaim />
            </div>
          )}
          <div className='contract-data'>
            <ContractShares />
          </div>
        </div>
      </div>
    </Card>
  )
}
