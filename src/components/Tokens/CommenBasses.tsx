import { FormattedMessage } from 'react-intl';
import { TokenMetadata } from 'store/Database';
import { toRealSymbol } from 'utils/token';

interface CommenBassesProps {
  tokens: TokenMetadata[];
  onClick: (token: TokenMetadata) => void;
}
const COMMEN_BASSES = [
  'REF',
  'wNEAR',
  'SKYWARD',
  'OCT',
  'DAI',
  'PARAS',
  'STNEAR',
  'wETH',
  'USDT',
  'PULSE',
  'AURORA',
  'ETH',
];

export default function CommenBasses({ tokens, onClick }: CommenBassesProps) {
  const commenBassesTokens = tokens.filter((item) => {
    return COMMEN_BASSES.indexOf(item?.symbol) > -1;
  });

  return (
    <section className="px-6">
      <div className="py-2 text-sm font-bold">
        <FormattedMessage id="popular_tokens" defaultMessage="Popular Tokens" />
      </div>
      <div className="flex flex-wrap w-full text-sm text-left xs:text-xs">
        {commenBassesTokens.map((token) => {
          return (
            <div
              className="pt-4 cursor-pointer mr-7"
              key={token.id}
              onClick={() => onClick && onClick(token)}
            >
              {token.icon && (
                <img
                  src={token.icon}
                  alt={toRealSymbol(token.symbol)}
                  className="inline-block mr-2 border rounded-full w-7 h-7 border-greenLight"
                />
              )}
              <span>{toRealSymbol(token.symbol)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
