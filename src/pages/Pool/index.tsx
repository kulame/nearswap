import AppBody from 'components/Body';
import { ButtonLight } from 'components/Button';
import { AutoColumn, ColumnCenter } from 'components/Column';
import CurrencyInputPanel from 'components/CurrencyInputPanel';
import { AddRemoveTabs } from 'components/NavigationTabs';
import { Wrapper } from 'components/swap/styleds';
import { Token } from 'near/FT';
import { useContext, useState } from 'react';
import { Plus } from 'react-feather';
import { ThemeContext } from 'styled-components';
export default function Pool() {
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const theme = useContext(ThemeContext);
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
  const toggleWalletModal = (event) => {
    console.log(event);
  };
  return (
    <>
      <AppBody>
        <AddRemoveTabs adding={true} />
        <Wrapper id="pool-page">
          <AutoColumn gap={'sm'}>
            <CurrencyInputPanel
              value={fromValue}
              onUserInput={(text) => {
                setFromValue(text);
              }}
              currency={kulaToken}
              id="add-liquidity-input-tokena"
            />
            <ColumnCenter>
              <Plus size="16" color={theme.text2} />
            </ColumnCenter>
            <CurrencyInputPanel
              value={toValue}
              onUserInput={(text) => {
                setToValue(text);
              }}
              currency={ayatToken}
              id="add-liquidity-input-tokenb"
            />
            <ButtonLight onClick={toggleWalletModal}>
              Connect Wallet
            </ButtonLight>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  );
}
