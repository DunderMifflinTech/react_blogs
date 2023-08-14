import { React, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import Reply from '../Reply/Reply';
import './Comment.css';
import { useSelector } from 'react-redux';
import UnknownPerson from '../../../../../images/UnknownPerson.jpg';

export default function Comment({ showComments, data, user }) {
  const [likeVar, setLikeVar] = useState(false);
  const [areRepliesOpen, setAreRepliesOpen] = useState(false);
  const users = useSelector((state) => state.userCache.users);

  const getUser = (obj) => {
    for (let usr of users) {
      if (usr._id === obj.ownerId) {
        return usr;
      }
    }
    return null;
  };

  const displayTime = (t) => {
    const timeElapsed = (Date.now() - new Date(t)) / 1000;
    const min = 60;
    const hour = min * 60;
    const day = hour * 24;

    if (timeElapsed < 5 * min) {
      return 'just now';
    } else if (timeElapsed < hour) {
      return `${Math.round(timeElapsed / min)}min ago`;
    } else if (timeElapsed < day) {
      return `${Math.round(timeElapsed / hour)}h ago`;
    } else if (timeElapsed < 3 * day) {
      return `${Math.round(timeElapsed / day)}d ago`;
    } else {
      return moment(new Date(t)).format("Do MMM 'YY");
    }
  };
  return (
    <>
      <div
        className={
          (showComments ? '' : ' hide ') + ' comments-container overflow-hidden'
        }
      >
        <div className="commenters-info-container flex px-[20px] py-[10px]">
          <div className="h-[35px] w-[35px]">
            {' '}
            {/* //! UserImage*/}
            <img
              src={user?.profilePictureURL || UnknownPerson}
              className="h-[35px] w-[35px] rounded-full object-cover"
            />
          </div>
          <div className="flex w-11/12">
            <div className="">
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
                  {data?.body}
                </div>
              </div>
              <div className="w-full  pl-[30px] flex ">
                {' '}
                {/*//! like and reply button for a comment */}
                <div className="like hover:cursor-pointer pr-[20px] flex text-[14px] items-center">
                  <span className="pr-[7px] font-sans font-normal text-sm text-[#434343]">
                    {data?.likes?.length}
                  </span>
                  {likeVar ? (
                    <FcLike
                      onClick={() => setLikeVar((lv) => !lv)}
                      size={15}
                      className="like-enabled-icon"
                    />
                  ) : (
                    <FcLikePlaceholder
                      onClick={() => setLikeVar((lv) => !lv)}
                      size={15}
                    />
                  )}
                </div>
                <button
                  onClick={() => {
                    data.replies.length > 0
                      ? setAreRepliesOpen((aro) => !aro)
                      : null;
                  }}
                  className="font-sans font-normal text-sm text-[#434343]"
                >
                  {areRepliesOpen ? 'close' : `${data.replies.length} replies`}
                </button>
              </div>
            </div>
          </div>
        </div>
        {areRepliesOpen && (
          <div className="pl-[50px] px-[20px] pb-[20px]">
            {data?.replies?.length > 0 &&
              data.replies.map((ele) => (
                <Reply key = {ele._id} id={ele._id} data={ele} user={getUser(ele)} />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
