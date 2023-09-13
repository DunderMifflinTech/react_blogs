import React, { useState, useRef, useEffect } from 'react';
import {useTransition} from 'react-spring';
import './playaround.css';

function Playaround({}) {
  return (
    <>
      <div className="bg-[#a61300db] w-full h-full">
        <PopUp />
      </div>
    </>
  );
}

const PopUp = ({ shouldRender }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div className="w-full h-[1000px]">
        <button className="bg-white border-[#bababa] rounded px-2 m-auto"
        onClick={()=>setIsVisible(v=>!v)}>
          {!isVisible ? 'mount' : 'unmount'}
        </button>
        <div className="container">
          {isVisible ? <div className="item"></div> : null}
        </div>
      </div>
    </>
  );
};

export default Playaround;
