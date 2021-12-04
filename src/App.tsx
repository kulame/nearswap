import CurrencyInputPanel from 'components/CurrencyInputPanel';
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
  const [value, setValue] = useState<string>('');
  const token: Token = {
    contract: 'kula.kula.testnet',
    owner_id: 'kula.testnet',
    spec: 'ft-1.0.0',
    name: 'kula',
    symbol: 'kula',
    decimals: 8,
  };
  return (
    <>
      <ThemeProvider>
        <AppWrapper>
          <BodyWrapper>
            <AppBody>
              <SwapHeader />
              <CurrencyInputPanel
                value={value}
                currency={token}
                onUserInput={(text) => {
                  console.log(text);
                  setValue(text);
                }}
              />
            </AppBody>
          </BodyWrapper>
        </AppWrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
