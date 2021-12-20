import { Card } from 'components/Card';
import { useTokens } from 'hooks/useToken';
import { nearMetadata } from 'near/token';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TokenMetadata } from 'store/Database';
export default function Deposit() {
  const { id } = useParams<{ id: string }>();
  const tokens = useTokens();
  let currentToken;
  if (id && tokens) {
    currentToken = tokens.find((token) => token.id === id);
  }

  if (!currentToken) {
    currentToken = nearMetadata;
  }

  const [selectedToken, setSelectedToken] =
    useState<TokenMetadata>(currentToken);

  const [amount, setAmount] = useState<string>('');

  return (
    <div className="flex flex-col items-center m-auto xl:w-1/3 2xl:w-1/3 3xl:w-1/4 lg:w-1/2 md:w-5/6 xs:w-full xs:p-2">
      <Card width="w-full" bgcolor="bg-dark">
        <h2 className="pb-4 text-xl font-bold text-left text-white formTitle">
          存款
        </h2>
      </Card>
    </div>
  );
}
