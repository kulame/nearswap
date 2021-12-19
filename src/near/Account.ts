import BN from 'bn.js';
import { baseDecode } from 'borsh';
import * as nearAPI from 'near-api-js';
import { ConnectedWalletAccount, Near, utils } from 'near-api-js';
import {
  Action,
  createTransaction,
  functionCall,
} from 'near-api-js/lib/transaction';
import { PublicKey } from 'near-api-js/lib/utils';
import { createContext } from 'react';
import { DexViewFunction, NearFunctionCallOptions, Transaction } from './FT';

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

export const ACCOUNT_MIN_STORAGE_AMOUNT = '0.003';
export const near = new Near(config);

class SpecialWalletAccount extends ConnectedWalletAccount {
  async sendTransactionWithActions(receiverId: string, actions: Action[]) {
    return this.signAndSendTransaction(receiverId, actions);
  }

  async createTransaction({
    receiverId,
    actions,
    nonceOffset = 1,
  }: {
    receiverId: string;
    actions: Action[];
    nonceOffset?: number;
  }) {
    const localKey = await this.connection.signer.getPublicKey(
      this.accountId,
      this.connection.networkId,
    );
    const accessKey = await this.accessKeyForTransaction(
      receiverId,
      actions,
      localKey,
    );
    if (!accessKey) {
      throw new Error(
        `Cannot find matching key for transaction sent to ${receiverId}`,
      );
    }

    const block = await this.connection.provider.block({ finality: 'final' });
    const blockHash = baseDecode(block.header.hash);

    const publicKey = PublicKey.from(accessKey.public_key);
    const nonce = accessKey.access_key.nonce + nonceOffset;

    return createTransaction(
      this.accountId,
      publicKey,
      receiverId,
      nonce,
      actions,
      blockHash,
    );
  }
}

export default class SpecialWallet extends WalletConnection {
  _connectedAccount!: SpecialWalletAccount;

  account() {
    if (!this._connectedAccount) {
      this._connectedAccount = new SpecialWalletAccount(
        this,
        this._near.connection,
        this._authData.accountId,
      );
    }

    return this._connectedAccount;
  }

  createTransaction({
    receiverId,
    actions,
    nonceOffset = 1,
  }: {
    receiverId: string;
    actions: Action[];
    nonceOffset?: number;
  }) {
    return this._connectedAccount.createTransaction({
      receiverId,
      actions,
      nonceOffset,
    });
  }
}
export const wallet = new SpecialWallet(near, null);

export const getWallet = async () => {
  console.log('Toggle Wallet Model');
  const near = await connect(config);

  // create wallet connection
  const wallet = new WalletConnection(near, null);
  return wallet;
};

export interface AccountStorageView {
  total: string;
  available: string;
}

export const currentStorageBalance = (
  accountId: string,
): Promise<AccountStorageView> => {
  return DexViewFunction({
    methodName: 'storage_balance_of',
    args: { account_id: accountId },
  });
};

type StateType = [
  nearAPI.WalletConnection | null,
  (wallet: nearAPI.WalletConnection) => void,
];

export const NearWalletContext = createContext<StateType>({} as StateType);

export const getGas = (gas?: string) =>
  gas ? new BN(gas) : new BN('100000000000000');
export const getAmount = (amount?: string) =>
  amount ? new BN(utils.format.parseNearAmount(amount)) : new BN('0');
export const executeMultipleTransactions = async (
  transactions: Transaction[],
  callbackUrl?: string,
) => {
  const nearTransactions = await Promise.all(
    transactions.map((t, i) => {
      return wallet.createTransaction({
        receiverId: t.receiverId,
        nonceOffset: i + 1,
        actions: t.functionCalls.map((fc: NearFunctionCallOptions) =>
          functionCall(
            fc.methodName,
            fc.args,
            getGas(fc.gas),
            getAmount(fc.amount),
          ),
        ),
      });
    }),
  );

  return wallet.requestSignTransactions(nearTransactions, callbackUrl);
};
