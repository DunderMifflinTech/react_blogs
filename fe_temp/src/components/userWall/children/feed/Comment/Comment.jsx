import { React, useEffect, useRef, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { HiReply } from 'react-icons/hi';
import Reply from '../Reply/Reply';
import './Comment.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import UnknownPerson from '../../../../../images/UnknownPerson.jpg';
import { VscSend } from 'react-icons/vsc';
import moment from 'moment';
import axios from 'axios';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { IconContext } from 'react-icons';
import PopUp from '../../../../helperComponents/PopUp/PopUp';

export default function Comment({
  openedReplySection,
  showComments,
  postId,
  data,
  user,
  handleCommentsFetch,
}) {
  const [likeVar, setLikeVar] = useState(false);
  const [reply, setReply] = useState('');
  const replySubmitRef = useRef();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.userCache.users);
  const likesCount = useRef();
  const apiCallRef = useRef();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (reply.toString().trim().length > 0) {
        let replyData = {
          ownerId: auth._id,
          postId: postId,
          commentId: data._id,
          body: reply,
        };
        await axios
          .post(import.meta.env.VITE_API_URL + '/reply/add-reply', replyData)
          .then(async () => {
            setReply('');
            await handleCommentsFetch(true);
          });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      replySubmitRef.current.click();
    }
  };

  const onLikeButtonClick = () => {
    console.log('here');
    likeVar ? likesCount.current.innerText-- : likesCount.current.innerText++;
    // setLikeVar((lv) => !lv);
    return async () => {
      if (likeVar) {
        clearTimeout(apiCallRef.current);
        apiCallRef.current = setTimeout(() => {
          axios.patch(
            import.meta.env.VITE_API_URL + `/comment/unlike-comment`,
            {
              userId: auth._id,
              postId: postId,
              commentId: data._id,
            }
          );
          console.log('unlike req sent');
        }, 1000);
      } else {
        clearTimeout(apiCallRef.current);
        apiCallRef.current = setTimeout(() => {
          axios.post(import.meta.env.VITE_API_URL + `/comment/like-comment`, {
            userId: auth._id,
            postId: postId,
            commentId: data._id,
          });
          console.log('like req sent');
        }, 500);
      }
    };
  };

  const onEditButtonClick = () => {};

  const onDeleteButtonClick = () => {
    modalState.openModal('DELETE', auth._id, props._id);
  };

  return (
    <>
      <div
        className={
          (showComments ? '' : ' hide ') +
          ' comments-container max-h-fit'
        }
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPopUpOpen(false);
          }}
          className="commenters-info-container flex px-[20px] pb-[10px]"
        >
          <div className="h-[35px] w-[35px]">
            {' '}
            {/* //! UserImage*/}
            <img
              src={user?.profilePictureURL || UnknownPerson}
              className="h-[35px] w-[35px] rounded-full object-cover"
            />
          </div>
          <div className="flex w-11/12">
            <div>
              <div className="ml-[10px] pb-[5px] pr-[3px] pt-[5px] rounded-b-xl rounded-tr-xl bg-[#f2f2f2] w-full flex justify-between">
                <div className="w-full">
                  <ul className="pl-[10px]">
                    <li className="h-[15px] user-name list-none text-[12px] font-bold flex items-center">
                      {user?.name}
                    </li>
                    <li className="time-stamp h-[15px] list-none text-[#666666] text-[12px]">
                      {displayTime(data?.createdAt)}
                    </li>
                  </ul>
                  <div className="mx-[10px] mt-[7px] font-sans font-normal text-sm text-[#303030] ">
                    {data?.body}
                  </div>
                </div>
                <div className="w-[16px] flex justify-center items-center">
                  {auth._id === data.ownerId && (
                    <div
                      className={`${
                        isHovered && 'opacity-100 '
                      } opacity-0 flex flex-col justify-center items-center transition-all duration-300 relative`}
                    >
                      {(isHovered || isPopUpOpen) && (
                        <button onClick={() => setIsPopUpOpen((prev) => !prev)}>
                          <BsThreeDotsVertical />
                        </button>
                      )}
                      {<PopUp isPopUpOpen = {isPopUpOpen} />}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full pl-[30px] flex ">
                {' '}
                {/*//! like and reply button for a comment */}
                <button
                  onClick={() => onLikeButtonClick()()}
                  className="like hover:cursor-pointer pr-[20px] flex text-[14px] items-center"
                >
                  <span
                    ref={likesCount}
                    className="pr-[7px] font-sans font-normal text-sm text-[#434343]"
                  >
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
                </button>
                <button
                  onClick={() => {
                    openedReplySection.openedReplySection === data._id
                      ? openedReplySection.setOpenedReplySection(null)
                      : openedReplySection.setOpenedReplySection(data._id);
                  }}
                  className="font-sans font-normal text-sm text-[#434343]"
                >
                  {
                    <div className="flex flex-row justify-center items-center">
                      <div className="pr-[5px]">{data?.replies?.length}</div>
                      <HiReply color="DimGrey" size={15} />
                    </div>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
        {openedReplySection.openedReplySection === data._id && (
          <>
            {data?.replies?.length > 0 && (
              <div className="pl-[50px] px-[20px] ">
                {data.replies.map((ele) => (
                  <Reply
                    key={ele._id}
                    id={ele._id}
                    data={ele}
                    user={getUser(ele)}
                  />
                ))}
              </div>
            )}
            <div>
              <form className="flex items-center pl-[50px] pr-[10px] pb-[20px]">
                <img
                  src={auth?.profilePictureURL || UnknownPerson}
                  className="h-[35px] w-[35px] rounded-full object-cover"
                ></img>
                <TextareaAutosize
                  onChange={(e) => setReply(e.target.value.trimStart())}
                  value={reply}
                  placeholder="Write a reply..."
                  className="comment-input"
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleFormSubmit}
                  ref={replySubmitRef}
                  type={'submit'}
                  className="pr-[18px]"
                >
                  <VscSend size={25} color="DimGrey" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
