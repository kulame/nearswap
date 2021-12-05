import { AutoColumn } from 'components/Column';
import CurrencyInputPanel from 'components/CurrencyInputPanel';
import { Wrapper } from 'components/swap/styleds';
import SwapHeader from 'components/swap/SwapHeader';
import ThemeProvider from 'components/theme';
import { Token } from 'near/FT';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import AppBody from './AppBody';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6rem 16px 16px 16px;
  `};
`;

function App() {
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
      <ThemeProvider>
        <AppWrapper>
          <BodyWrapper>
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
          </BodyWrapper>
        </AppWrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
