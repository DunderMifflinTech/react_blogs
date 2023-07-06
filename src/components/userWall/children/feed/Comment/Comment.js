import { React, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import userPFP from '../../../../../images/userPFP.png';
import Reply from '../Reply/Reply';
import './Comment.css'

export default function Comment({showComments}) {
  const [likeVar, setLikeVar] = useState(false);
  const [areRepliesOpen, setAreRepliesOpen] = useState(false);
  return (
    <>
      <div className={(showComments ? '' :' active ') + ' comments-container overflow-hidden'}>
        <div className="commenters-info-container flex px-[20px] py-[10px]">
          <div className="h-[35px] w-[35px]">
            {' '}
            {/* //! UserImage*/}
            <img
              src={userPFP}
              className="h-[35px] w-[35px] rounded-full"
            />
          </div>
          <div className="flex w-11/12">
            <div className="">
              <div className="ml-[10px] pb-[10px] pr-[10px] pt-[5px] rounded-b-xl rounded-tr-xl bg-[#f2f2f2] w-full">
                {' '}
                {/* //! the comments body */}
                <ul className="pl-[10px]">
                  <li className="h-[15px] user-name list-none text-[12px] font-bold flex items-center">
                    Daniel Carraway
                  </li>
                  <li className="time-stamp h-[15px] list-none text-[#666666] text-[12px]">
                    {' '}
                    1h
                  </li>
                </ul>
                <div className="m-[10px] font-sans font-normal text-sm text-[#303030] ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </div>
              </div>
              <div className="w-full  pl-[30px] flex ">
                {' '}
                {/*//! like and reply button for a comment */}
                <div className="like hover:cursor-pointer pr-[20px] flex text-[14px] items-center">
                  <span className="pr-[7px] font-sans font-normal text-sm text-[#434343]">
                    3
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
                  onClick={() => setAreRepliesOpen((aro) => !aro)}
                  className="font-sans font-normal text-sm text-[#434343]"
                >
                  {areRepliesOpen ? 'close' : '2 replies'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {areRepliesOpen && (
          <div className="pl-[50px] px-[20px] pb-[20px]">
            <Reply />
            <Reply />
            <Reply />
          </div>
        )}
      </div>
    </>
  );
}
