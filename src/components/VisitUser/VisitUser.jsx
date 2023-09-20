import React, { useEffect } from 'react';
import './VisitUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVisitingUser } from '../../rtk/features/VisitingUser/visitingUser';
import { useParams } from 'react-router-dom';
import UserBio from '../userWall/children/userBio/UserBio';
import VisitingBio from './VisitingBio/VisitingBio';

const VisitUser = () => {
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
    <>
      <div>
        <VisitingBio />
        <div></div>
      </div>
    </>
  );
};

export default VisitUser;
