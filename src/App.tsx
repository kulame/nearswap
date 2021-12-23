import { Buffer } from 'buffer';
import Deposit from 'pages/Deposit';
import Pool from 'pages/Pool';
import Swap from 'pages/Swap';
import { Route, Routes } from 'react-router-dom';
import './App.css';

window.Buffer = Buffer;

function AutoHeight(props: any) {
  return (
    <div className="relative justify-center xs:flex xs:flex-col md:flex md:flex-col h-4/5 lg:mt-12">
      {props.children}
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Swap />} />
        <Route path="/swap" element={<Swap />} />
        <Route
          path="/deposit"
          element={
            <AutoHeight>
              <Deposit />
            </AutoHeight>
          }
        >
          <Route
            path=":id"
            element={
              <AutoHeight>
                <Deposit />
              </AutoHeight>
            }
          />
        </Route>
        <Route path="/pool" element={<Pool />} />
      </Routes>
    </>
  );
}

export default App;
