import db, { TokenMetadata } from 'store/Database';
import { wallet } from './Account';

export const DEX_CONTRACT_ID = 'router.kula.testnet';
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

export interface NearViewFunctionOptions {
  methodName: string;
  args?: object;
}

export interface NearFunctionCallOptions extends NearViewFunctionOptions {
  gas?: string;
  amount?: string;
}
export interface Transaction {
  receiverId: string;
  functionCalls: NearFunctionCallOptions[];
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
    methodName: 'get_user_whitelisted_tokens',
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
