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

export interface TokenMetadata {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
  ref?: number;
  near?: number;
  total?: number;
  amountLabel?: string;
  amount?: number;
}

export interface TokenBalancesView {
  [tokenId: string]: string;
}

export interface NearViewFunctionOptions {
  methodName: string;
  args: object;
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
