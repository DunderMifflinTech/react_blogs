import { React, useEffect, useRef, useState } from 'react';
import userPFP from '../../../../../images/userPFP.png';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { TbShare3 } from 'react-icons/tb';
import { BiComment } from 'react-icons/bi';
import { VscSend } from 'react-icons/vsc';
import './Post.css';
import unknownPerson from '../../../../../images/UnknownPerson.jpg';
import Comment from '../Comment/Comment';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';

const bio = 'To do is to be, to be is to do, scooby dooby doo';
function Post({props, user}) {
  const commentSubmitRef = useRef();
  const profilePicture = useSelector((state) => state.auth.profilePictureURL);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [likeVar, setLikeVar] = useState(false);
  const [comment, setComment] = useState();

  useEffect(()=>{
    
  },[])

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      commentSubmitRef.current.click();
    }
  };

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

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    if(comment.toString().trim().length > 0){
      //TODO: handle comment submit action
      setComment('');
    }
  }
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
              <img src={user?.profilePictureURL || unknownPerson} className="h-[48px] w-[48px] rounded-full object-cover" />
            </div>
            <div>
              <ul className="pl-[10px]">
                <li className="h-[15px] user-name list-none text-[12px] font-bold flex items-center">
                  {user?.name}
                </li>
                <li className="h-[15px] user-bio list-none text-[12px] text-[#666666]">
                  {' '}
                  {bio.length > 28 ? bio.substring(0, 28) + '...' : bio}
                </li>
                <li className="time-stamp h-[15px] list-none text-[#666666] text-[12px]">
                  {displayTime(props?.createdAt)}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="post-body font-sans font-normal text-sm text-[#303030] pt-[20px]">
              {props.body.split('\n').map(s=><><span>{s}<br/></span></>)}
            </div>
            <div className="flex justify-center pt-[25px] pb-[15px]">
              <hr className="w-[94.5%]" />
            </div>
            <div className="flex flex-row-reverse justify-evenly select-none">
              <div
                onClick={() => setLikeVar((lv) => !lv)}
                className="like hover:cursor-pointer pr-[20px] flex text-[14px] items-center"
              >
                <span className="pr-[7px] font-sans font-normal text-[15px] text-[#4f4f4fd4]">
                  {props?.likes?.length}
                </span>
                {likeVar ? (
                  <FcLike size={20} className="like-enabled-icon" />
                ) : (
                  <FcLikePlaceholder size={20} />
                )}
              </div>
              <div className="share pr-[20px] hover:cursor-pointer flex text-[13px] items-center">
                <span className="pr-[7px] font-sans font-normal text-[15px] text-[#4f4f4fd4]">
                  4
                </span>
                <TbShare3 color="DimGrey" size={20} />
              </div>
              <div className="comment pr-[20px] hover:cursor-pointer flex text-[13px] items-center">
                <span className="pr-[7px] font-sans font-normal text-[15px] text-[#4f4f4fd4]">
                {props?.comments?.length}
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
        <div>
          <Comment showComments={isCommentSectionOpen}></Comment>
          <Comment showComments={isCommentSectionOpen}></Comment>
          <Comment showComments={isCommentSectionOpen}></Comment>
        </div>
        <div>
          <form className="flex items-center px-[10px] pb-[15px]">
            <img
              src={profilePicture || unknownPerson}
              className="h-[40px] w-[40px] rounded-full object-cover"
            ></img>
            {/* <textarea onKeyDown={handleTextAreaSize} placeholder={'Write a comment'} className='w-full comment-input'></textarea> */}
            <TextareaAutosize
              onChange={(e)=>setComment(e.target.value.trimStart())}
              value = {comment}
              placeholder="Write a comment..."
              className="comment-input"
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleFormSubmit}
              ref={commentSubmitRef}
              type={'submit'}
              className="pr-[18px]"
            >
              <VscSend size={25} color="DimGrey" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
