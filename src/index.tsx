import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root')!)
declare global {
  interface  Window {
     offchain: any;
  }
}
const App = () => {
  const [offchain, setOffchain] = useState()
  useEffect(()=>{
    window.offchain.then(setOffchain)
  },[])

  return (
    <div>
      <h1>Offchain integration</h1>
      <button onClick={()=>offchain?.connectWallet()}>Connect wallet</button>
    </div>
  )
}

root.render(<App/>)