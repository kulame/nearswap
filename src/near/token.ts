import { BN } from 'bn.js';
import * as math from 'mathjs';
import {
  ftGetStorageBalance,
  ONE_MORE_DEPOSIT_AMOUNT,
  ONE_YOCTO_NEAR,
} from 'near/FT';
import { TokenMetadata } from 'store/Database';
import {
  ACCOUNT_MIN_STORAGE_AMOUNT,
  currentStorageBalance,
  executeMultipleTransactions,
  wallet,
} from './Account';
import { DEX_CONTRACT_ID, NearFunctionCallOptions, Transaction } from './near';
import {
  MIN_DEPOSIT_PER_TOKEN,
  needDepositStorage,
  storageDepositAction,
  storageDepositForFTAction,
  STORAGE_PER_TOKEN,
} from './storage';
interface WithdrawActionOptions {
  tokenId: string;
  amount: string;
  unregister?: boolean;
}
export const checkTokenNeedsStorageDeposit = async () => {
  let storageNeeded: math.MathType = 0;

  const needDeposit = await needDepositStorage();
  if (needDeposit) {
    storageNeeded = Number(ONE_MORE_DEPOSIT_AMOUNT);
  } else {
    const balance = await Promise.resolve(
      currentStorageBalance(wallet.getAccountId()),
    );

    if (!balance) {
      storageNeeded = math.add(
        storageNeeded,
        Number(ACCOUNT_MIN_STORAGE_AMOUNT),
      );
    }

    if (new BN(balance?.available || '0').lt(MIN_DEPOSIT_PER_TOKEN)) {
      storageNeeded = math.add(storageNeeded, Number(STORAGE_PER_TOKEN));
    }
  }

  return storageNeeded ? storageNeeded.toString() : '';
};
export const registerTokenAndExchange = async (tokenId: string) => {
  const transactions: Transaction[] = [];
  const actions: NearFunctionCallOptions[] = [
    {
      methodName: 'register_tokens',
      args: { token_ids: [tokenId] },
      amount: ONE_YOCTO_NEAR,
    },
  ];

  const neededStorage = await checkTokenNeedsStorageDeposit();

  if (neededStorage) {
    actions.unshift(storageDepositAction({ amount: neededStorage }));
  }

  transactions.push({
    receiverId: DEX_CONTRACT_ID,
    functionCalls: actions,
  });

  const exchangeBalanceAtFt = await ftGetStorageBalance(
    tokenId,
    DEX_CONTRACT_ID,
  );
  if (!exchangeBalanceAtFt || exchangeBalanceAtFt.total === '0') {
    transactions.push({
      receiverId: tokenId,
      functionCalls: [storageDepositForFTAction()],
    });
  }

  return executeMultipleTransactions(transactions);
};

export const withdrawAction = ({
  tokenId,
  amount,
  unregister = false,
}: WithdrawActionOptions) => ({
  methodName: 'withdraw',
  args: { token_id: tokenId, amount, unregister },
  gas: '100000000000000',
  amount: ONE_YOCTO_NEAR,
});

export const nearMetadata: TokenMetadata = {
  id: 'NEAR',
  name: 'NEAR',
  symbol: 'NEAR',
  decimals: 24,
  icon: 'https://near.org/wp-content/themes/near-19/assets/img/brand-icon.png',
  amount: 0,
};
