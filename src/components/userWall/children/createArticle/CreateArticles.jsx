import React, { useState, useEffect } from 'react';
import './CreateArticles.css';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { HiMiniPhoto } from 'react-icons/hi2';
import { FaSquarePollHorizontal } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import BaseButton from '../../../BaseButton/BaseButton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFeed } from '../../../../rtk/features/Post/postsSlice';
import UnknownPerson from '../../../../images/UnknownPerson.jpg';
import { IoAddCircleOutline } from 'react-icons/io5';
import { TextareaAutosize } from '@mui/material';

const PostModal = ({ userNik, setIsModalOpen, setModalType }) => {
  const [postContent, setPostContent] = useState('');
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const closeModal = () => {
    document.body.style.overflow = '';
    setIsModalOpen(false);
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL + '/post/create-post', {
        user: { _id: state._id },
        body: postContent,
        postType: 'post'
      })
      .then(() => {
        dispatch(fetchUserFeed());
        closeModal();
      });
  };

  return (
    <div
      onClick={() => {
        closeModal();
      }}
      className="w-full h-full backdrop-blur-sm backdrop-brightness-75 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          'relative rounded-lg w-[500px] h-[400px] bg-[#fff] border border-1 border-[#dfdfdf]'
        }
      >
        <span className="absolute right-[10px] top-[10px] hover:bg-slate-200 rounded-full p-[2px]">
          <IoClose
            onClick={() => {
              closeModal();
            }}
            size={25}
            style={{ color: '#5c5c5c' }}
          />
        </span>
        <form className="h-full flex flex-col">
          <div className="text-xl font-nunito text-[16px] font-semibold text-[#303030] h-[50px] px-[20px] py-[10px] border-b">
            Create a post
          </div>
          <div className="flex">
            <img
              src={state.profilePictureURL || UnknownPerson}
              className="m-[20px] h-[50px] w-[50px] rounded-full mr-[16px] inline object-cover"
            />
            <div className="pt-[25px] text-base font-semibold">{userNik}</div>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex flex-col h-full justify-between">
              <textarea
                placeholder={'Express your thoughts here...'}
                className="h-[170px] block font-nunito text-[16px] font-semibold text-[#303030] post-div p-[20px] w-full outline-none overflow-y-scroll"
                value={postContent}
                onChange={(e) => {
                  handlePostChange(e);
                }}
              ></textarea>
              <div className={'flex flex-row-reverse my-[20px] mr-[30px]'}>
                <BaseButton
                  onClick={handlePostSubmit}
                  variant={'solid'}
                  children={'Post'}
                  className={
                    'h-[40px]  font-nunito text-[16px] font-extrabold '
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PollModal = ({ userNik, setIsModalOpen, setModalType }) => {
  const state = useSelector((state) => state.auth);
  const [pollData, setPollData] = useState(['','']);
  const [heading, setHeading] = useState('');
  const dispatch = useDispatch();

  const closeModal = () => {
    document.body.style.overflow = '';
    setIsModalOpen(false);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL + '/post/create-post', {
        user: { _id: state._id },
        body: heading,
        pollData: pollData,
        postType: 'poll'
      })
      .then(() => {
        dispatch(fetchUserFeed());
        closeModal();
      });
  };

  const onPollDataChange = (e, idx) => {
    setPollData((p) => {
      return p.map((item, id) => {
        if (id == idx) return e.target.value;
        return item;
      });
    });
  };

  const onPollDataDelete = (idx) => {
    setPollData(p=>p.filter((item, id)=>id != idx));
  }

  useEffect(() => {
    return () => {
      setModalType('post');
    }
  }, [])
  

  return (
    <div
      onClick={() => {
        closeModal();
      }}
      className="w-full h-full backdrop-blur-sm backdrop-brightness-75 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          'relative rounded-lg w-[550px] bg-[#fff] border border-1 border-[#dfdfdf]'
        }
      >
        <span className="absolute right-[10px] top-[10px] hover:bg-slate-200 rounded-full p-[2px]">
          <IoClose
            onClick={() => {
              closeModal();
            }}
            size={25}
            style={{ color: '#5c5c5c' }}
          />
        </span>
        <form className="h-full flex flex-col">
          <div className="text-xl font-nunito text-[16px] font-semibold text-[#303030] h-[50px] px-[20px] py-[10px] border-b">
            Post a photo
          </div>
          <div className="flex">
            <img
              src={state.profilePictureURL || UnknownPerson}
              className="m-[20px] h-[50px] w-[50px] rounded-full mr-[16px] inline object-cover"
            />
            <div className="pt-[25px] text-base font-semibold">{userNik}</div>
          </div>
          <div //* HEADING AND POLL SECTION
          className="flex flex-col h-full">
            <div className="flex flex-col h-full justify-between">
              <TextareaAutosize //* HEADING
                placeholder={'Heading goes here...'}
                maxRows={6}
                className="h-[120px] block font-nunito text-[16px] font-semibold text-[#303030] post-div m-[20px] w-[90%] outline-none overflow-y-scroll"
                value={heading}
                onChange={(e) => {
                  setHeading(e.target.value);
                }}
              ></TextareaAutosize>
              <ul className="h-full mx-[20px]">
                {pollData.map((obj, idx) => (
                  <li //* POLL OPTION
                  key={idx} className="flex justify-start pb-[15px]">
                    <button //*DELETE POLL
                    disabled = {pollData.length <= 2}
                    onClick={(e)=>{e.preventDefault(); pollData.length >= 2 && onPollDataDelete(idx) }}>
                      <IoAddCircleOutline 
                        color="#6246ea"
                        size={30}
                        className="hover:scale-[0.9] rotate-45 cursor-pointer transition-all mr-[15px]"
                      />
                    </button>
                    <input
                      className="bg-[#e8e8e8] rounded-lg h-[30px] w-[450px] outline-none px-[10px] font-nunito font-bold border border-[#d1d1d1] text-[#5b5b5b]"
                      onChange={(e) => onPollDataChange(e, idx)}
                      value={pollData[idx]}
                    ></input>
                    <span className={`${pollData[idx].length > 50 ? 'text-[#b72e2e] ' : 'text-[#d1d1d1] '}` + 'font-nunito font-bold self-center ml-[5px]'}>{pollData[idx].length + '/50'}</span>
                  </li>
                ))}
                {pollData.length < 5 && <IoAddCircleOutline //* ADD POLL
                  onClick={() => setPollData((p) => [...p, ''])}
                  color="#6246ea"
                  size={30}
                  className="hover:scale-[0.9] cursor-pointer transition-all"
                />}
              </ul>
              <div //* POST BUTTON
               className={'flex flex-row-reverse my-[20px] mr-[30px]'}>
                <BaseButton
                  onClick={handlePostSubmit}
                  disabled={pollData.reduce((acc, item)=> acc || item.length > 50 || item.trim().length == 0, false) || pollData.length < 2 || heading.trim().length <= 0 }
                  variant={'solid'}
                  children={'Post'}
                  className={
                    'h-[40px]  font-nunito text-[16px] font-extrabold '
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PhotoModal = ({ userNik, setIsModalOpen, setModalType }) => {
  const [postContent, setPostContent] = useState('');
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const closeModal = () => {
    document.body.style.overflow = '';
    setIsModalOpen(false);
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL + '/post/create-post', {
        user: { _id: state._id },
        body: postContent,
      })
      .then(() => {
        dispatch(fetchUserFeed());
        closeModal();
      });
  };

  useEffect(() => {
    return () => {
      setModalType('post');
    }
  }, [])

  return (
    <div
      onClick={() => {
        closeModal();
      }}
      className="w-full h-full backdrop-blur-sm backdrop-brightness-75 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={
          'relative rounded-lg w-[500px] h-[400px] bg-[#fff] border border-1 border-[#dfdfdf]'
        }
      >
        <span className="absolute right-[10px] top-[10px] hover:bg-slate-200 rounded-full p-[2px]">
          <IoClose
            onClick={() => {
              closeModal();
            }}
            size={25}
            style={{ color: '#5c5c5c' }}
          />
        </span>
        <form className="h-full flex flex-col">
          <div className="text-xl font-nunito text-[16px] font-semibold text-[#303030] h-[50px] px-[20px] py-[10px] border-b">
            {modalType === 'photo' ? 'Post a photo' : `Create a ${modalType}`}
          </div>
          <div className="flex">
            <img
              src={state.profilePictureURL || UnknownPerson}
              className="m-[20px] h-[50px] w-[50px] rounded-full mr-[16px] inline object-cover"
            />
            <div className="pt-[25px] text-base font-semibold">{userNik}</div>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex flex-col h-full justify-between">
              <textarea
                placeholder={'Express your thoughts here...'}
                className="h-[170px] block font-nunito text-[16px] font-semibold text-[#303030] post-div p-[20px] w-full outline-none overflow-y-scroll"
                value={postContent}
                onChange={(e) => {
                  handlePostChange(e);
                }}
              ></textarea>
              <div className={'flex flex-row-reverse my-[20px] mr-[30px]'}>
                <BaseButton
                  onClick={handlePostSubmit}
                  variant={'solid'}
                  children={'Post'}
                  className={
                    'h-[40px]  font-nunito text-[16px] font-extrabold '
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

function CreateArticles({ userPFP, userNik, ...restOfProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const state = useSelector((state) => state.auth);
  const [modalType, setModalType] = useState('post');

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const modal = Object.freeze({
    post: (
      <PostModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setModalType = {setModalType} />
    ),
    photo: (
      <PhotoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setModalType = {setModalType}/>
    ),
    poll: (
      <PollModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setModalType = {setModalType}/>
    ),
  });
  return (
    <>
      {isModalOpen ? modal[modalType] : <></>}
      <div className=" bg-[#ffff] justify-around rounded-2xl border-[0.5px] border-[#fff] shadow-[0px_6px_14px_2px_rgb(185,185,185)]">
        <div className="flex flex-row ml-[16px] pt-[18px] pr-[16px]">
          <img
            src={state.profilePictureURL || UnknownPerson}
            className="h-[45px] w-[45px] rounded-full mr-[16px] object-cover"
          />
          <button
            onClick={openModal}
            className="w-full my-[3px] flex rounded-t-full rounded-b-full outline outline-[1.5px] outline-[#bebebe] place-items-center hover:bg-[#e7e7e7] transition-all ease-in-out"
          >
            <span className="block mt-[5px] font-nunito text-[16px] text-[#b2b8c2] ml-[20px] ">
              What's on your mind ?
            </span>
          </button>
        </div>
        <div className=" pt-[15px] pr-[15px] pb-[10px] pl-[50px] flex flex-row justify-evenly xsm:px-0 2xsm:flex 2xsm:flex-col 2xsm:items-center 2xsm:justify-center">
          <div
            className="cursor-pointer rounded-lg h-[35px] w-[100px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out 2xsm:w-[85px]"
            onClick={() => {
              setModalType('post');
              openModal();
            }}
          >
            <BsFillPostcardHeartFill
              size={25}
              color="3D3D3D"
              className="inline mr-[10px]"
            />
            <span className="font-nunito text-[18px] text-[#272727] font-extrabold xsm:text-[15px]">
              Post
            </span>
          </div>
          <div
            className="cursor-pointer rounded-lg h-[35px] w-[100px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out 2xsm:w-[85px]"
            onClick={() => {
              setModalType('photo');
              openModal();
            }}
          >
            <HiMiniPhoto
              size={25}
              color="3D3D3D"
              className="inline mr-[10px]"
            />
            <span className="font-nunito text-[18px] text-[#272727] font-extrabold xsm:text-[15px]">
              Photo
            </span>
          </div>
          <div
            className="cursor-pointer rounded-lg h-[35px] w-[100px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out 2xsm:w-[85px]"
            onClick={() => {
              setModalType('poll');
              openModal();
            }}
          >
            <FaSquarePollHorizontal
              size={25}
              color="3D3D3D"
              className="inline mr-[10px]"
            />
            <span className="font-nunito text-[18px] text-[#272727] font-extrabold xsm:text-[15px]">
              Poll
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateArticles;
