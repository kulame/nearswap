import BN from 'bn.js';
import { wallet } from 'near/Account';
import {
  DexViewFunction,
  DEX_CONTRACT_ID,
  NearFunctionCallOptions,
} from './FT';

export const MIN_DEPOSIT_PER_TOKEN = new BN('3000000000000000000000');

export const STORAGE_PER_TOKEN = '0.003';
export const STORAGE_TO_REGISTER_WITH_FT = '0.1';

interface StorageDepositActionOptions {
  accountId?: string;
  registrationOnly?: boolean;
  amount: string;
}
export const needDepositStorage = async (accountId = wallet.getAccountId()) => {
  const storage = await DexViewFunction({
    methodName: 'get_user_storage_state',
    args: { account_id: accountId },
  });

  return new BN(storage?.deposit).lte(new BN(storage?.usage));
};

export const storageDepositAction = ({
  accountId = wallet.getAccountId(),
  registrationOnly = false,
  amount,
}: StorageDepositActionOptions): NearFunctionCallOptions => ({
  methodName: 'storage_deposit',
  args: {
    account_id: accountId,
    registration_only: registrationOnly,
  },
  amount,
});

export const storageDepositForFTAction = () =>
  storageDepositAction({
    accountId: DEX_CONTRACT_ID,
    amount: STORAGE_TO_REGISTER_WITH_FT,
  });
