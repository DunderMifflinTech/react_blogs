import React, { useEffect, useState } from 'react';
import './PopUp.css';

const PopUp = ({ isPopUpOpen, data }) => {
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
          } 200ms`,
        }}
        className={
          (isPopUpOpen ? 'h-[35px] w-[70px] opacity-1 ' : 'h-0 w-0 ') +
          `bg-[#f2f2f2] overflow-y-hidden top-[15px] left-[7px] absolute flex flex-col border border-[#bebebe] rounded-md`
        }
      >
        <button
          className="comment-edit-button border-b border-b-[#bebebe] font-sans font-normal text-xs text-[#666666]"
          onClick={data[0].func}
        >
          {data[0].children}
        </button>
        <button
          className="font-sans font-normal text-xs text-[#303030]"
          onClick={data[1].func}
        >
          {data[1].children}
        </button>
      </div>
    )
  );
};

export default PopUp;
