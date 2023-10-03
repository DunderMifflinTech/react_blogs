import axios from 'axios';
import moment from 'moment';
import { React, useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { BiComment } from 'react-icons/bi';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { TbShare3 } from 'react-icons/tb';
import { VscSend } from 'react-icons/vsc';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import unknownPerson from '../../../../../images/UnknownPerson.jpg';
import { fetchUserFeed } from '../../../../../rtk/features/Post/postsSlice';
import { fetchRequiredUsers } from '../../../../../rtk/features/userCache/useCacheSlice';
import Comment from '../Comment/Comment';
import './Post.css';
const api_url = import.meta.env.VITE_API_URL;

function Post({ props, user, modalState, postType, pollData }) {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [likeVar, setLikeVar] = useState(false);
  const [comment, setComment] = useState();
  const [commentsArray, setCommentsArray] = useState(null);
  const [commentsAdded, setCommentsAdded] = useState(0);
  const [openedReplySection, setOpenedReplySection] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const profilePicture = useSelector((state) => state.auth.profilePictureURL);
  const users = useSelector((state) => state.userCache.users);
  const auth = useSelector((state) => state.auth);
  const commentSubmitRef = useRef();
  const apiCallRef = useRef();
  const likesCount = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.likes.some((obj) => obj.userId === auth._id)) {
      setLikeVar(true);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      commentSubmitRef.current.click();
    }
  };

  const displayTime = (t) => {
    const timeElapsed = (Date.now() - new Date(t)) / 1000;
    const min = 60;
    const hour = min * 60;
    const day = hour * 24;

    if (timeElapsed / min < 5) {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (comment.toString().trim().length > 0) {
      //TODO: handle comment submit action
      let commentData = {
        ownerId: auth._id,
        postId: props._id,
        body: comment,
      };
      await axios.post(api_url + '/comment/add-comment', commentData);
      setComment('');
      setCommentsAdded((s) => s + 1);
      setTimeout(() => handleCommentsFetch(true), 100);
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

  const handleCommentsFetch = async (force) => {
    if (force) {
      try {
        console.log('-----------------FETCHING COMMENTS-----------------');
        let commentsArr;
        setTimeout(async () => {
          await axios
            .get(
              import.meta.env.VITE_API_URL +
                `/comment/get-comments/postid/${props._id}`
            )
            .then((res) => {
              commentsArr = res;
              console.log(res);
              setCommentsArray(commentsArr.data.comments);
              let userData = [];
              for (let comment of commentsArr.data.comments) {
                userData.push(comment.ownerId);
                for (let reply of comment.replies) {
                  userData.push(reply.ownerId);
                }
              }
              return userData;
            })
            .then(async (userData) => {
              console.log(
                '-----------------FETCHING NEW USERS-----------------'
              );
              await dispatch(fetchRequiredUsers(userData))
                .unwrap()
                .then(() => {
                  if (force) setIsCommentSectionOpen(true);
                  else setIsCommentSectionOpen((icso) => !icso);
                });
            });
        }, 300);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setIsCommentSectionOpen((icso) => !icso);
      return;
    }
  };

  const handleAddComment = () => {
    handleCommentsFetch(!!!commentsArray);
  };

  const onEditButtonClick = () => {
    modalState.openModal('EDIT', auth._id, props._id, props.body);
  };

  const onLikeButtonClick = () => {
    likeVar ? likesCount.current.innerText-- : likesCount.current.innerText++;
    setLikeVar((lv) => !lv);
    return async () => {
      if (likeVar) {
        clearTimeout(apiCallRef.current);
        apiCallRef.current = setTimeout(() => {
          axios.post(
            import.meta.env.VITE_API_URL + `/post/unlike/id/${props._id}`,
            {
              user: { _id: auth._id },
            }
          );
          console.log('unlike req sent');
        }, 1000);
      } else {
        clearTimeout(apiCallRef.current);
        apiCallRef.current = setTimeout(() => {
          axios.post(
            import.meta.env.VITE_API_URL + `/post/like/id/${props._id}`,
            {
              user: { _id: auth._id },
            }
          );
          console.log('like req sent');
        }, 500);
      }
    };
  };

  const onDeleteButtonClick = () => {
    modalState.openModal('DELETE', auth._id, props._id, props.body);
  };

  const handleVoteSubmit = (idx) => {
    if (!hasUserVoted()) {
      axios
        .post(
          import.meta.env.VITE_API_URL +
            `/post/vote/?userId=${auth._id}&postId=${props._id}&idx=${idx}`
        )
        .then(() => dispatch(fetchUserFeed()));
    }
  };

  const hasUserVoted = () => {
    for (let option in pollData) {
      for (let vote of pollData[option].votes) {
        console.log(vote.userId);
        if (vote.userId === auth._id) return true;
      }
    }
    return false;
  };

  return (
    <>
      <div className="h-auto w-full bg-[#fff] mt-[20px] rounded-2xl  border-[0.5px] border-[#fff] shadow-[0px_6px_14px_2px_rgb(185,185,185)]">
        <div>
          <div
            className="post-container p-[15px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {' '}
            {/*// ! contains the whole post in this div */}
            <div //* USER INFO
              className="postee-info-container flex justify-between"
            >
              {' '}
              {/* //! the postee's info*/}
              <div className="flex">
                <div>
                  <img
                    src={user?.profilePictureURL || unknownPerson}
                    className="h-[48px] w-[48px] rounded-full object-cover"
                  />
                </div>
                <div>
                  <ul className="pl-[10px]">
                    <li className="h-[15px] text-[16px] user-name list-none font-nunito font-medium flex items-center">
                      <NavLink
                        to={`/user/${user?._id}`}
                        className="hover:text-[#6246EA] hover:cursor-pointer hover"
                      >
                        {user?.name}
                      </NavLink>
                    </li>
                    {user?.details?.bio && (
                      <li className="h-[15px] font-nunito user-bio list-none text-[13px] text-[#666666]">
                        {' '}
                        {user?.details?.bio.length > 28
                          ? user?.details?.bio.substring(0, 28) + '...'
                          : user?.details?.bio}
                      </li>
                    )}
                    <li className="time-stamp h-[15px] font-nunito text-[13px] list-none text-[#666666]">
                      {displayTime(props?.createdAt)}
                    </li>
                  </ul>
                </div>
              </div>
              {auth._id === props.ownerId && (
                <div className="flex">
                  <button
                    className={
                      (isHovered ? 'opacity-1' : 'opacity-0') +
                      ' .change-button w-[20px] h-[20px] m-[5px] transition-all ease-in-out'
                    }
                    onClick={onEditButtonClick}
                  >
                    <IconContext.Provider //* EDIT BUTTON
                      value={{ color: '#696969', className: 'edit-button' }}
                    >
                      <FiEdit2 />
                    </IconContext.Provider>
                  </button>
                  <button
                    className={
                      (isHovered ? 'opacity-1' : 'opacity-0') +
                      ' .delete-button w-[20px] h-[20px] m-[5px] transition-all ease-in-out'
                    }
                    onClick={onDeleteButtonClick}
                  >
                    <IconContext.Provider //* DELETE BUTTON
                      value={{ color: '#696969', className: 'delete-button' }}
                    >
                      <MdDeleteOutline size={17} />
                    </IconContext.Provider>
                  </button>
                </div>
              )}
            </div>
            <div>
              <div //* POST CONTENT
                className="post-body font-nunito text-[16px] font-semibold text-[#303030] pt-[25px] pl-[5px]"
              >
                {props.body.split('\n').map((s, id) => (
                  <span key={id}>
                    {s}
                    <br />
                  </span>
                ))}
                {postType == 'poll' && (
                  <ul>
                    {pollData.map((obj, idx) => {
                      return (
                        <li
                          key={idx}
                          onClick={() => handleVoteSubmit(idx)}
                          className=" relative self-center h-[30px] my-[5px] pl-[10px] flex justify-between items-center rounded-full border-[1.5px] bg-[#6146ea46] border-[#6246ea] w-[90%] text-[#3e2c97] cursor-pointer overflow-hidden whitespace-nowrap"
                        >
                          <span>{obj.option}</span>
                          {hasUserVoted() && (
                            <>
                              <span
                                style={{ width: `${obj.percentage}%` }}
                                className={` h-full bg-[#6146ea5b] absolute top-0 left-0 rounded-xl`}
                              ></span>
                              <span className="font-normal px-[10px]">{`${obj.percentage}%`}</span>
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="flex justify-center pt-[15px] pb-[15px]">
                <hr className="w-[94.5%]" />
              </div>
              <div //* LIKE COMMENT SHARE BAR
                className="flex flex-row-reverse justify-evenly select-none"
              >
                <div //*LIKE BUTTON
                  onClick={() => onLikeButtonClick()()}
                  className="like hover:cursor-pointer w-[50px] flex items-center"
                >
                  <span
                    ref={likesCount}
                    className=" font-nunito text-[14px] text-[#272727] font-extrabold w-[30px] pr-[5px] text-end"
                  >
                    {props?.likes?.length}
                  </span>
                  {likeVar ? (
                    <FcLike size={20} className="like-enabled-icon" />
                  ) : (
                    <FcLikePlaceholder size={20} />
                  )}
                </div>
                <div //* REPOST BUTTON
                  className="share hover:cursor-pointer w-[50px] flex text-[13px] items-center"
                >
                  <span className="w-[30px] pr-[5px] text-end font-nunito text-[14px] text-[#272727] font-extrabold">
                    4
                  </span>
                  <TbShare3 color="DimGrey" size={20} />
                </div>
                <div //* COMMENTS BUTTON
                  className="comment hover:cursor-pointer w-[50px] flex text-[13px] items-center"
                >
                  <span className="w-[30px] pr-[5px] text-end font-nunito text-[14px] text-[#272727] font-extrabold">
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
          <div //* COMMENTS SECTION
          >
            {commentsArray?.length > 0 &&
              commentsArray.map((ele) => {
                return (
                  <Comment
                    key={ele._id}
                    postId={props._id}
                    openedReplySection={{
                      openedReplySection,
                      setOpenedReplySection,
                    }}
                    showComments={isCommentSectionOpen}
                    data={ele}
                    user={getUser(ele)}
                    handleCommentsFetch={handleCommentsFetch}
                    modalState={modalState}
                  />
                );
              })}
          </div>
          <div //* POST COMMENT
          >
            <form className="flex items-center px-[10px] pb-[15px]">
              <img
                src={profilePicture || unknownPerson}
                className="h-[40px] w-[40px] rounded-full object-cover"
              ></img>
              <TextareaAutosize
                onChange={(e) => setComment(e.target.value.trimStart())}
                onFocus={() => setOpenedReplySection(null)}
                value={comment}
                placeholder="Write a comment..."
                className="comment-input font-nunito text-[13px] text-[#272727] font-extrabold"
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
    </>
  );
}

export default Post;
