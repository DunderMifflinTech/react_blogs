import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPlay = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="pl-[30px]">
        <Skeleton circle={true} width={50} height={50} />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonPlay;
