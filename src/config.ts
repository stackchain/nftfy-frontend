export interface ChainConfig {
  id: number
  name: string
  infuraAddress: string
  nfyAddress: string
  nfyDecimals: number
  nftfyAddress: string
  erc721Addresses: string[]
  balancer: {
    subgraphUrl: string
    subgraphBackupUrl: string
    eth: string
    weth: string
    precision: number
    addresses: {
      bFactory: string
      bActions: string
      dsProxyRegistry: string
      exchangeProxy: string
      weth: string
      multicall: string
    }
  }
}

export const chains: ChainConfig[] = [
  {
    id: 1,
    name: 'mainnet',
    infuraAddress: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    nfyAddress: '0xc633BAf9fDE99800226C74328024525192294D2b',
    nfyDecimals: 18,
    nftfyAddress: '0x727638740980aA0aA0B346d02dd91120Eaac75ed',
    erc721Addresses: [],
    balancer: {
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
      subgraphBackupUrl: 'https://ipfs.fleek.co/ipns/balancer-bucket.storage.fleek.co/balancer-exchange/pools',
      eth: '0x0000000000000000000000000000000000000000',
      weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      precision: 6,
      addresses: {
        bFactory: '0x9424B1412450D0f8Fc2255FAf6046b98213B76Bd',
        bActions: '0xde4A25A0b9589689945d842c5ba0CF4f0D4eB3ac',
        dsProxyRegistry: '0x4678f0a6958e4D2Bc4F1BAF7Bc52E8F3564f3fE4',
        exchangeProxy: '0x3E66B66Fd1d0b02fDa6C811Da9E0547970DB2f21',
        weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
      }
    }
  },
  {
    id: 42,
    name: 'kovan',
    infuraAddress: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    nfyAddress: '0x1528f3fcc26d13f7079325fb78d9442607781c8c',
    nfyDecimals: 18,
    nftfyAddress: '0x727638740980aA0aA0B346d02dd91120Eaac75ed',
    erc721Addresses: ['0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3'],
    balancer: {
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-kovan',
      subgraphBackupUrl: 'https://ipfs.fleek.co/ipns/balancer-bucket.storage.fleek.co/balancer-exchange-kovan/pools',
      eth: '0x0000000000000000000000000000000000000000',
      weth: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
      precision: 6,
      addresses: {
        bFactory: '0x8f7F78080219d4066A8036ccD30D588B416a40DB',
        bActions: '0x02EFDB542B9390ae7C1620B29674e02F9c0d86CC',
        dsProxyRegistry: '0x130767E0cf05469CF11Fa3fcf270dfC1f52b9072',
        exchangeProxy: '0x4e67bf5bD28Dd4b570FBAFe11D0633eCbA2754Ec',
        weth: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
        multicall: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A'
      }
    }
  }
]

export const getConfigByChainId = (id: number): ChainConfig => chains.find(chain => chain.id === id) || chains[0]
