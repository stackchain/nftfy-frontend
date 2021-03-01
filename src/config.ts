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
    id: 4,
    name: 'rinkeby',
    infuraAddress: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    nfyAddress: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    nfyDecimals: 18,
    nftfyAddress: '0x727638740980aA0aA0B346d02dd91120Eaac75ed',
    erc721Addresses: [
      '0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3',
      '0xe48773a75b337ac258a471c00c6b450907b614bc',
      '0x0934d8e80b3f40c19a2f92a280618af3d0266d4d',
      '0x0d86198a785d9cabf3ce9a2032d6cf4a1ec1235b',
      '0x2fe4fb7b83bb01679cbd03531c5cab63b0e2e6d7',
      '0xa2196b05547aedccd775a459c927d7559b16741a',
      '0x0d86198a785d9cabf3ce9a2032d6cf4a1ec1235b',
      '0x79e911825d9273e4127427a872a3f17d37252a5b',
      '0x466f19280ca84ee9d7953c5d12a2b4edb7b51bfb',
      '0x406cfa3147c190660618f3f1fddf166f8508e1f9',
      '0x8582029d31fe1373d27769a9ec64a9195e679eb7',
      '0xe96b4c84ed3732f320421f09cefcc4f97355e905',
      '0x3b829cfd48e2c7df548cab8af0e42ec788869134',
      '0xdee1031c5d64788976e78d78c63c2fd6b411c4ee',
      '0x74c9ea159f5f613f1f70f45f1fc1b5691f9cb97b'
    ],
    balancer: {
      subgraphUrl: '',
      subgraphBackupUrl: '',
      weth: '',
      precision: 6,
      addresses: {
        bFactory: '',
        bActions: '',
        dsProxyRegistry: '',
        exchangeProxy: '',
        weth: '',
        multicall: ''
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
