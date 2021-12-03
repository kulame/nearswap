import SwapHeader from 'components/swap/SwapHeader';
import ThemeProvider from 'components/theme';
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
  return (
    <>
      <ThemeProvider>
        <AppWrapper>
          <BodyWrapper>
            22
            <AppBody>
              <SwapHeader />
            </AppBody>
          </BodyWrapper>
        </AppWrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
