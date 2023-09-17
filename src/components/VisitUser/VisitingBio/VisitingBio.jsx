
import { React, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import unknownPerson from '../../../images/UnknownPerson.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './VisitingBio.css';

function VisitingBio({ userPFP, userNik, userBio, ...restOfProps }) {
  const visitingUser = useSelector((state) => state.visitingUser);
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <div className="min-h-[120px] flex flex-row overflow-hidden bg-[#ffff] rounded-2xl border-[0.5px] border-[#fff] shadow-[-6px_6px_14px_2px_rgb(185,185,185)] sticky top-10">
        <div
          className=" relative overflow-y-visible user-img xsm:w-[100px] w-[120px] h-100 flex justify-center items-center"
        >
          <div className="relative w-[full]">
            <img
              src={visitingUser.user.profilePictureURL || unknownPerson}
              className="relative h-[60px] w-[60px] border-[#525252] border-2 rounded-full object-cover"
            ></img>
            <BsFillCameraFill
              size={20}
              color={'rgb(255 255 255 / 85%)'}
              className='absolute top-[35px] right-[0px] hover:cursor-pointer'
            />
          </div>
          <div className="pfpbg1 absolute h-full w-full bg-[#6246EA] -z-10"></div>
        </div>
        <div className="w-full pt-[10px] flex flex-col justify-between">
          <div className="flex items-center justify-center text-[20px] font-nunito font-medium cursor-pointer">
            <NavLink to={`/user/${auth._id}`}>
              {visitingUser.user.name}
              <span className="text-[#6246ea]">{'.Nik'}</span>
            </NavLink>
          </div>
          <div className="text-[12px] text-center font-nunito text-[#8a8a8a] font-bold px-[10px] pt-[5px] pb-[15px]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </div>
          <div className="flex pb-[10px] px-[10px] font-nunito justify-around 2xsm:text-[12px]">
            <button>78 Followers</button>
            <button className="pl-[5px]">124 Following</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitingBio;
