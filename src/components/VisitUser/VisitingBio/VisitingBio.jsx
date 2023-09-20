import { React, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import unknownPerson from '../../../images/UnknownPerson.jpg';
import nature from '../../../images/nature.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './VisitingBio.css';
import BaseButton from '../../BaseButton/BaseButton';

function VisitingBio({ ...restOfProps }) {
  const visitingUser = useSelector((state) => state.visitingUser);
  const auth = useSelector((state) => state.auth);

  return (
    <div className=" w-full flex flex-col items-center bg-[#ffff]">
      <div className=" w-[85%] relative overflow-y-visible user-img h-full grid flex-col items-center">
        <img
          className="w-full h-[calc(35vw-10px)] object-cover rounded-b-2xl"
          src={visitingUser?.backgroundPictureURL || nature}
        ></img>
        <img
          src={visitingUser?.user?.profilePictureURL || unknownPerson}
          className=" absolute h-[140px] w-[140px] border-[#ffffff] border-4 rounded-full object-cover top-[calc(32vw-10px)] left-[calc(10%-50px)] "
        ></img>
        <div className="pt-[10px] flex flex-row">
          <div className='w-[200px]'></div>
          <div className=''>
            <div className="flex items-center justify-start text-[20px] font-nunito font-medium cursor-pointer">
              <NavLink to={`/user/${auth._id}`}>
                {visitingUser?.user?.name}
                <span className="text-[#6246ea]">{'.Nik'}</span>
              </NavLink>
            </div>
            <div className="text-[12px] text-start font-nunito text-[#8a8a8a] font-bold pt-[5px] pb-[15px]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor.
            </div>
            <div className="flex pb-[10px] font-nunito justify-start 2xsm:text-[12px]">
              <button>78 Followers</button>
              <button className="pl-[5px]">124 Following</button>
            </div>
          </div>
          {/* <div className=''>
            <BaseButton className='w-[80px]'/>
          </div> */}
        </div>
      </div>
      <hr className='mb-[20px] w-[85vw] '></hr> 
    </div>
  );
}

export default VisitingBio;
