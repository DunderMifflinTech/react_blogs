import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './VisitUser.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVisitingUser,
  resetVisitingUserSlice,
} from '../../rtk/features/VisitingUser/visitingUser';
import { resetPostSlice } from '../../rtk/features/Post/postsSlice';
import { useParams } from 'react-router-dom';
import { BiSolidUpArrow } from 'react-icons/bi';
import { BiSolidDownArrow } from 'react-icons/bi';
import UserBio from '../userWall/children/userBio/UserBio';
import VisitingBio from './VisitingBio/VisitingBio';
import Details from './Details/Details';
import FollowingGrid from './FollowingGrid/FollowingGrid';
import PersonalFeed from './PersonalFeed/PersonalFeed';

const VisitUser = () => {
  const dispatch = useDispatch();
  const userId = useParams().param;
  const visitingUser = useSelector((state) => state.visitingUser);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  useEffect(() => {
    dispatch(resetPostSlice());
    dispatch(resetVisitingUserSlice());
    dispatch(fetchVisitingUser(userId))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const togglePopUp = () =>{
    setIsDropdownActive(p=>!p);
  }

  return (
    <>
      <div>
        <VisitingBio />
        <div className="flex flex-row">
          <div>
            <div>
              {visitingUser.loading ? (
                <SkeletonTheme
                  baseColor="#e7e7e7"
                  highlightColor="#F1F1F1"
                  height={10}
                >
                  <div className="w-[450px] h-full m-[20px] pb-[10px] flex flex-col bg-[#fff] rounded-2xl  border-[0.5px] border-[#fff] shadow-[0px_6px_14px_2px_rgb(185,185,185)]">
                    <div className="flex pt-4">
                      <div className="flex flex-col pl-[15px]">
                        <Skeleton containerClassName="w-[250px] h-4" />
                        <Skeleton containerClassName="w-[200px] h-4" />
                        <Skeleton containerClassName="w-[230px] h-4" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              ) : (
                <Details />
              )}
            </div>
            <div>
              <FollowingGrid />
            </div>
          </div>
          <div className="w-full">
            {' '}
            <div className="bg-[white] my-[20px] px-[30px] mx-[20px] p-[10px] rounded-2xl flex justify-between relative shadow-[0px_6px_14px_2px_rgb(185,185,185)]">
              <span className="text-[16px] font-nunito font-extrabold">
                Posts
              </span>
              <button className=" dropdown-button-active font-nunito font-extrabold flex flex-row items-center"
              onClick={togglePopUp}>
                <span>Sort by</span>{' '}
                {isDropdownActive ? (
                  <BiSolidUpArrow className="ml-[5px]" size={10} />
                ) : (
                  <BiSolidDownArrow className="ml-[5px]" size={10} />
                )}
              </button>
              {
                isDropdownActive && (
                  <ul className="absolute bg-[white] rounded-xl font-nunito font-bold text-[14px] right-[10px] top-[47px] shadow-md hover:cursor-pointer overflow-hidden">
                    <li className='hover:bg-[#e0e0e0] transition-all px-[15px] py-[3px] rounded-t-xl pt-[7px]'>most recent</li>
                    <li className='hover:bg-[#e0e0e0] transition-all px-[15px] py-[3px]'>least recent</li>
                    <li className='hover:bg-[#e0e0e0] transition-all px-[15px] py-[3px]'>most liked</li>
                    <li className='hover:bg-[#e0e0e0] transition-all px-[15px] rounded-b-xl py-[3px] pb-[7px]'>most shared</li>
                  </ul>
                )}
            </div>
            <PersonalFeed userId={userId} />
            <div className="flex flex-row items-center py-[30px] m-[20px] cursor-default">
              <hr className="border-t-[1px] border-dashed w-full h-0 border-[#8a939e]"></hr>
              <div className="font-pacifico text-[#8a939e] font-extralight whitespace-nowrap px-[20px]">
                Thats all folks
              </div>
              <hr className="border-t-[1px] border-dashed w-full h-0 border-[#8a939e]"></hr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitUser;
