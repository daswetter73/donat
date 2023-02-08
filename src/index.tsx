import { type ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')!);
declare global {
  interface Window {
    offchain: any;
  }
}
const App = (): ReactElement => {
  const [offchain, setOffchain] = useState<Window['offchain']>();
  useEffect(() => {
    window.offchain.then(setOffchain);
  }, []);

  return (
    <div>
      <h1>Offchain integration</h1>
      <button onClick={() => offchain?.getProtocolInfo(console.log)}>
        Connect wallet
      </button>
    </div>
  );
};

root.render(<App />);
