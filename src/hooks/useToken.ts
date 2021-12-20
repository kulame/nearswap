import { ftGetTokenMetadata, getUserRegisteredTokens } from 'near/FT';
import { useEffect, useState } from 'react';
import { TokenMetadata } from 'store/Database';

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
