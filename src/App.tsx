import { Buffer } from 'buffer';
import Wrapper from 'components/Wrapper';
import Deposit from 'pages/Deposit';
import Pool from 'pages/Pool';
import Swap from 'pages/Swap';
import { Route, Routes } from 'react-router-dom';
import './App.css';

window.Buffer = Buffer;

function App() {
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/deposit" element={<Deposit />}>
            <Route path=":id" element={<Deposit />} />
          </Route>
          <Route path="/pool" element={<Pool />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
