import { TokenBalancesView } from 'near/FT';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TokenMetadata } from 'store/Database';
import { toPrecision, toReadableNumber } from 'utils/numbers';
import { toRealSymbol } from 'utils/token';

export function ShowToken(
  props: TokenMetadata & {
    totalAmount: string;
    showTokenId: boolean;
  },
) {
  const { symbol, icon, amount, totalAmount, id, showTokenId } = props;
  return (
    <div
      className="token flex items-center justify-between pt-3.5 pb-3.5 text-white"
      title={totalAmount}
    >
      <div className="flex items-center">
        {icon ? (
          <img
            className="w-6 h-6 border rounded-full border-greenLight"
            src={icon}
            alt={toRealSymbol(symbol)}
          />
        ) : (
          <div className="w-6 h-6 border rounded-full border-greenLight"></div>
        )}
        <div className="pl-5 text-sm font-semibold">
          <div>{toRealSymbol(symbol)}</div>
          {showTokenId && (
            <div className="text-xs text-gray-400" title={id}>
              {`${id.substring(0, 25)}${id.length > 25 ? '...' : ''}`}
            </div>
          )}
        </div>
      </div>
      <div className="text-sm font-semibold">{amount}</div>
    </div>
  );
}

export function TokenList(props: {
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
  hideEmpty?: boolean;
  showTokenId?: boolean;
}) {
  const { tokens, balances, hideEmpty, showTokenId = false } = props;
  const [tokensList, setTokensList] = useState<TokenMetadata[]>([]);
  useEffect(() => {
    const tokensList = tokens.map((token) => {
      const item = token;
      const balance = balances[token.id] || '0';
      const amountLabel = toPrecision(
        toReadableNumber(token.decimals, balance),
        3,
        true,
      );
      const amount = Number(toReadableNumber(token.decimals, balance));
      return {
        ...item,
        amountLabel: amountLabel,
        amount: amount,
      };
    });
    setTokensList(tokensList);
  }, [tokens, balances]);
  return (
    <div className="divide-y divide-gray-600">
      {tokensList &&
        tokensList.length > 0 &&
        tokensList
          .sort((a, b) => {
            if (a.amount && b.amount) {
              return b.amount - a.amount;
            } else {
              return 0;
            }
          })
          .map((token) => {
            const balance = balances[token.id] || '0';
            if (balance === '0' && hideEmpty) return null;
            return (
              <ShowToken
                key={token.id}
                {...token}
                amount={token.amount}
                totalAmount={toReadableNumber(token.decimals, balance)}
                showTokenId={showTokenId}
              />
            );
          })}
      {tokens.length === 0 ? (
        <div className="pt-2 pb-2 text-xs font-semibold text-center text-gray-600">
          <FormattedMessage
            id="no_tokens_deposited"
            defaultMessage="No tokens deposited"
          />
        </div>
      ) : null}
    </div>
  );
}
