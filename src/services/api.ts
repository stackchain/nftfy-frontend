import axios from 'axios';
import Portis from '@portis/web3';
import Web3 from 'web3';

declare global {
  interface Window { ethereum: any; web3: any; }
}

export type WalletName = 'metamask' | 'portis';

export interface Wallet {
  network: string;
  getAccounts(): Promise<string[]>;
  selectAccount(address: string): Promise<void>;
  validateAddress(address: string): Promise<boolean>;
  getEtherBalance(address: string): Promise<string>;
  listAccountShares(address: string, offset: number, limit: number): Promise<{ items: ERC20[]; count: number }>;
  listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>;
  registerERC721(address: string): Promise<boolean>;
  listPaymentTokens(): Promise<ERC20[]>;
}

export interface ERC20 {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  getTotalSupply(): Promise<string>;
  getAccountBalance(address: string): Promise<string>;
  validateAmount(amount: string): Promise<boolean>;

  // Nftfy extensions
  getPaymentToken(): Promise<ERC20 | null>;
  getExitPrice(): Promise<string>;
  getSharePrice(): Promise<string>;
  getSharesCount(): Promise<string>;

  isRedeemable(): Promise<boolean>;
  getAccountRedeemAmount(address: string): Promise<string>;
  redeem(address: string): Promise<void>;

  isClaimable(): Promise<boolean>;
  getVaultBalance(): Promise<string>;
  getAccountVaultBalance(address: string): Promise<string>;
  claim(address: string): Promise<void>;
}

export interface ERC721 {
  address: string;
  name: string;
  symbol: string;
  getItem(tokenId: string): Promise<ERC721Item>;
  listAllItems(offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>;
  listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }>;

  // Nftfy extensions
  getWrapper(): Promise<ERC721 | null>;
}

export interface ERC721Item {
  contract: ERC721;
  tokenId: string;
  name?: string;
  description?: string;
  imageUri?: string;
  getTokenOwner(): Promise<string>;

  // Nftfy extensions
  isSecuritized(): Promise<boolean>;
  listAllShares(offset: number, limit: number): Promise<{ items: ERC20[]; count: number }>;
  securitize(sharesCount: string, exitPrice: string, paymentToken: ERC20 | null): Promise<void>;
}

async function getWeb3(walletName: WalletName): Promise<Web3> {
  switch (walletName) {
  case 'metamask':
    if (window.ethereum) {
      await window.ethereum.enable();
      return new Web3(window.ethereum);
    }
    if (!window.web3) throw new Error('Unsupported wallet');
    return new Web3(window.web3.currentProvider);
  case 'portis':
    const portis = new Portis('a0fa4f71-2d8e-4a67-baa6-33ab41c3ba26', 'mainnet');
    return new Web3(portis.provider);
  }
}

const NFTFY_ABI = require('../contracts/Nftfy.json').abi;
const ERC721_ABI = require('../contracts/ERC721Wrapper.json').abi;
const ERC20_ABI = require('../contracts/ERC721Shares.json').abi;

export async function listSupportedWallets(): Promise<WalletName[]> {
  if (window.ethereum || window.web3) return ['metamask', 'portis'];
  return ['portis'];
}

