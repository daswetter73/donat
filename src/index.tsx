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
  const [offchain, setOffchain] = useState<Window["offchain"]>()
  useEffect(()=>{
    window.offchain.then(setOffchain)
  },[])

  return (
    <div>
      <h1>Offchain integration</h1>
      <button onClick={()=>offchain?.getProtocolInfo(console.log)}>Connect wallet</button>
    </div>
  )
}

root.render(<App/>)