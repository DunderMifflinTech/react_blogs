import React, { useEffect, useState } from 'react';
import './PopUp.css';

const PopUp = ({ isPopUpOpen }) => {
  const [shouldRender, setShouldRender] = useState(isPopUpOpen);
  useEffect(() => {
    if (isPopUpOpen) setShouldRender(true);
  }, [isPopUpOpen]);
  const onAnimationEnd = () => {
    if (!isPopUpOpen) setShouldRender(false);
  };
  return (
    shouldRender && (
      <div
        onAnimationEnd={onAnimationEnd}
        style={{
          animation: `${
            isPopUpOpen ? 'kebab-menu-open ' : 'kebab-menu-close '
          } 150ms`,
        }}
        className={(isPopUpOpen ? 'h-[35px] w-[70px] opacity-1 ' : 'h-0 w-0 ')+`overflow-y-hidden top-[15px] left-[7px] bg-white absolute flex flex-col border rounded-md`}
      >
        <button className="border-b font-sans font-normal text-xs text-[#303030] "> 
          Edit
        </button>
        <button className="font-sans font-normal text-xs text-[#303030] ">
          Delete
        </button>
      </div>
    )
  );
};

export default PopUp;
