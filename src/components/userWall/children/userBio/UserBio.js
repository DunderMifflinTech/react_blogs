import { React, useRef, useState } from 'react';
import './UserBio.css';
import { IoClose } from 'react-icons/io5';
import { BsFillCameraFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md'
import { FiUpload } from 'react-icons/fi';
import {ImageCropper} from 'react-easy-crop'

import BaseButton from '../../../BaseButton/BaseButton';

const ImageModal = ({ setIsModalOpen, userPFP, userNik }) => {

  const inputRef = useRef();

  return (
    <div
      onClick={() => {
        document.body.style.overflow = '';
        setIsModalOpen(false);
      }}
      className="w-full h-full backdrop-blur-sm backdrop-brightness-50 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="rounded-lg w-[700px] h-[500px] bg-[#fff] "
      >
        <div className="flex flex-row justify-between p-[10px] pl-[18px] pb-[25px]">
          <h3 className="font-semibold self-end">Change Photo</h3>
          <IoClose
            onClick={() => {
              document.body.style.overflow = '';
              setIsModalOpen(false);
            }}
            size={30}
            style={{ color: '#5c5c5c' }}
            className=" hover:bg-slate-200 rounded-full p-[2px]"
          />
        </div>
        <div className="w-full h-[350px] bg-[#1d1d1d]">
          <img src={userPFP} className="w-full h-full object-contain" />
        </div>
        <input ref={inputRef} type={'file'} accept={'image/*'} className = 'hidden'/>
        <div className=" h-[85px] p-[15px] flex place-content-center place-items-center">
          <BaseButton
            children={
              <>
                <FiUpload size={20} className="mr-[10px]" />
                <span>Upload</span>
              </>
            }
            onClick={()=>inputRef.current.click()}
            variant={'solid'}
            className={' flex flex-row h-[40px] mr-[10px] place-items-center'}
          />
          <BaseButton
            children={<><MdDelete size={20} className="mr-[10px]" />
            <span>Delete</span></>}
            variant={'red'}
            className={'flex flex-row h-[40px] mr-[10px] place-items-center'}
          />
        </div>
      </div>
    </div>
  );
};
function UserBio({ userPFP, userNik, userBio, ...restOfProps }) {
  const [imgHover, setImgHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen ? (
        <ImageModal
          setIsModalOpen={setIsModalOpen}
          userPFP={userPFP}
          userNik={userNik}
        />
      ) : (
        <></>
      )}
      <div className=" rounded-lg h-[120px] flex flex-row bg-[#ffff] outline outline-[1px] outline-[#d7d7d7]">
        <div
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          className=" relative user-img w-[100px] bg-[#6246EA] shrink-0 h-full flex justify-center items-center"
        >
          <img
            src={userPFP}
            className="h-[60px] w-[60px] border-[#525252] border-2 rounded-full"
          ></img>
          <BsFillCameraFill
            onClick={openModal}
            size={20}
            color={'#2b2c34'}
            className={
              (imgHover
                ? 'opacity-100 transition-opacity duration-300 '
                : 'opacity-0 transition-opacity duration-300 ') +
              'absolute top-[70px] right-[20px] hover:cursor-pointer'
            }
          />
        </div>
        <div className="w-full">
          <p>{userNik}</p>
          <hr />
          <p>{userBio}</p>
        </div>
      </div>
    </>
  );
}

export default UserBio;
