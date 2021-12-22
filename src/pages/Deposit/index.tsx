import { Balances } from 'components/Balances';
import { Card } from 'components/Card';
import TokenAmount from 'components/Form/TokenAmount';
import {
  useDepositableBalance,
  useTokenBalances,
  useTokens,
  useUserRegisteredTokens,
} from 'hooks/useToken';
import { nearMetadata } from 'near/token';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenMetadata } from 'store/Database';
export default function Deposit() {
  const { id } = useParams<{ id: string }>();
  const tokens = useTokens();

  const currentToken = id
    ? tokens.find((token) => token.id === id)
    : nearMetadata;

  const [selectedToken, setSelectedToken] = useState<TokenMetadata>(
    currentToken ? currentToken : nearMetadata,
  );

  const balances = useTokenBalances();
  const [amount, setAmount] = useState<string>('');

  const max = useDepositableBalance(selectedToken?.id, selectedToken?.decimals);

  const userTokens = useUserRegisteredTokens() || [];
  return (
    <div className="flex flex-col items-center m-auto xl:w-1/3 2xl:w-1/3 3xl:w-1/4 lg:w-1/2 md:w-5/6 xs:w-full xs:p-2">
      <Card width="w-full" bgcolor="bg-dark">
        <h2 className="pb-4 text-xl font-bold text-left text-white formTitle">
          存款
        </h2>
        <TokenAmount
          amount={amount}
          max={
            selectedToken.id !== 'NEAR'
              ? max
              : Number(max) <= 1
              ? '0'
              : String(Number(max) - 1)
          }
          total={max}
          tokens={[nearMetadata, ...tokens]}
          selectedToken={selectedToken}
          onSelectToken={setSelectedToken}
          onChangeAmount={setAmount}
          text={selectedToken.symbol}
          balances={balances}
        />
      </Card>
      <Balances title="Balance" tokens={userTokens} balances={balances} />
    </div>
  );
}
