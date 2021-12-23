import InputAmount from 'components/Form/InputAmount';
import SelectToken from 'components/Form/SelectToken';
import { SmallWallet } from 'components/Icon/SmallWallet';
import Icon from 'components/Tokens/Icon';
import { TokenBalancesView } from 'near/FT';
import { FormattedMessage } from 'react-intl';
import { TokenMetadata } from 'store/Database';
import { toPrecision, toRoundedReadableNumber } from 'utils/numbers';
interface TokenAmountProps {
  amount?: string;
  max?: string;
  total: string;
  tokens?: TokenMetadata[];
  showSelectToken?: boolean;
  selectedToken: TokenMetadata;
  balances?: TokenBalancesView;
  onMax?: (input: HTMLInputElement) => void;
  onSelectToken?: (token: TokenMetadata) => void;
  onSearchToken?: (value: string) => void;
  onChangeAmount?: (amount: string) => void;
  text?: string;
  disabled?: boolean;
  useNearBalance?: boolean;
}

export default function TokenAmount({
  amount,
  max,
  total,
  tokens,
  selectedToken,
  balances,
  onSelectToken,
  onSearchToken,
  onChangeAmount,
  text,
  showSelectToken = true,
  disabled = false,
  useNearBalance,
}: TokenAmountProps) {
  const render = (token: TokenMetadata) =>
    toRoundedReadableNumber({
      decimals: token.decimals,
      number: balances ? balances[token.id] : '0',
    });

  return (
    <>
      <div className="flex justify-end text-xs font-semibold pb-0.5 w-3/5">
        <span className="text-primaryText">
          {useNearBalance ? (
            <span className="float-left mr-2">
              <SmallWallet />
            </span>
          ) : null}
          <FormattedMessage id="balance" defaultMessage="Balance" />
          :&nbsp;
          <span title={total}>{toPrecision(total, 3, true)}</span>
        </span>
      </div>
      <fieldset className="relative flex my-2 overflow-hidden align-center">
        <InputAmount
          className="w-3/5 border border-transparent rounded"
          id="inputAmount"
          name={selectedToken?.id}
          max={max}
          value={amount}
          onChangeAmount={onChangeAmount}
          disabled={disabled}
        />
        {showSelectToken && tokens && (
          <SelectToken
            tokens={tokens}
            render={render}
            selected={
              selectedToken && (
                <div className="flex items-center justify-end font-semibold">
                  <Icon token={selectedToken} />
                </div>
              )
            }
            onSelect={onSelectToken}
            balances={balances}
          />
        )}
        {!showSelectToken && selectedToken && (
          <div className="flex items-center justify-end w-2/5 font-semibold">
            <Icon token={selectedToken} showArrow={false} />
          </div>
        )}
      </fieldset>
    </>
  );
}
