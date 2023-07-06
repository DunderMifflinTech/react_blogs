import React, { useState, useRef, useEffect } from 'react';
import './playaround.css';

function Playaround() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="parent h-[400px] w-[400px] bg-red-600">
        <button className="bg-white" onClick={() => setIsActive((ia) => !ia)}>
          activate
        </button>
        {isActive && <Child/>}
      </div>
    </>
  );
}

function Child({show}) {
  useEffect(()=>{
    console.log('rendered in playaround');

  }, []);
  const square = useRef(null);
  return(
    <>
      <div
        ref={square}
        className={(show? "h-[400px] opacity-100 " :"h-[0px] ") + "transition-all duration-300 ease-in-out  w-[100px] bg-slate-400"}
      ></div>
    </>
  );
}

export default Playaround;
