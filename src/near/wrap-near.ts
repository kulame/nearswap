import { utils } from 'near-api-js';
import { executeMultipleTransactions } from './Account';
import { ftGetStorageBalance, ONE_YOCTO_NEAR } from './FT';
import { DEX_CONTRACT_ID, Transaction } from './near';
import { storageDepositAction } from './storage';
import { checkTokenNeedsStorageDeposit, withdrawAction } from './token';

export const WRAP_NEAR_CONTRACT_ID = 'wrap.near';
export const NEW_ACCOUNT_STORAGE_COST = '0.00125';
export const unwrapNear = async (amount: string) => {
  const transactions: Transaction[] = [];

  const balance = await ftGetStorageBalance(WRAP_NEAR_CONTRACT_ID);

  if (!balance || balance.total === '0') {
    transactions.push({
      receiverId: WRAP_NEAR_CONTRACT_ID,
      functionCalls: [
        {
          methodName: 'storage_deposit',
          args: {},
          gas: '30000000000000',
          amount: NEW_ACCOUNT_STORAGE_COST,
        },
      ],
    });
  }

  transactions.push({
    receiverId: DEX_CONTRACT_ID,
    functionCalls: [
      withdrawAction({
        tokenId: WRAP_NEAR_CONTRACT_ID,
        amount: utils.format.parseNearAmount(amount) || '0',
      }),
    ],
  });

  transactions.push({
    receiverId: WRAP_NEAR_CONTRACT_ID,
    functionCalls: [
      {
        methodName: 'near_withdraw',
        args: { amount: utils.format.parseNearAmount(amount) },
        amount: ONE_YOCTO_NEAR,
      },
    ],
  });

  const needDeposit = await checkTokenNeedsStorageDeposit();
  if (needDeposit) {
    transactions.unshift({
      receiverId: DEX_CONTRACT_ID,
      functionCalls: [storageDepositAction({ amount: needDeposit })],
    });
  }

  return executeMultipleTransactions(transactions);
};

export const nearDeposit = async (amount: string) => {
  const transactions: Transaction[] = [
    {
      receiverId: WRAP_NEAR_CONTRACT_ID,
      functionCalls: [
        {
          methodName: 'near_deposit',
          args: {},
          gas: '50000000000000',
          amount,
        },
      ],
    },
  ];

  return executeMultipleTransactions(transactions);
};

export const nearWithdraw = async (amount: string) => {
  const transactions: Transaction[] = [
    {
      receiverId: WRAP_NEAR_CONTRACT_ID,
      functionCalls: [
        {
          methodName: 'near_withdraw',
          args: { amount: utils.format.parseNearAmount(amount) },
          amount: ONE_YOCTO_NEAR,
        },
      ],
    },
  ];

  return executeMultipleTransactions(transactions);
};
