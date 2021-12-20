import { Buffer } from 'buffer';
import Header from 'components/Header';
import ThemeProvider from 'components/theme';
import zh_CN from 'locales/zh_CN';
import * as nearAPI from 'near-api-js';
import { NearWalletContext } from 'near/Account';
import Deposit from 'pages/Deposit';
import Pool from 'pages/Pool';
import Swap from 'pages/Swap';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
window.Buffer = Buffer;

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`;
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  position: fixed;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6rem 16px 16px 16px;
  `};
`;

const local = localStorage.getItem('local') || navigator.language;

function App() {
  const [wallet, setWallet] = useState<nearAPI.WalletConnection | null>(null);
  const [messages, setMessages] = useState(zh_CN);
  const [locale, setLocale] = useState(local);
  return (
    <>
      <NearWalletContext.Provider value={[wallet, setWallet]}>
        <IntlProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <AppWrapper>
              <HeaderWrapper id="headerwrapper">
                <Header />
              </HeaderWrapper>
              <BodyWrapper>
                <Routes>
                  <Route path="/" element={<Swap />} />
                  <Route path="/swap" element={<Swap />} />
                  <Route path="/deposit" element={<Deposit />}>
                    <Route path=":id" element={<Deposit />} />
                  </Route>
                  <Route path="/pool" element={<Pool />} />
                </Routes>
              </BodyWrapper>
            </AppWrapper>
          </ThemeProvider>
        </IntlProvider>
      </NearWalletContext.Provider>
    </>
  );
}

export default App;
