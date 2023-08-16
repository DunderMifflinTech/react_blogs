import { React, useState, useEffect } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import UnknownPerson from '../../../../../images/UnknownPerson.jpg'

export default function Reply({user, data}) {
  const [likeVar, setLikeVar] = useState(false);
  const displayTime = (t)=>{
    const timeElapsed = (Date.now() - new Date(t))/1000;
    const min = 60;
    const hour = min*60;
    const day = hour*24;

    if(timeElapsed < 5*min){
      return 'just now';
    } else if(timeElapsed < hour){
      return `${Math.round(timeElapsed/min)}min ago` ;
    } else if(timeElapsed < day){
      return `${Math.round(timeElapsed/hour)}h ago` ;
    } else if(timeElapsed < 3*day) {
      return `${Math.round(timeElapsed/day)}d ago` ;
    } else {
      return moment(new Date(t)).format("Do MMM 'YY"); 
    }
  }
  return (
    <>
      <div className="commenters-info-container flex pt-[20px]">
        <div className="h-[35px] w-[35px]">
          {' '}
          {/* //! UserImage*/}
          <img src={user?.profilePictureURL || UnknownPerson} className="h-[35px] w-[35px] rounded-full object-cover" />
        </div>
        <div className="flex w-11/12">
          {' '}
          {/* //! comment and arrow head */}
          <div className=" ">
            <div className="ml-[10px] pb-[10px] pr-[10px] pt-[5px] rounded-b-xl rounded-tr-xl bg-[#f2f2f2] w-full">
              {' '}
              {/* //! the comments body */}
              <ul className="pl-[10px]">
                <li className="h-[15px] user-name list-none text-[12px] font-bold flex items-center">
                  {user?.name}
                </li>
                <li className="time-stamp h-[15px] list-none text-[#666666] text-[12px]">
                  {displayTime(data.createdAt)}
                </li>
              </ul>
              <div className="m-[10px] font-sans font-normal text-sm text-[#303030] ">
                {data.body}
              </div>
            </div>
            <div className="w-full pl-[30px] flex ">
              {' '}
              {/*//! like and reply button for a comment */}
                <div
                  className="like hover:cursor-pointer pr-[20px] flex text-[14px] items-center"
                >
                  <span 
                  className="pr-[7px] font-sans font-normal text-sm text-[#434343]">{data.likes.length}</span>
                  {likeVar ? (
                    <FcLike onClick={() => setLikeVar((lv) => !lv)}size={15} className="like-enabled-icon" />
                  ) : (
                    <FcLikePlaceholder onClick={() => setLikeVar((lv) => !lv)} size={15} />
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
