import Header from 'components/Header';
import ThemeProvider from 'components/theme';
import zh_CN from 'locales/zh_CN';
import * as nearAPI from 'near-api-js';
import { NearWalletContext } from 'near/Account';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

const local = localStorage.getItem('local') || navigator.language;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`;

const AppWrapper = (props: any) => {
  return (
    <>
      <div className="relative min-h-screen pb-20 overflow-x-hidden xs:flex xs:flex-col md:flex md:flex-col">
        {props.children}
      </div>
    </>
  );
};

const Wrapper = (props: any) => {
  const [wallet, setWallet] = useState<nearAPI.WalletConnection | null>(null);
  const [messages, setMessages] = useState(zh_CN);
  const [locale, setLocale] = useState(local);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <NearWalletContext.Provider value={[wallet, setWallet]}>
          <IntlProvider messages={messages} locale={locale}>
            <ThemeProvider>
              <AppWrapper>
                <HeaderWrapper id="headerwrapper">
                  <Header />
                </HeaderWrapper>
                {props.children}
              </AppWrapper>
            </ThemeProvider>
          </IntlProvider>
        </NearWalletContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Wrapper;
