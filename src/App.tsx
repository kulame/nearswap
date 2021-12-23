import { Buffer } from 'buffer';
import Deposit from 'pages/Deposit';
import Pool from 'pages/Pool';
import Swap from 'pages/Swap';
import ReactModal from 'react-modal';
import { Route, Routes } from 'react-router-dom';
import './App.css';
window.Buffer = Buffer;

ReactModal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 30,
  },
  content: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -65%)',
  },
};

ReactModal.setAppElement('#root');

const AutoHeight = (props: any) => {
  return (
    <div className="relative justify-center xs:flex xs:flex-col md:flex md:flex-col h-4/5 lg:mt-12">
      {props.children}
    </div>
  );
};

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
