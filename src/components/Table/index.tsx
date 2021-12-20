import Token from 'components/Tokens';
import { TokenBalancesView } from 'near/FT';
import { TiArrowSortedUp } from 'react-icons/ti';
import { FormattedMessage } from 'react-intl';
import { TokenMetadata } from 'store/Database';
import { toReadableNumber } from 'utils/numbers';

interface TokenListProps {
  tokens: TokenMetadata[];
  sortBy: string;
  currentSort: string;
  onSortChange: (sortBy: string) => void;
  onClick: (token: TokenMetadata) => void;
  balances?: TokenBalancesView;
}

export default function Table({
  tokens,
  sortBy,
  currentSort,
  onSortChange,
  onClick,
  balances,
}: TokenListProps) {
  return tokens.length > 0 ? (
    <table className="w-full mt-10 text-sm text-left text-gray-400 table-auto">
      <thead
        className="sticky z-30 -top-6"
        style={{ background: 'rgb(29, 41, 50)' }}
      >
        <tr className="font-normal border-b border-gray-500 border-opacity-30">
          <th
            className={`font-normal w-2/5 pb-2 pl-6  ${
              sortBy === 'asset' ? 'text-greenLight' : ''
            }`}
          >
            <FormattedMessage id="asset_label" defaultMessage="Asset" />
            <TiArrowSortedUp
              onClick={() => onSortChange('asset')}
              className={`inline-block cursor-pointer ${
                sortBy === 'asset' && currentSort === 'down'
                  ? 'transform rotate-180'
                  : ''
              }`}
            />
          </th>
          <th
            className={`font-normal pb-2 w-1/5  ${
              sortBy === 'near' ? 'text-greenLight' : ''
            }`}
          >
            NEAR
            <TiArrowSortedUp
              onClick={() => onSortChange('near')}
              className={`inline-block cursor-pointer ${
                sortBy === 'near' && currentSort === 'down'
                  ? 'transform rotate-180'
                  : ''
              }`}
            />
          </th>
          <th
            className={`font-normal pb-2 w-1/5 ${
              sortBy === 'ref' ? 'text-greenLight' : ''
            }`}
          >
            REF
            <TiArrowSortedUp
              onClick={() => onSortChange('ref')}
              className={`inline-block cursor-pointer ${
                sortBy === 'ref' && currentSort === 'down'
                  ? 'transform rotate-180'
                  : ''
              }`}
            />
          </th>
          <th
            className={`font-normal pb-2 pr-3 w-1/5 ${
              sortBy === 'total' ? 'text-greenLight' : ''
            }`}
          >
            <FormattedMessage id="total_label" defaultMessage="Total" />
            <TiArrowSortedUp
              onClick={() => onSortChange('total')}
              className={`inline-block cursor-pointer ${
                sortBy === 'total' && currentSort === 'down'
                  ? 'transform rotate-180'
                  : ''
              }`}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {tokens.filter(Boolean).map((token) => (
          <Token
            key={token.id}
            token={token}
            onClick={onClick}
            // render={render}
            sortBy={sortBy}
            totalAmount={
              balances
                ? toReadableNumber(token.decimals, balances[token.id])
                : ''
            }
          />
        ))}
      </tbody>
    </table>
  ) : (
    <table className="w-full mt-10 text-sm text-left text-gray-400 table-auto"></table>
  );
}