export async function initializeWallet(walletName: WalletName): Promise<Wallet> {
  let account = '0x0000000000000000000000000000000000000000';

  const web3 = await getWeb3(walletName);
  const network = await web3.eth.net.getNetworkType();
  const contracts: ERC721[] = await listNonFungibleTokens();

  async function nftfy(): Promise<string> {
    switch (network) {
    case 'main': return '0xb71554F46ecAFb851D121320f6dc3A29e9cd81a7';
    case 'ropsten': return '0xb71554F46ecAFb851D121320f6dc3A29e9cd81a7';
    case 'rinkeby': return '0xb71554F46ecAFb851D121320f6dc3A29e9cd81a7';
    case 'kovan': return '0xb71554F46ecAFb851D121320f6dc3A29e9cd81a7';
    case 'goerli': return '0xb71554F46ecAFb851D121320f6dc3A29e9cd81a7';
    }
    throw new Error('Unsupported network');
  }

  function valid(amount: string, decimals: number): boolean {
    const regex = new RegExp('^\\d+' + (decimals > 0 ? '(\\.\\d{1,' + decimals + '})?' : '') + '$');
    return regex.test(amount);
  }

  function coins(units: string, decimals: number): string {
    if (!valid(units, 0)) throw new Error('Invalid amount');
    const s = units.padStart(1 + decimals, '0');
    return s.slice(0, -decimals) + '.' + s.slice(-decimals);
  }

  function units(coins: string, decimals: number): string {
    if (!valid(coins, decimals)) throw new Error('Invalid amount');
    let i = coins.indexOf('.');
    if (i < 0) i = coins.length;
    const s = coins.slice(i + 1);
    return coins.slice(0, i) + s + '0'.repeat(decimals - s.length);
  }

  async function newERC721Item(contract: ERC721, tokenId: string): Promise<ERC721Item> {
    let self: ERC721Item;

    const { name, description, imageUri } = await loadMetadata();

    function getTokenURI(): Promise<string> {
      const abi = new web3.eth.Contract(ERC721_ABI, contract.address);
      return abi.methods.tokenURI(tokenId).call();
    }

    async function loadMetadata(): Promise<{ name?: string; description?: string; imageUri?: string }> {
      try {
        const CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/';
        const uri = await getTokenURI();
        const headers: { [key: string]: string } = {};
        headers['Origin'] = 'https://nftfy.tk';
        const response = await axios.get(CORS_PREFIX + uri, { headers });
        const { name, description, image } = response.data;
        let imageUri = image ? CORS_PREFIX + image : image;
        return { name, description, imageUri };
      } catch (e) {
        console.log('ERC721Item.loadMetadata', contract.address, tokenId, e.message);
        return {};
      }
    }

    function getTokenOwner(): Promise<string> {
      const abi = new web3.eth.Contract(ERC721_ABI, contract.address);
      return abi.methods.ownerOf(tokenId).call();
    }

    async function isSecuritized(): Promise<boolean> {
      const wrapper = await contract.getWrapper();
      if (wrapper == null) return false;
      const abi = new web3.eth.Contract(ERC721_ABI, wrapper.address);
      return abi.methods.securitized(tokenId).call();
    }

    async function listAllShares(offset: number, limit: number): Promise<{ items: ERC20[]; count: number }> {
      if (offset < 0) throw new Error('Invalid offset');
      if (limit < 0) throw new Error('Invalid limit');
      const wrapper = await contract.getWrapper();
      if (wrapper == null) return { items: [], count: 0 };
      const abi = new web3.eth.Contract(ERC721_ABI, wrapper.address);
      const items: ERC20[] = [];
      const count = Number(await abi.methods.historyLength(tokenId).call());
      for (let i = offset; i < Math.min(offset + limit, count); i++) {
        const address = await abi.methods.historyAt(tokenId, i).call();
        items.push(await newERC20(address));
      }
      return { items, count };
    }

    async function approve(address: string): Promise<void> {
      const abi = new web3.eth.Contract(ERC721_ABI, contract.address);
      return new Promise((resolve, reject) => {
        abi.methods.approve(address, tokenId)
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject);
      });
    }

    async function securitize(sharesCount: string, exitPrice: string, paymentToken: ERC20 | null): Promise<void> {
      const address = await nftfy();
      const abi = new web3.eth.Contract(NFTFY_ABI, address);
      const decimals = 8;
      const paymentDecimals = paymentToken ? paymentToken.decimals : 18;
      const paymentAddress = paymentToken ? paymentToken.address : '0x0000000000000000000000000000000000000000';
      await approve(address);
      return new Promise((resolve, reject) => {
        abi.methods.securitize(contract.address, tokenId, units(sharesCount, decimals), decimals, units(exitPrice, paymentDecimals), paymentAddress, false)
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject);
      });
    }

    return (self = {
      contract,
      tokenId,
      name,
      description,
      imageUri,
      getTokenOwner,
      isSecuritized,
      listAllShares,
      securitize,
    });
  }

  async function newERC721(address: string, defaultName = '', defaultSymbol = ''): Promise<ERC721> {
    let self: ERC721;

    const abi = new web3.eth.Contract(ERC721_ABI, address);
    const name = await (async () => { try { return await abi.methods.name().call() } catch (e) { return defaultName } })();
    const symbol = await (async () => { try { return await abi.methods.symbol().call() } catch (e) { return defaultSymbol } })();

    function getItem(tokenId: string): Promise<ERC721Item> {
      return newERC721Item(self, tokenId);
    }

    async function listAllItems(offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }> {
      if (offset < 0) throw new Error('Invalid offset');
      if (limit < 0) throw new Error('Invalid limit');
      const items: ERC721Item[] = [];
      const count = Number(await abi.methods.totalSupply().call());
      for (let i = offset; i < Math.min(offset + limit, count); i++) {
        const tokenId = await abi.methods.tokenByIndex(i).call();
        items.push(await newERC721Item(self, tokenId));
      }
      return { items, count };
    }

    async function listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }> {
      if (offset < 0) throw new Error('Invalid offset');
      if (limit < 0) throw new Error('Invalid limit');
      const items: ERC721Item[] = [];
      const count = Number(await abi.methods.balanceOf(address).call());
      for (let i = offset; i < Math.min(offset + limit, count); i++) {
        const tokenId = await abi.methods.tokenOfOwnerByIndex(address, i).call();
        items.push(await newERC721Item(self, tokenId));
      }
      return { items, count };
    }

    async function getWrapper(): Promise<ERC721 | null> {
      const abi = new web3.eth.Contract(NFTFY_ABI, await nftfy());
      const _address = abi.methods.wrappers(address).call();
      if (_address == '0x0000000000000000000000000000000000000000') return null;
      return newERC721(_address);
    }

    return (self = {
      address,
      name,
      symbol,
      getItem,
      listAllItems,
      listAccountItems,
      getWrapper,
    });
  }

  async function newERC20(address: string, defaultName = '', defaultSymbol = '', defaultDecimals = 18): Promise<ERC20> {
    let self: ERC20;

    const abi = new web3.eth.Contract(ERC20_ABI, address);
    const name = await (async () => { try { return await abi.methods.name().call() } catch (e) { return defaultName } })();
    const symbol = await (async () => { try { return await abi.methods.symbol().call() } catch (e) { return defaultSymbol } })();
    const decimals = await (async () => { try { return Number(await abi.methods.decimals().call()) } catch (e) { return defaultDecimals } })();

    async function getTotalSupply(): Promise<string> {
      return coins(await abi.methods.totalSupply().call(), decimals);
    }

    async function getAccountBalance(address: string): Promise<string> {
      return coins(await abi.methods.balanceOf(address).call(), decimals);
    }

    async function validateAmount(amount: string): Promise<boolean> {
      return valid(amount, decimals);
    }

    async function getPaymentToken(): Promise<ERC20 | null> {
      const address = await abi.methods.paymentToken().call();
      if (address == '0x0000000000000000000000000000000000000000') return null;
      return newERC20(address);
    }

    async function getExitPrice(): Promise<string> {
      const paymentToken = await getPaymentToken();
      const decimals = paymentToken ? paymentToken.decimals : 18;
      return coins(await abi.methods.exitPrice().call(), decimals);
    }

    async function getSharePrice(): Promise<string> {
      const paymentToken = await getPaymentToken();
      const decimals = paymentToken ? paymentToken.decimals : 18;
      return coins(await abi.methods.sharePrice().call(), decimals);
    }

    async function getSharesCount(): Promise<string> {
      const paymentToken = await getPaymentToken();
      return coins(await abi.methods.sharesCount().call(), decimals);
    }

    async function isRedeemable(): Promise<boolean> {
      return !await abi.methods.released().call();
    }

    async function getAccountRedeemAmount(address: string): Promise<string> {
      const paymentToken = await getPaymentToken();
      const decimals = paymentToken ? paymentToken.decimals : 18;
      return coins(await abi.methods.redeemAmountOf(address).call(), decimals);
    }

    async function approve(paymentToken: ERC20, redeemAmount: string): Promise<void> {
      const decimals = paymentToken.decimals;
      const abi = new web3.eth.Contract(ERC20_ABI, paymentToken.address);
      return new Promise((resolve, reject) => {
        abi.methods.approve(address, units(redeemAmount, decimals))
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject);
      });
    }

    async function redeem(address: string): Promise<void> {
      const paymentToken = await getPaymentToken();
      const redeemAmount = await getAccountRedeemAmount(account);
      if (paymentToken == null) {
        const decimals = 18;
        return new Promise((resolve, reject) => {
          abi.methods.redeem()
            .send({ from: account, value: units(redeemAmount, decimals) })
            .once('confirmation', (confNumber: any, receipt: any) => resolve())
            .once('error', reject);
        });
      } else {
        await approve(paymentToken, redeemAmount);
        return new Promise((resolve, reject) => {
          abi.methods.redeem()
            .send({ from: account })
            .once('confirmation', (confNumber: any, receipt: any) => resolve())
            .once('error', reject);
        });
      }
    }

    function isClaimable(): Promise<boolean> {
      return abi.methods.released().call();
    }

    async function getVaultBalance(): Promise<string> {
      const paymentToken = await getPaymentToken();
      const decimals = paymentToken ? paymentToken.decimals : 18;
      return coins(await abi.methods.vaultBalance().call(), decimals);
    }

    async function getAccountVaultBalance(address: string): Promise<string> {
      const paymentToken = await getPaymentToken();
      const decimals = paymentToken ? paymentToken.decimals : 18;
      return coins(await abi.methods.vaultBalanceOf(address).call(), decimals);
    }

    function claim(address: string): Promise<void> {
      return new Promise((resolve, reject) => {
        abi.methods.claim()
          .send({ from: account })
          .once('confirmation', (confNumber: any, receipt: any) => resolve())
          .once('error', reject);
      });
    }

    return (self = {
      address,
      name,
      symbol,
      decimals,
      getTotalSupply,
      getAccountBalance,
      validateAmount,
      getPaymentToken,
      getExitPrice,
      getSharePrice,
      getSharesCount,
      isRedeemable,
      getAccountRedeemAmount,
      redeem,
      isClaimable,
      getVaultBalance,
      getAccountVaultBalance,
      claim,
    });
  }

  function getAccounts(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((error, accounts) => {
        if (error) return reject(error);
        return resolve(accounts);
      });
    });
  }

  async function selectAccount(address: string): Promise<void> {
    if (!await validateAddress(address)) throw new Error('Invalid address');
    account = address;
  }

  async function validateAddress(address: string): Promise<boolean> {
    return web3.utils.isAddress(address);
  }

  function getEtherBalance(address: string): Promise<string> {
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(address, 'latest', (error, balance) => {
        if (error) return reject(error);
        return resolve(coins(balance, 18));
      });
    });
  }

  async function listAccountShares(address: string, offset: number, limit: number): Promise<{ items: ERC20[]; count: number }> {
    if (offset < 0) throw new Error('Invalid offset');
    if (limit < 0) throw new Error('Invalid limit');
    let items: ERC20[] = [];
    let count = 0;
    for (const contract of contracts) {
      const wrapper = await contract.getWrapper();
      if (wrapper == null) continue;
      const { items: subitems } = await wrapper.listAllItems(0, Number.MAX_SAFE_INTEGER);
      for (const subitem of subitems) {
        const { items: subsubitems } = await subitem.listAllShares(0, Number.MAX_SAFE_INTEGER);
        for (const subsubitem of subsubitems) {
          const balance = await subsubitem.getAccountBalance(address);
          if (balance != coins('0', subsubitem.decimals)) {
            if (count == offset && limit > 0) {
              items.push(subsubitem);
              offset++;
              limit--;
            }
            count++;
          }
        }
      }
    }
    return { items, count };
  }

  async function listAccountItems(address: string, offset: number, limit: number): Promise<{ items: ERC721Item[]; count: number }> {
    if (offset < 0) throw new Error('Invalid offset');
    if (limit < 0) throw new Error('Invalid limit');
    let items: ERC721Item[] = [];
    let count = 0;
    for (const contract of contracts) {
      const { items: subitems, count: subcount } = await contract.listAccountItems(address, offset, limit);
      items = items.concat(subitems);
      count += subcount;
      offset += subitems.length;
      limit -= subitems.length;
      if (limit == 0) continue;
      offset -= subcount;
    }
    return { items, count };
  }

  async function registerERC721(address: string): Promise<boolean> {
    for (const contract of contracts) {
      if (address == contract.address) return false;
    }
    contracts.push(await newERC721(address));
    return true;
  }

  async function listPaymentTokens(): Promise<ERC20[]> {
    const contracts: ERC20[] = [];
    switch (network) {
    case 'main':
      contracts.push(await newERC20('0x6B175474E89094C44Da98b954EedeAC495271d0F')); // DAI
      contracts.push(await newERC20('0xdAC17F958D2ee523a2206206994597C13D831ec7')); // USDT
      contracts.push(await newERC20('0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599')); // WBTC
      contracts.push(await newERC20('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')); // WETH
      break;
    case 'ropsten':
      contracts.push(await newERC20('0x1C4E37Cb2A1DE715A73Cd7Fc1aF0855Beee98209')); // BUK
      break;
    case 'rinkeby':
      contracts.push(await newERC20('0x1C4E37Cb2A1DE715A73Cd7Fc1aF0855Beee98209')); // BUK
      break;
    case 'kovan':
      contracts.push(await newERC20('0x1C4E37Cb2A1DE715A73Cd7Fc1aF0855Beee98209')); // BUK
      break;
    case 'goerli':
      contracts.push(await newERC20('0x1C4E37Cb2A1DE715A73Cd7Fc1aF0855Beee98209')); // BUK
      break;
    }
    return contracts;
  }

  async function listNonFungibleTokens(): Promise<ERC721[]> {
    const contracts: ERC721[] = [];
    switch (network) {
    case 'main':
      contracts.push(await newERC721('0x06012c8cf97BEaD5deAe237070F9587f8E7A266d')); // CK
      contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')); // ENS
      contracts.push(await newERC721('0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d')); // LAND
      contracts.push(await newERC721('0xFBeef911Dc5821886e1dda71586d90eD28174B7d')); // KODA
      break;
    case 'ropsten':
      contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')); // ENS
      contracts.push(await newERC721('0x7A73483784ab79257bB11B96Fd62A2C3AE4Fb75B')); // LAND
      contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')); // KIE
      contracts.push(await newERC721('0x29a3f97E9AC395E2E1BFa789bbBbb5468E6022af')); // KODA
      break;
    case 'rinkeby':
      contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')); // ENS
      contracts.push(await newERC721('0x28bEf22DF3e2040A4bE64A9Ca0e8b5Ae2B91462D')); // LAND
      contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')); // KIE
      contracts.push(await newERC721('0x2Df6816286c583A7EF8637CD4b7Cc1CC62F6161E')); // KODA
      break;
    case 'kovan':
      contracts.push(await newERC721('0x537263c440943f6a6808bCb8CcB3fe03EE838aD1')); // LAND
      contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')); // KIE
      break;
    case 'goerli':
      contracts.push(await newERC721('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85', 'Ethereum Name Service', 'ENS')); // ENS
      contracts.push(await newERC721('0xE0394f4404182F537AC9F2F9695a4a4CD74a1ea3')); // KIE
      break;
    }
    return contracts;
  }

  return {
    network,
    getAccounts,
    selectAccount,
    validateAddress,
    getEtherBalance,
    listAccountShares,
    listAccountItems,
    registerERC721,
    listPaymentTokens,
  }
}
