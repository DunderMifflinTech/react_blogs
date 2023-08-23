import React, { useState, useRef, useEffect } from 'react';
import './playaround.css';

function Playaround() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <button onClick={() => setIsActive((s) => !s)}>activate karo</button>
      {<Child isActive = {isActive} />}
    </>
  );
}

function Child({ isActive }) {
  const [shouldRender, setShouldRender] = useState(isActive);

  useEffect(() => {
    if(isActive)  
      setShouldRender(true);
  },[isActive]);

  const onAnimationEnd = () => {
    if(!isActive)setShouldRender(false);
  };
  return (
    shouldRender && (
      <div
        onAnimationEnd={onAnimationEnd}
        style = {{animation: `${isActive ? 'child-opening-animation' : 'child-closing-animation'} 300ms`}}
        className={(isActive ? 'h-[200px]' : 'h-0') + " w-[200px] bg-slate-500 child "}
      >
        this is a div
      </div>
    )
  );
}

export default Playaround;
