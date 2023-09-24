import React, { useEffect } from 'react';
import './VisitUser.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVisitingUser,
  resetVisitingUserSlice,
} from '../../rtk/features/VisitingUser/visitingUser';
import { resetPostSlice } from '../../rtk/features/Post/postsSlice';
import { useParams } from 'react-router-dom';
import UserBio from '../userWall/children/userBio/UserBio';
import VisitingBio from './VisitingBio/VisitingBio';
import Details from './Details/Details';
import FollowingGrid from './FollowingGrid/FollowingGrid';
import PersonalFeed from './PersonalFeed/PersonalFeed';

const VisitUser = () => {
  const dispatch = useDispatch();
  const userId = useParams().param;
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
  return (
    <>
      <div>
        <VisitingBio />
        <div className="flex flex-row">
          <div>
            <div>
              <Details />
            </div>
            <div>
              <FollowingGrid />
            </div>
          </div>
          <div className="w-full">
            {' '}
            <PersonalFeed userId={userId} />
            <div className="flex flex-row items-center py-[30px] m-[20px] cursor-default">
              <hr className="border-t-[1px] border-dashed w-full h-0 border-[#8a939e]"></hr>
              <div className='font-pacifico text-[#8a939e] font-extralight whitespace-nowrap px-[20px]'>Thats all folks</div>
              <hr className="border-t-[1px] border-dashed w-full h-0 border-[#8a939e]"></hr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitUser;
