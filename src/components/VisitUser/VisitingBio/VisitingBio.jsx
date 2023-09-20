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
    <div className=" w-full flex flex-col items-center bg-[#ffff] max-w-[4000px] min-w-[240px]">
      <div className=" w-[85%] relative overflow-y-visible user-img h-full grid items-center">
        <img
          className="w-full h-[calc(35vw-10px)] object-cover rounded-b-2xl"
          src={visitingUser?.backgroundPictureURL || nature}
        ></img>
        <img
          src={visitingUser?.user?.profilePictureURL || unknownPerson}
          className=" absolute h-[160px] w-[160px] sm:h-[100px] sm:w-[100px] border-[#ffffff] border-4 rounded-full object-cover top-[calc(32vw-10px)] left-[calc(10%-50px)] sm:left-[calc(50%-50px)] sm:top-[calc(25vw-10px)] xl:top-[calc(30vw-10px)] xl:left-[calc(10%-50px)]"
        ></img>
        <div className="pt-[10px] flex flex-row sm:mt-[80px]">
          <div className="xl:w-[220px] 2xl:w-[260px] 3xl:w-[300px] 4xl:w-[350px] 5xl:w-[700px] sm:w-0"></div>
          <div className=" sm:flex sm:flex-col sm:items-center">
            <div className="flex items-center justify-start text-[20px] font-nunito font-medium cursor-pointer">
              <NavLink to={`/user/${auth._id}`}>
                {visitingUser?.user?.name}
                <span className="text-[#6246ea]">{'.Nik'}</span>
              </NavLink>
            </div>
            <div className="sm:text-center text-[12px] text-start font-nunito text-[#8a8a8a] font-bold pt-[5px] pb-[15px]">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor.
            </div>
            <div className="flex pb-[10px] font-nunito justify-start 2xsm:text-[12px]">
              <button>78 Followers</button>
              <button className="ml-[20px]">124 Following</button>
            </div>
          </div>
          {/* <div className=''>
            <BaseButton className='w-[80px]'/>
          </div> */}
        </div>
      </div>
      <hr className="mb-[20px] w-[85vw] "></hr>
    </div>
  );
}

export default VisitingBio;
