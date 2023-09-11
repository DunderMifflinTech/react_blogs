import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonFeed = ({cards}) => {
  return (
    Array(cards).fill(0).map((_,idx)=>(<SkeletonTheme key={idx} baseColor="#e7e7e7" highlightColor="#F1F1F1" height={10}>
      <div className="h-auto w-full flex flex-col pl-[15px] bg-[#fff] mt-[20px] rounded-2xl  border-[0.5px] border-[#fff] shadow-[0px_6px_14px_2px_rgb(185,185,185)]">
        <div className="flex pt-4">
          <Skeleton circle={true} width={50} height={50} />
          <div className="flex flex-col pl-[15px]">
            <Skeleton containerClassName="w-[50px] h-4" />
            <Skeleton containerClassName="w-[100px] h-4" />
            <Skeleton containerClassName="w-[30px] h-4" />
          </div>
        </div>
        <div className="flex flex-col mt-[20px]">
          <Skeleton containerClassName={`w-[330px] h-4`} />
          <Skeleton containerClassName={'w-[310px] h-4'} />
          <Skeleton containerClassName={'w-[320px] h-4'} />
        </div>
        <div className="flex justify-center pt-[15px] pb-[15px]">
          <hr className="w-[94.5%]" />
        </div>
        <div className="flex pl-1 pb-5">
          <Skeleton circle={true} width={35} height={35} />
          <div className="flex flex-col pl-[15px]">
            <Skeleton containerClassName="w-[50px] h-4" />
            <Skeleton containerClassName="w-[150px] h-4" />
          </div>
        </div>
      </div>
    </SkeletonTheme>))
    
  );
};

export default SkeletonFeed;
