import db, { TokenMetadata } from 'store/Database';
import { toNonDivisibleNumber } from 'utils/numbers';
import { executeMultipleTransactions, wallet } from './Account';
import { DEX_CONTRACT_ID, NearViewFunctionOptions, Transaction } from './near';
import { storageDepositAction, STORAGE_TO_REGISTER_WITH_FT } from './storage';
import { checkTokenNeedsStorageDeposit } from './token';
import { unwrapNear, WRAP_NEAR_CONTRACT_ID } from './wrap-near';

export interface Token {
  readonly contract: string;
  readonly owner_id: string;
  readonly spec: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
}

export interface TokenBalancesView {
  [tokenId: string]: string;
}

export const ONE_YOCTO_NEAR = '0.000000000000000000000001';
export const ONE_MORE_DEPOSIT_AMOUNT = '0.01';

export const DexViewFunction = ({
  methodName,
  args,
}: NearViewFunctionOptions) => {
  return wallet.account().viewFunction(DEX_CONTRACT_ID, methodName, args);
};

export interface FTStorageBalance {
  total: string;
  available: string;
}

export const ftViewFunction = (
  tokenId: string,
  { methodName, args }: NearViewFunctionOptions,
) => {
  return wallet.account().viewFunction(tokenId, methodName, args);
};
export const ftGetStorageBalance = (
  tokenId: string,
  accountId = wallet.getAccountId(),
): Promise<FTStorageBalance | null> => {
  return ftViewFunction(tokenId, {
    methodName: 'storage_balance_of',
    args: { account_id: accountId },
  });
};

export const getUserRegisteredTokens = (
  accountId: string = wallet.getAccountId(),
): Promise<string[]> => {
  return DexViewFunction({
    methodName: 'get_user_tokens',
    args: { account_id: accountId },
  });
};

export const ftGetTokenMetadata = async (
  id: string,
): Promise<TokenMetadata> => {
  let metadata = await db.allTokens().where({ id }).first();
  if (!metadata) {
    metadata = await ftViewFunction(id, {
      methodName: 'ft_metadata',
      args: {},
    });
  }
  if (metadata) {
    return metadata;
  } else {
    return {
      id,
      name: id,
      symbol: id?.split('.')[0].slice(0, 8),
      decimals: 6,
      icon: undefined,
    };
  }
};

export const ftGetBalance = (tokenId: string) => {
  return ftViewFunction(tokenId, {
    methodName: 'ft_balance_of',
    args: { account_id: wallet.getAccountId() },
  });
};

export const getTokenBalances = (): Promise<TokenBalancesView> => {
  return DexViewFunction({
    methodName: 'get_deposits',
    args: { account_id: wallet.getAccountId() },
  });
};

interface WithdrawOptions {
  token: TokenMetadata;
  amount: string;
  unregister?: boolean;
}
export const withdraw = async ({
  token,
  amount,
  unregister = false,
}: WithdrawOptions) => {
  if (token.id === WRAP_NEAR_CONTRACT_ID) {
    return unwrapNear(amount);
  }

  const transactions: Transaction[] = [];
  const parsedAmount = toNonDivisibleNumber(token.decimals, amount);
  const ftBalance = await ftGetStorageBalance(token.id);

  transactions.unshift({
    receiverId: DEX_CONTRACT_ID,
    functionCalls: [
      {
        methodName: 'withdraw',
        args: { token_id: token.id, amount: parsedAmount, unregister },
        gas: '100000000000000',
        amount: ONE_YOCTO_NEAR,
      },
    ],
  });

  if (!ftBalance || ftBalance.total === '0') {
    transactions.unshift({
      receiverId: token.id,
      functionCalls: [
        storageDepositAction({
          registrationOnly: true,
          amount: STORAGE_TO_REGISTER_WITH_FT,
        }),
      ],
    });
  }

  const neededStorage = await checkTokenNeedsStorageDeposit();
  if (neededStorage) {
    transactions.unshift({
      receiverId: DEX_CONTRACT_ID,
      functionCalls: [storageDepositAction({ amount: neededStorage })],
    });
  }

  return executeMultipleTransactions(transactions);
};
