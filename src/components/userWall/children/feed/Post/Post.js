import { Children, React, useState } from 'react';
import userPFP from '../../../../../images/userPFP.png';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { TbShare3 } from 'react-icons/tb';
import { BiComment } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Post.css';
import Comment from '../Comment/Comment';

const bio = 'To do is to be, to be is to do, scooby dooby doo';
function Post({ children }) {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [likeVar, setLikeVar] = useState(false);
  return (
    <div className="h-auto w-full bg-[#fff] mt-[20px] rounded-2xl  border-[0.5px] border-[#fff] shadow-[0px_6px_14px_2px_rgb(185,185,185)]">
      <div>
        <div className="post-container p-[15px]">
          {' '}
          {/*// ! contains the whole post in this div */}
          <div className="postee-info-container flex">
            {' '}
            {/* //! the postee's info*/}
            <div>
              <img src={userPFP} className="h-[48px] w-[48px] rounded-full" />
            </div>
            <div>
              <ul className="pl-[10px]">
                <li className="h-[15px] user-name list-none text-[12px] font-bold flex items-center">
                  Daniel Carraway
                </li>
                <li className="h-[15px] user-bio list-none text-[12px] text-[#666666]">
                  {' '}
                  {bio.length > 28 ? bio.substring(0, 28) + '...' : bio}
                </li>
                <li className="time-stamp h-[15px] list-none text-[#666666] text-[12px]">
                  {' '}
                  3h
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="post-body font-sans font-normal text-sm text-[#303030] pt-[20px]">
              Yeehaw this is my first post!
            </div>
            <div className="flex justify-center pt-[25px] pb-[15px]">
              <hr className="w-[94.5%]" />
            </div>
            <div className="flex flex-row-reverse select-none">
              <div
                onClick={() => setLikeVar((lv) => !lv)}
                className="like hover:cursor-pointer pr-[20px] flex text-[14px] items-center"
              >
                <span className="pr-[7px] font-sans font-normal text-sm text-[#434343]">
                  18
                </span>
                {likeVar ? (
                  <FcLike size={20} className="like-enabled-icon" />
                ) : (
                  <FcLikePlaceholder size={20} />
                )}
              </div>
              <div className="share pr-[20px] hover:cursor-pointer flex text-[13px] items-center">
                <span className="pr-[7px] font-sans font-normal text-sm text-[#434343]">
                  4
                </span>
                <TbShare3 color="DimGrey" size={20} />
              </div>
              <div className="comment pr-[20px] hover:cursor-pointer flex text-[13px] items-center">
                <span className="pr-[7px] font-sans font-normal text-sm text-[#434343]">
                  55
                </span>
                <BiComment
                  onClick={() => setIsCommentSectionOpen((icso) => !icso)}
                  color="DimGrey"
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>
            <Comment showComments = {isCommentSectionOpen}></Comment>
            <Comment showComments = {isCommentSectionOpen}></Comment>
      </div>
    </div>
  );
}

export default Post;
