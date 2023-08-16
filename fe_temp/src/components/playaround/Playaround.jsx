import React, { useState, useRef, useEffect } from 'react';
import './playaround.css';

function Playaround() {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      <button onClick={()=>setIsActive(s=>!s)}>activate karo</button>
      {isActive && <Child />}
    </>
  );
}

function Child() {
  useEffect(()=>{
    return ()=>{
      console.log('clean-up function')
    }
  })
  return <div className="h-[200px] w-[200px] bg-slate-500">this is a div</div>;
}

export default Playaround;
