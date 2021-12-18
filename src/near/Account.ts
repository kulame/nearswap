import * as nearAPI from 'near-api-js';

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

export const signIn = async () => {
  console.log('Toggle Wallet Model');
  const near = await connect(config);

  // create wallet connection
  const wallet = new WalletConnection(near, null);
  wallet.requestSignIn();
};
