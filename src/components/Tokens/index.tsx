import { TokenMetadata } from 'store/Database';
import { toInternationalCurrencySystem } from 'utils/numbers';
import { toRealSymbol } from 'utils/token';

interface TokenProps {
  token: TokenMetadata;
  onClick: (token: TokenMetadata) => void;
  totalAmount?: string;
  sortBy?: string;
}

export default function Token({ token, onClick, sortBy }: TokenProps) {
  const { icon, symbol, id, near, ref, total } = token;
  return (
    <tr
      key={id}
      className="hover:bg-black hover:bg-opacity-10"
      onClick={() => onClick && onClick(token)}
    >
      <td className="w-2/5 py-3 pl-6 text-sm cursor-pointer xs:text-xs">
        {icon ? (
          <img
            className="inline-block w-6 h-6 mr-3 border rounded-full border-greenLight"
            src={icon}
            alt={toRealSymbol(symbol)}
          />
        ) : (
          <span className="w-6 h-6 mr-3"></span>
        )}
        <span className="inline-block text-white">{toRealSymbol(symbol)}</span>
      </td>
      <td
        className={`py-4 xs:text-xs text-sm w-1/5 ${
          sortBy === 'near' ? 'text-white' : ''
        }`}
      >
        {toInternationalCurrencySystem(String(near)).replace(/[\,]+/g, '')}
      </td>
      <td
        className={`py-4 xs:text-xs text-sm w-1/5 ${
          sortBy === 'ref' ? 'text-white' : ''
        }`}
      >
        {toInternationalCurrencySystem(String(ref))}
      </td>
      <td
        className={`pr-6 xs:text-xs text-sm py-4 w-1/5 ${
          sortBy === 'total' ? 'text-white' : ''
        }`}
      >
        {toInternationalCurrencySystem(String(total))}
      </td>
    </tr>
  );
}
