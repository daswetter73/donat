import React from 'react';
import ReactDOM from 'react-dom/client';

const a = await import ('../../donat-pool-offchain/output/Protocol.StartProtocol')

const root = ReactDOM.createRoot(document.getElementById('root')!)

const App = () => {
  return (
    <div>
      <h1>Offchain integration</h1>
      <button onClick={a.runStartProtocol}>Connect wallet</button>
    </div>
  )
}

root.render(<App/>)