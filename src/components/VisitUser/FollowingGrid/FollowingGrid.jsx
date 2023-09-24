import React from 'react';
import userPFP from '../../../images/userPFP.png';
import './FollowingGrid.css'

const FollowingGrid = () => {
  return (
    <div className="w-[450px] h-full bg-[#fff] font-nunito ml-[20px] pb-[15px] rounded-xl flex flex-col items-center shadow-[0px_6px_14px_2px_rgb(185,185,185)]">
      <div className="text-center py-[20px] font-extrabold">Following</div>
      <div className="grid grid-cols-3 gap-x-[15px] gap-y-[15px] rounded-lg">
        {Array(9)
          .fill(0)
          .map((obj, idx) => {
            return (
              <div key={idx} className="follower-cont h-[150px] w-[120px] hover:cursor-pointer">
                <div className="h-[120px] w-[120px]">
                  <img className="follower-img rounded-lg transition-all" src={userPFP}></img>
                </div>
                <div className=' follower-name w-full text-center text-[14px] font-normal pt-[7px] transition-all'>{null || 'Daniel Normad'}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FollowingGrid;
