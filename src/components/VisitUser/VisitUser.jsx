import React, { useEffect } from 'react';
import './VisitUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVisitingUser } from '../../rtk/features/VisitingUser/visitingUser';
import { useParams } from 'react-router-dom';
import UserBio from '../userWall/children/userBio/UserBio';
import VisitingBio from './VisitingBio/VisitingBio';

const VisitUser = () => {
  const visitingUser = useSelector((state) => state.visitingUser);
  const dispatch = useDispatch();
  const userId = useParams().param;
  useEffect(() => {
    dispatch(fetchVisitingUser(userId))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="user-wall-container pl-[3rem] pr-[3rem] pt-[3rem] mb-[200px]">
      <div></div>
      <div><VisitingBio/></div>
      <div></div>
    </div>
  );
};

export default VisitUser;
