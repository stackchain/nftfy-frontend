import { Button, Empty, Table } from 'antd'
import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../../../context/WalletContext'
import { CustomPool, PoolItem } from '../../../types/Pools'
import Loading from '../../shared/layout/Loading/Loading'
import { PoolsPieChart } from './PoolsPieChart'
import './PoolsTable.scss'

const contracts: CustomPool[] = [
  {
    erc721: {
      contract: '0x0000000000000000000000000000000000000000',
      tokenId: '0',
      disabled: true
    },
    pool: {
      contract: '0xf86ca32514a22fcd350a99121f34a0e70a059ec2',
      name: 'WETH/NFY'
    }
  },
  {
    erc721: {
      contract: '0x0000000000000000000000000000000000000000',
      tokenId: '0',
      disabled: true
    },
    pool: {
      contract: '0x2ddd5425a2c78ceb168d52a65fda21600a03035f',
      name: 'BAL/NFY'
    }
  }
]

export default function PoolsTable() {
  const [contractsData, setContractsData] = useState<PoolItem[]>([])
  const { accounts } = useContext(WalletContext)
  const [loading, setLoading] = useState(true)

  const getContractData = useCallback(async () => {
    try {
      const contractsPromises = contracts.map(async contract => {
        const opensea = (
          await axios.get<{
            image_url: string
          }>(`https://rinkeby-api.opensea.io/api/v1/asset/${contract.erc721.contract}/${contract.erc721.tokenId}`)
        ).data

        const blocklytics = (
          await axios.get<{
            assets: {
              name: string
              symbol: string
              weight: number
            }[]
            usdLiquidity: number
          }>(`https://data-api.defipulse.com/api/v1/blocklytics/pools/v1/exchange/${contract.pool.contract}`, {
            params: {
              'api-key': '7518c74bf7d279f167278c849d2faca0a983c9edce78a94205d3cf693204'
            }
          })
        ).data

        if (blocklytics) {
          const poolItem: any = {
            nft: contract.erc721.disabled ? (
              <></>
            ) : (
              <Link to={`/contract/securitize/${contract.erc721.contract}/${contract.erc721.tokenId}`}>
                <img src={opensea.image_url} alt={contract.erc721.contract} className='nft-img' title='See NFT' />
              </Link>
            ),
            image_url: opensea.image_url,
            assets: (
              <div className='asset'>
                <div className='chart'>
                  <PoolsPieChart data={blocklytics.assets} />
                </div>
                <div className='content'>
                  <div className='name'>{`${contract.pool.name}`}</div>
                  <div className='assets'>
                    {`${blocklytics.assets.map(asset => ` ${asset.symbol} (${asset.weight < 1 ? asset.weight * 100 : asset.weight}%)`)}`}
                  </div>
                </div>
              </div>
            ),
            liquidity: blocklytics.usdLiquidity.toLocaleString('en-US'),
            shares: '1,000,000',
            exitPrice: '1,000 ETH',
            link: (
              <Button type='primary' size='large' href={`https://pools.balancer.exchange/#/pool/${contract.pool.contract}`} target='_blank'>
                View
              </Button>
            )
          }
          setContractsData(data => [...data, poolItem])
        }
      })
      await Promise.all(contractsPromises)
      setLoading(false)
    } catch (error) {
      console.error('PoolItem - Error on get metadata', error)
    }
  }, [])

  useEffect(() => {
    getContractData()
  }, [getContractData])

  const columns = [
    {
      title: 'NFT',
      dataIndex: 'nft',
      key: 'nft'
    },
    {
      title: 'Assets',
      dataIndex: 'assets',
      key: 'assets'
    },
    {
      title: 'USD Liquidity',
      dataIndex: 'liquidity',
      key: 'liquidity'
    },
    {
      title: 'Pool Link',
      dataIndex: 'link',
      key: 'link'
    }
  ]

  return (
    <div className='pools-table'>
      {loading && (
        <div className='load'>
          <Loading />
        </div>
      )}
      {!loading && accounts.length > 0 && (
        <Table sortDirections={['descend']} dataSource={contractsData} columns={columns} pagination={false} rowKey='link' />
      )}
      {!loading && accounts.length === 0 && <Empty description='Please Connect the Wallet' />}
    </div>
  )
}
