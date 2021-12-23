import BigNumber from 'bignumber.js';
import { deposit } from 'near/FT';
import { FormattedMessage } from 'react-intl';
import { TokenMetadata } from 'store/Database';

export const DepositBtn = (props: {
  amount: string;
  token: TokenMetadata;
  balance: string;
}) => {
  const { amount, token, balance } = props;
  console.log(token);

  const nearValidate =
    token.id === 'NEAR'
      ? new BigNumber(amount).isLessThanOrEqualTo(
          new BigNumber(String(Number(balance) - 1)),
        )
      : true;

  const canSubmit =
    balance !== '0' &&
    !!amount &&
    !!token &&
    new BigNumber(amount).isLessThanOrEqualTo(new BigNumber(balance)) &&
    nearValidate;
  return (
    <div className="flex items-center justify-center w-full pt-2">
      <button
        disabled={!canSubmit}
        className={`w-full rounded-full text-sm text-white px-5 py-2.5 focus:outline-none font-semibold ${
          canSubmit ? '' : 'bg-opacity-50 disabled:cursor-not-allowed'
        }`}
        style={
          canSubmit
            ? {
                background: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
                borderRadius: '5px',
              }
            : {
                background: '#314351',
                borderRadius: '5px',
              }
        }
        onClick={() => {
          if (canSubmit) {
            console.log(token);
            console.log(amount);
            deposit({
              token,
              amount,
            });
          }
        }}
      >
        <FormattedMessage id="deposit" defaultMessage="Deposit" />
      </button>
    </div>
  );
};
