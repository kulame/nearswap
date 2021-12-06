import Header from 'components/Header';
import ThemeProvider from 'components/theme';
import Pool from 'pages/Pool';
import Swap from 'pages/Swap';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

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
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6rem 16px 16px 16px;
  `};
`;

function App() {
  return (
    <>
      <ThemeProvider>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Routes>
              <Route path="/" element={<Swap />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/pool" element={<Pool />} />
            </Routes>
          </BodyWrapper>
        </AppWrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
