import AppBody from 'components/Body';
import { AutoColumn } from 'components/Column';
import CurrencyInputPanel from 'components/CurrencyInputPanel';
import { Wrapper } from 'components/swap/styleds';
import SwapHeader from 'components/swap/SwapHeader';
import { Token } from 'near/FT';
import { useState } from 'react';

export default function Swap() {
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const kulaToken: Token = {
    contract: 'kula.kula.testnet',
    owner_id: 'kula.testnet',
    spec: 'ft-1.0.0',
    name: 'kula',
    symbol: 'kula',
    decimals: 8,
  };
  const ayatToken: Token = {
    contract: 'ayat.kula.testnet',
    owner_id: 'ayat.testnet',
    spec: 'ft-1.0.0',
    name: 'ayat',
    symbol: 'ayat',
    decimals: 8,
  };
  return (
    <>
      <AppBody>
        <SwapHeader />
        <Wrapper id="swap-page">
          <AutoColumn gap={'sm'}>
            <CurrencyInputPanel
              value={fromValue}
              currency={kulaToken}
              onUserInput={(text) => {
                console.log(text);
                setFromValue(text);
              }}
            />
            <CurrencyInputPanel
              value={toValue}
              currency={ayatToken}
              onUserInput={(text) => {
                console.log(text);
                setToValue(text);
              }}
            />
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  );
}
