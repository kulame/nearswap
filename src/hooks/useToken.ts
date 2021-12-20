import { wallet } from 'near/Account';
import {
  ftGetBalance,
  ftGetTokenMetadata,
  getUserRegisteredTokens,
} from 'near/FT';
import { useEffect, useState } from 'react';
import { TokenMetadata } from 'store/Database';
import { toReadableNumber } from 'utils/numbers';

export const useTokens = (extraTokenIds: string[] = []) => {
  const [tokens, setTokens] = useState<TokenMetadata[]>();

  useEffect(() => {
    getUserRegisteredTokens()
      .then((tokenIds) => {
        const allTokenIds = [...new Set([...tokenIds, ...extraTokenIds])];
        return Promise.all(
          allTokenIds.map((tokenId) => ftGetTokenMetadata(tokenId)),
        );
      })
      .then(setTokens);
  }, []);

  return tokens;
};

export const useDepositableBalance = (tokenId: string, decimals: number) => {
  const [depositable, setDepositable] = useState<string>('');
  const [max, setMax] = useState<string>('');
  useEffect(() => {
    if (tokenId === 'NEAR') {
      if (wallet.isSignedIn()) {
        wallet
          .account()
          .getAccountBalance()
          .then(({ available }) => setDepositable(available));
      } else {
        setDepositable('0');
      }
    } else if (tokenId) ftGetBalance(tokenId).then(setDepositable);
  }, [tokenId]);

  useEffect(() => {
    const max = toReadableNumber(decimals, depositable) || '0';
    setMax(max);
  }, [depositable]);

  return max;
};
