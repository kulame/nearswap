import { wallet } from 'near/Account';
import {
  ftGetBalance,
  ftGetTokenMetadata,
  getTokenBalances,
  getUserRegisteredTokens,
  TokenBalancesView,
} from 'near/FT';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TokenMetadata } from 'store/Database';
import {
  toPrecision,
  toReadableNumber,
  toRoundedReadableNumber,
} from 'utils/numbers';
import { toRealSymbol } from 'utils/token';

export const useTokens = (extraTokenIds: string[] = []): TokenMetadata[] => {
  const [tokens, setTokens] = useState<TokenMetadata[]>([]);

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

export const useTokenBalances = () => {
  const [balances, setBalances] = useState<TokenBalancesView>();

  useEffect(() => {
    getTokenBalances()
      .then(setBalances)
      .catch(() => setBalances({}));
  }, []);

  return balances;
};

export const getDepositableBalance = async (
  tokenId: string,
  decimals: number,
) => {
  if (tokenId === 'NEAR') {
    if (wallet.isSignedIn()) {
      return wallet
        .account()
        .getAccountBalance()
        .then(({ available }) => {
          return toReadableNumber(decimals, available);
        });
    } else {
      return toReadableNumber(decimals, '0');
    }
  } else if (tokenId) {
    return ftGetBalance(tokenId)
      .then((res) => {
        return toReadableNumber(decimals, res);
      })
      .catch((res) => '0');
  } else {
    return '';
  }
};

export const useTokensData = (
  tokens: TokenMetadata[],
  balances?: TokenBalancesView,
) => {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState<TokenMetadata[]>([]);
  const fetchIdRef = useRef(0);
  const setResultAtIndex = (data: TokenMetadata, index: number) => {
    setResult((oldResults) => {
      const newResults = [...oldResults];
      newResults[index] = data;
      return newResults;
    });
    setCount((c) => c + 1);
  };

  const trigger = useCallback(() => {
    if (!!balances) {
      setCount(0);
      setResult([]);
      const currentFetchId = fetchIdRef.current;
      for (let i = 0; i < tokens.length; i++) {
        const index = i;
        const item = tokens[index];
        getDepositableBalance(item.id, item.decimals)
          .then((max: string) => {
            if (currentFetchId !== fetchIdRef.current) {
              throw new Error();
            }
            return max;
          })
          .then((max: string) => {
            const nearCount = toPrecision(max, 3) || '0';
            const refCount = toRoundedReadableNumber({
              decimals: item.decimals,
              number: balances ? balances[item.id] : '0',
            });
            return {
              ...item,
              asset: toRealSymbol(item.symbol),
              near: Number(nearCount.replace(/[\,]+/g, '')),
              ref: Number(toPrecision(refCount, 3).replace(/[\,]+/g, '')),
              total:
                Number(nearCount.replace(/[\,]+/g, '')) +
                Number(toPrecision(refCount, 3).replace(/[\,]+/g, '')),
            };
          })
          .then((d: TokenMetadata) => setResultAtIndex(d, index))
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [balances]);

  useEffect(() => {
    trigger();
  }, [tokens, tokens.length]);

  return {
    trigger,
    loading: count < tokens.length,
    tokensData: result,
  };
};
