import React, { useState } from 'react';
import {
  FcPicture,
  FcCollaboration,
  FcVideoCall,
  FcDocument,
} from 'react-icons/fc';
import {IoClose} from 'react-icons/io5'
import Tags from '../../../helperComponents/Tags';

const PostModal=({setIsModalOpen})=>{

  return (
    <div onClick={()=>{setIsModalOpen(false)}} className = 'w-full h-full backdrop-blur-sm backdrop-brightness-75 fixed bottom-0 left-0 z-[1] flex justify-center items-center'>
      <div onClick={e=>e.stopPropagation()} className='relative rounded-lg w-1/2 h-1/2 bg-[#fff] border border-1 border-[#dfdfdf]'>
        <span onClick={()=>{setIsModalOpen(false)}} className='absolute right-[10px] top-[10px]'><IoClose size={25} style = {{color: '#5c5c5c'}}/></span>
      </div>
    </div>
  )
}


function CreateArticles({ userPFP, ...restOfProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostCick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    {isModalOpen ? (<PostModal setIsModalOpen = {setIsModalOpen}/>) : <></>}
      <div className=" bg-[#ffff] rounded-lg justify-around outline outline-[1px] outline-[#d7d7d7] hover:outline-[1.3px] hover:outline-[#b5b5b5] transition-all ease-in-out">
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
            <FcCollaboration size={25} className="inline mr-[5px]" />
            <span>Post</span>
          </div>
          <div className="cursor-pointer rounded-lg h-[35px] w-[85px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out">
            <FcPicture size={25} className="inline mr-[5px]" />
            <span>Photo</span>
          </div>
          <div className="cursor-pointer rounded-lg h-[35px] w-[85px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out">
            <FcVideoCall size={25} className="inline mr-[5px]" />
            <span>Video</span>
          </div>
          <div className="cursor-pointer rounded-lg h-[35px] w-[125px] flex flex-row justify-center place-items-center hover:bg-[#d7d7d7] transition-all ease-in-out">
            <FcDocument size={25} className="inline mr-[5px]" />
            <span>New Article</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateArticles;
