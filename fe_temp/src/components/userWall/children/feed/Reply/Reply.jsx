import { React, useState, useEffect, useRef } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TextareaAutosize from 'react-textarea-autosize';
import UnknownPerson from '../../../../../images/UnknownPerson.jpg';
import moment from 'moment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PopUp from '../../../../helperComponents/PopUp/PopUp';
import { VscSend } from 'react-icons/vsc';

export default function Reply({ data, commentId, user, postId, handleCommentsFetch }) {
  const auth = useSelector((state) => state.auth);
  const [likeVar, setLikeVar] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [editState, setEditState] = useState('');
  const [editValue, setEditValue] = useState(data?.body);
  const [isHovered, setIsHovered] = useState(false);
  const users = useSelector((state) => state.userCache.users);
  const likesCount = useRef();
  const apiCallRef = useRef()
  const textArea = useRef();
  const EditedCommentSubmitRef = useRef();

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

  const onLikeButtonClick = () => {
    likeVar ? likesCount.current.innerText-- : likesCount.current.innerText++;
    return async () => {
      if (likeVar) {
        clearTimeout(apiCallRef.current);
        apiCallRef.current = setTimeout(() => {
          axios.patch(import.meta.env.VITE_API_URL + `/reply/unlike-reply`, {
            userId: auth._id,
            postId: postId,
            commentId: commentId,
            replyId: data._id,
          });
          console.log('unlike req sent');
        }, 500);
        setLikeVar((lv) => !lv);
      } else {
        clearTimeout(apiCallRef.current);
        apiCallRef.current = setTimeout(() => {
          axios.post(import.meta.env.VITE_API_URL + `/reply/like-reply`, {
            userId: auth._id,
            postId: postId,
            commentId: commentId,
            replyId: data._id,
          });
          console.log('like req sent');
        }, 500);
        setLikeVar((lv) => !lv);
      }
    };
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      editState === data._id
        ? EditedCommentSubmitRef.current.click()
        : replySubmitRef.current.click();
    }
  };

  const onEditButtonClick = () => {
    setEditState(data._id);
  };

  const onDeleteButtonClick = async () => {
    try {
      const payload = {
        ownerId: auth._id,
        postId: postId,
        commentId: commentId,
        replyId : data._id
      };
      await axios
        .delete(import.meta.env.VITE_API_URL + '/reply/delete-reply', {
          data: payload,
        })
        .then(async() => {
          await handleCommentsFetch(true);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditedCommentSubmission = async (e) => {
    e.preventDefault();
    if (editValue.toString().trim().length > 0) {
      let replyData = {
        ownerId: auth._id,
        postId: postId,
        commentId: commentId,
        replyId : data._id,
        body: editValue,
      };
      await axios
        .patch(
          import.meta.env.VITE_API_URL + '/reply/edit-reply',
          replyData
        )
        .then(() => {
          setEditState('');
          setIsPopUpOpen(false);
          setEditValue(data?.body);
          handleCommentsFetch(true);
        });
    }
  };

  useEffect(() => {
    if (editState === data._id) textArea.current.focus();
  });

  useEffect(() => {
    if (data.likes.some((obj) => obj.userId === auth._id)) setLikeVar(true);
  }, []);

  return !(editState === data._id) ? (
    <>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPopUpOpen(false);
        }}
        className="commenters-info-container flex pb-[10px]">
        <div className="h-[35px] w-[35px]">
          {' '}
          {/* //! UserImage*/}
          <img
            src={user?.profilePictureURL || UnknownPerson}
            className="h-[35px] w-[35px] rounded-full object-cover"
          />
        </div>
        <div className="flex w-11/12">
          {' '}
          {/* //! comment and arrow head */}
          <div>
            <div className="ml-[10px] pb-[5px] pr-[3px] pt-[5px] rounded-b-xl rounded-tr-xl bg-[#f2f2f2] w-full flex justify-between">
              {' '}
              {/* //! the comments body */}
              <div>
                <ul className="pl-[10px]">
                  <li className="h-[15px] user-name list-none text-[12px] font-bold flex items-center">
                    {user?.name}
                  </li>
                  <li className="time-stamp h-[15px] list-none text-[#666666] text-[12px]">
                    {displayTime(data.createdAt)}
                  </li>
                </ul>
                <div className="mx-[10px] mt-[7px] font-sans font-normal text-sm text-[#303030] ">
                  {data.body}
                </div>
              </div>
              <div className="flex justify-end items-center">
              {auth._id === data.ownerId && (
                    <div
                      className={`${
                        isHovered && 'opacity-100 '
                      } opacity-0 flex flex-col justify-center items-center transition-all duration-300 relative`}
                    >
                      <div className="w-[16px] h-[25px]">
                        {(isHovered || isPopUpOpen) && (
                          <button
                            onClick={() => setIsPopUpOpen((prev) => !prev)}
                          >
                            <BsThreeDotsVertical />
                          </button>
                        )}
                      </div>
                      {
                        <PopUp
                          isPopUpOpen={isPopUpOpen}
                          data={[
                            { children: 'Edit', func: onEditButtonClick },
                            { children: 'Delete', func: onDeleteButtonClick },
                          ]}
                        />
                      }
                    </div>
                  )}
              </div>
            </div>
            <div className="w-full pl-[30px] flex ">
              {' '}
              {/*//! like and reply button for a comment */}
              <div className="like hover:cursor-pointer pr-[20px] flex text-[14px] items-center">
                <span
                  ref={likesCount}
                  className="pr-[7px] font-sans font-normal text-sm text-[#434343]"
                >
                  {data.likes.length}
                </span>
                {likeVar ? (
                  <FcLike
                    onClick={() => onLikeButtonClick()()}
                    size={15}
                    className="like-enabled-icon"
                  />
                ) : (
                  <FcLikePlaceholder
                    onClick={() => onLikeButtonClick()()}
                    size={15}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div>
        <form className="flex items-center pl-[20px] pb-[15px]">
          <img
            src={auth.profilePictureURL || UnknownPerson}
            className="h-[35px] w-[35px] rounded-full object-cover"
          ></img>
          <TextareaAutosize
            ref={textArea}
            onChange={(e) => setEditValue(e.target.value.trimStart())}
            value={editValue}
            placeholder="Write a comment..."
            className="comment-input"
            onBlur={() => {
              setEditState('');
              setIsPopUpOpen(false);
              setEditValue(data?.body);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleEditedCommentSubmission}
            ref={EditedCommentSubmitRef}
            type={'submit'}
            className="pr-[18px]"
          >
            <VscSend size={25} color="DimGrey" />
          </button>
        </form>
      </div>
    </>
  );
}
