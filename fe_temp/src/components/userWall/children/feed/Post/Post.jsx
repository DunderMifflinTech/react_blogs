import { React, useEffect, useRef, useState } from 'react';
import userPFP from '../../../../../images/userPFP.png';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { TbShare3 } from 'react-icons/tb';
import { BiComment } from 'react-icons/bi';
import { VscSend } from 'react-icons/vsc';
import './Post.css';
import unknownPerson from '../../../../../images/UnknownPerson.jpg';
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import axios from 'axios';
import { fetchRequiredUsers } from '../../../../../rtk/features/userCache/useCacheSlice';
import { fetchUserFeed } from '../../../../../rtk/features/Post/postsSlice';
const api_url = import.meta.env.VITE_API_URL;

const bio = 'To do is to be, to be is to do, scooby dooby doo';
function Post({props, user}) {
  const commentSubmitRef = useRef();
  const profilePicture = useSelector((state) => state.auth.profilePictureURL);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [likeVar, setLikeVar] = useState(false);
  const [comment, setComment] = useState();
  const [commentsArray, setCommentsArray] = useState(null);
  const [commentsAdded, setCommentsAdded] = useState(0);
  const dispatch = useDispatch();
  const users =  useSelector(state=>state.userCache.users);
  const auth =  useSelector(state=>state.auth);

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

  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    if(comment.toString().trim().length > 0){
      //TODO: handle comment submit action
      let commentData = {
        ownerId: auth._id,
        postId: props._id,
        body: comment
      }
      await axios.post(api_url + '/comment/add-comment', commentData)
      setComment('');
      setCommentsAdded(s => s+1);
      handleCommentsFetch(true);
    }
  }

  const getUser = (obj)=>{
    for(let usr of users){
      if(usr._id === obj.ownerId){
        return usr;
      }
    }
    return null;
  }
  
  const handleCommentsFetch = async(force)=>{
    if(force){
      try{
        let commentsArr = await axios.get(import.meta.env.VITE_API_URL + `/comment/get-comments/postid/${props._id}`);
        setCommentsArray(commentsArr.data.comments);
        let userData = [];
        for(let comment of commentsArr.data.comments){
          userData.push(comment.ownerId);
          for(let reply of comment.replies){
            userData.push(reply.ownerId);
          }
        }
        await dispatch(fetchRequiredUsers(userData)).unwrap();
        if(force)
          setIsCommentSectionOpen(true);
        else
          setIsCommentSectionOpen((icso) => !icso);
      }catch(err){
        console.log(err.message)
      }
    } else {
      setIsCommentSectionOpen((icso) => !icso);
      return;
    }
  }

  const handleAddComment = ()=>{
    handleCommentsFetch(!(!!commentsArray));
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
              {props.body.split('\n').map((s, id)=><span key={id}>{s}<br/></span>)}
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
                {props?.commentsCount + commentsAdded}
                </span>
                <BiComment
                  onClick={handleAddComment}
                  color="DimGrey"
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          {commentsArray?.length > 0 && 
            commentsArray.map(ele=>{
              return(
                <Comment key = {ele._id} showComments={isCommentSectionOpen} data = {ele} user = {getUser(ele)} />
              )
            })
          }
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
