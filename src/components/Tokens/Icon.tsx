import { ArrowDownWhite } from 'components/Icon/Arrows';
import { TokenMetadata } from 'store/Database';
import { toRealSymbol } from 'utils/token';

export default function Icon({
  className = '',
  token,
  label = true,
  size = 6,
  showArrow = true,
}: {
  className?: string;
  token: TokenMetadata;
  label?: boolean;
  size?: number | string;
  showArrow?: boolean;
}) {
  return (
    <div
      className="flex items-center text-lg text-white"
      style={{ lineHeight: 'unset' }}
    >
      {label && <p className="block text-sm">{toRealSymbol(token.symbol)}</p>}
      {showArrow && (
        <div className="pl-2 text-xs xs:pl-1">
          <ArrowDownWhite />
        </div>
      )}
      <img
        key={token.id}
        className="ml-2 border rounded-full xs:ml-1 h-9 w-9 xs:h-7 xs:w-7 border-greenLight"
        src={token.icon}
      />
    </div>
  );
}
