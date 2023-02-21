import React, { useState } from 'react';
import './CreateArticles.css';
import {
  FcPicture,
  FcCollaboration,
  FcVideoCall,
  FcDocument,
} from 'react-icons/fc';
import { IoClose } from 'react-icons/io5';
import Tags from '../../../helperComponents/Tags';
import BaseButton from '../../../BaseButton/BaseButton';

const PostModal = ({ isModalOpen, userPFP, userNik, setIsModalOpen }) => {
  const [isFocused, SetIsFocused] = useState(false);
  const [postContent, setPostContent] = useState('');

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
    console.log(postContent)
  };

  return (
    <div
      onClick={() => {
        document.body.style.overflow = '';
        setIsModalOpen(false);
      }}
      className="w-full h-full backdrop-blur-sm backdrop-brightness-75 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          // document.body.style.overflow = ''
        }}
        className="relative rounded-lg w-[500px] h-[400px] bg-[#fff] border border-1 border-[#dfdfdf]"
      >
        <span className="absolute right-[10px] top-[10px] hover:bg-slate-200 rounded-full p-[2px]">
          <IoClose
            onClick={() => {
              document.body.style.overflow = '';
              setIsModalOpen(false);
            }}
            size={25}
            style={{ color: '#5c5c5c' }}
          />
        </span>
        <div>
          <div className="text-lg font-medium h-[50px] px-[20px] py-[10px] border-b">
            Create a post
          </div>
          <div className="flex">
            <img
              src={userPFP}
              className="m-[20px] h-[50px] w-[50px] rounded-full mr-[16px] inline"
            />
            <div className="pt-[25px] text-base font-semibold">{userNik}</div>
          </div>
          <div>
            <div className="flex flex-col">
              <textarea
                placeholder={'Express your thoughts here...'}
                className="block post-div p-[20px] w-full h-[200px] outline-none overflow-y-scroll"
                onChange={(e) => {
                  handlePostChange(e);
                }}
              ></textarea>
              <div className={'flex flex-row-reverse'}>
                <BaseButton
                  variant={'solid'}
                  children={'Post'}
                  className={'h-[40px] mr-[40px]'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CreateArticles({ userPFP, userNik, ...restOfProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostCick = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen ? (
        <PostModal
          isModalOpen={isModalOpen}
          userPFP={userPFP}
          userNik={userNik}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <></>
      )}
      <div className=" bg-[#ffff] rounded-lg justify-around outline outline-[1px] outline-[#d7d7d7]">
        <div className="flex flex-row ml-[16px] pt-[18px] pr-[16px]">
          <img
            src={userPFP}
            className="h-[45px] w-[45px] rounded-full mr-[16px]"
          />
          <button
            onClick={handlePostCick}
            className="w-full mt-[3px] mb-[3px] flex rounded-t-full rounded-b-full outline outline-[1.5px] outline-[#bebebe] place-items-center hover:bg-[#e7e7e7] transition-all ease-in-out"
          >
            <span className="block text-[#545454] ml-[30px] ">
              What's on your mind ?
            </span>
          </button>
        </div>
        <div className=" pt-[15px] pr-[15px] pb-[10px] pl-[50px] flex flex-row justify-around">
          <div className="cursor-pointer rounded-lg h-[35px] w-[85px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out">
            <FcCollaboration size={25} className="inline mr-[10px]" />
            <span>Post</span>
          </div>
          <div className="cursor-pointer rounded-lg h-[35px] w-[85px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out">
            <FcPicture size={25} className="inline mr-[10px]" />
            <span>Photo</span>
          </div>
          <div className="cursor-pointer rounded-lg h-[35px] w-[85px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out">
            <FcVideoCall size={25} className="inline mr-[10px]" />
            <span>Video</span>
          </div>
          <div className="cursor-pointer rounded-lg h-[35px] w-[125px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out">
            <FcDocument size={25} className="inline mr-[10px]" />
            <span>New Article</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateArticles;
