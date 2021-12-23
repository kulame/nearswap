import BigNumber from 'bignumber.js';
import { TokenList } from 'components/Balances/TokenList';
import { Card } from 'components/Card';
import TokenAmount from 'components/Form/TokenAmount';
import {
  useTokenBalances,
  useTokens,
  useUserRegisteredTokens,
} from 'hooks/useToken';
import { TokenBalancesView, withdraw } from 'near/FT';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FormattedMessage } from 'react-intl';
import ReactModal from 'react-modal';
import { TokenMetadata } from 'store/Database';
import { isMobile } from 'utils/device';
import { toReadableNumber } from 'utils/numbers';

export function WithdrawModal(props: ReactModal.Props) {
  const [amount, setAmount] = useState<string>('');
  const tokens = useTokens();
  const userTokens = useUserRegisteredTokens();
  const balances = useTokenBalances();
  const [selectedToken, setSelectedToken] = useState<TokenMetadata | null>(
    null,
  );

  useEffect(() => {
    if (userTokens) setSelectedToken(userTokens[0]);
  }, [userTokens]);

  const ready = tokens && balances && userTokens && selectedToken;
  if (!ready) return null;

  const max = toReadableNumber(
    selectedToken.decimals,
    balances[selectedToken.id] || '0',
  );

  const cardWidth = isMobile() ? '95vw' : '25vw';

  const canSubmit = new BigNumber(amount).isLessThanOrEqualTo(
    new BigNumber(max),
  );

  const { onRequestClose } = props;

  return (
    <ReactModal {...props}>
      <Card style={{ width: cardWidth }}>
        <div className="relative flex items-center justify-between pb-6">
          <h2 className="text-sm font-bold text-center text-white">
            <FormattedMessage
              id="withdraw_token"
              defaultMessage="Withdraw Token"
            />
          </h2>
          <IoCloseOutline
            onClick={onRequestClose}
            className="text-2xl text-gray-400 cursor-pointer"
          />
        </div>
        <TokenAmount
          amount={amount}
          max={max}
          total={max}
          tokens={userTokens}
          balances={balances}
          selectedToken={selectedToken}
          onSelectToken={setSelectedToken}
          onChangeAmount={setAmount}
        />
        <div className="flex items-center justify-center pt-5">
          <button
            disabled={!canSubmit}
            className={`flex flex-row w-full justify-center px-5 py-2 mt-6 text-white disabled:cursor-not-allowed mx-auto
              ${!canSubmit ? 'opacity-40 cursor-not-allowed' : ''}
            `}
            style={{
              background: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
              borderRadius: '5px',
            }}
            onClick={() => {
              withdraw({
                token: selectedToken,
                amount,
              });
            }}
          >
            <FormattedMessage id="withdraw" defaultMessage="Withdraw" />
          </button>
        </div>
      </Card>
    </ReactModal>
  );
}

export function Balances(props: {
  title?: string;
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
}) {
  const { tokens, balances, title } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full pt-8 balances">
      <Card width="w-full" bgcolor="bg-dark">
        {title ? (
          <div className="pb-4 text-xl font-semibold text-white">
            <FormattedMessage id="balance" defaultMessage="Balance" />
          </div>
        ) : null}
        <TokenList hideEmpty={true} tokens={tokens} balances={balances} />

        {tokens.length > 0 ? (
          <div className="flex items-center justify-center pt-5">
            <button
              className={`flex flex-row w-full justify-center px-5 py-2 mt-6 text-white text-sm disabled:cursor-not-allowed mx-auto`}
              style={{
                background: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
                borderRadius: '5px',
              }}
              onClick={() => setIsOpen(true)}
            >
              <FormattedMessage id="withdraw" defaultMessage="Withdraw" />
            </button>
          </div>
        ) : null}
      </Card>

      <WithdrawModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            outline: 'none',
          },
        }}
      />
    </div>
  );
}
