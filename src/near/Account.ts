import * as nearAPI from 'near-api-js';
import { createContext } from 'react';
const { connect, keyStores, WalletConnection } = nearAPI;

const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
};

export const getWallet = async () => {
  console.log('Toggle Wallet Model');
  const near = await connect(config);

  // create wallet connection
  const wallet = new WalletConnection(near, null);
  return wallet;
};

type StateType = [WalletConnection | null, (wallet: WalletConnection) => void];
export const NearWalletContext = createContext<StateType>({} as StateType);
