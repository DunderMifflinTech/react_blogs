import { React, useEffect, useRef, useState, useCallback } from 'react';
import './UserBio.css';
import { IoClose } from 'react-icons/io5';
import { BsFillCameraFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';
import { BsSave } from 'react-icons/bs';
import Cropper from 'react-easy-crop';
import getCroppedImg, { dataURLtoFile, generateDownload } from './utils';
import axios from 'axios';

import BaseButton from '../../../BaseButton/BaseButton';

const ImageModal = ({userPFP, userNik, canModalClose, setCanModalClose, closeModal}) => {
  const [img, setImg] = useState(userPFP);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const step = useRef(0);
  const inputRef = useRef();

  const onCropComplete = useCallback(
    (croppedAreaPercentage, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setImg(reader.result);
      });
    }
  };

  const handleImgSave = async () => {
    const canvas = await getCroppedImg(img, croppedArea);
    const canvasDataURL = canvas.toDataURL('image/jpeg');
    const convertedURLtoFile = dataURLtoFile(
      canvasDataURL,
      'cropped-image.jpeg'
    );
    try {
      const formData = new FormData();
      formData.append('croppedImage', convertedURLtoFile);
      const response = await axios.post(
        `http://localhost:3001/users/save-profile-picture`,
        formData
      );
      console.log(response.data);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div
      onClick={() => {
        document.body.style.overflow = '';
        if(canModalClose)
          closeModal();
        else 
          setCanModalClose(true);
      }}
      className="w-full h-full backdrop-blur-sm backdrop-brightness-50 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    >
      <div
        onClick={(e)=>e.stopPropagation()}
        onMouseDown={()=>{setCanModalClose(false)}}
        onMouseUp={()=>{setCanModalClose(true)}}
        className="rounded-lg w-[700px] h-[540px] bg-[#fff] "
      >
        <div className="flex flex-row justify-between p-[10px] pl-[18px] pb-[25px]">
          <h3 className="font-semibold self-end">Change Photo</h3>
          <IoClose
            onClick={() => {
              document.body.style.overflow = '';
              closeModal();
            }}
            size={30}
            style={{ color: '#5c5c5c' }}
            className=" hover:bg-slate-200 rounded-full p-[2px]"
          />
        </div>
        <div className=" relative container-cropper w-full h-[350px] overflow-hidden">
          <Cropper
            image={img}
            crop={crop}
            zoom={zoom}
            showGrid={false}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            // onZoomChange={setZoom}
          />
        </div>
        <input
          ref={inputRef}
          type={'file'}
          accept={'image/*'}
          onChange={onSelectFile}
          className="hidden"
        />
        <div className="h-[40px] flex">
          {' '}
          {/* //* INPUT SLIDER */}
          <input
            type="range"
            value={zoom}
            min={1}
            max={2}
            step={0.001}
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="block m-auto zoom-range w-[50%] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
          />
        </div>
        <div className=" h-[85px] p-[15px] flex place-content-center place-items-center">
          <BaseButton //* UPLOAD BUTTON
            children={
              <>
                <FiUpload size={20} className="mr-[10px]" />
                <span>Upload</span>
              </>
            }
            onClick={() => inputRef.current.click()}
            variant={'solid'}
            className={' flex flex-row h-[40px] mr-[10px] place-items-center'}
          />
          <BaseButton //* SAVE BUTTON
            children={
              <>
                <BsSave
                  onClick={handleImgSave}
                  size={20}
                  className="mr-[10px]"
                />
                <span>Save</span>
              </>
            }
            onClick={handleImgSave}
            variant={'solid'}
            className={' flex flex-row h-[40px] mr-[10px] place-items-center'}
          />
          <BaseButton //* DELETE BUTTON
            children={
              <>
                <MdDelete size={20} className="mr-[10px]" />
                <span>Delete</span>
              </>
            }
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
  const [canModalClose, setCanModalClose] = useState(true);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeModal = ()=>{
    document.body.style.overflow = '';
    setIsModalOpen(false);
  }

  return (
    <>
      {isModalOpen ? (
        <ImageModal
          setIsModalOpen={setIsModalOpen}
          userPFP={userPFP}
          userNik={userNik}
          canModalClose = {canModalClose}
          setCanModalClose = {setCanModalClose}
          closeModal = {closeModal}
        />
      ) : null}
      <div className=" rounded-lg h-[120px] flex flex-row bg-[#ffff] outline outline-[1px] outline-[#d7d7d7]">
        <div
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          className=" relative user-img w-[100px] bg-[#6246EA] shrink-0 h-full flex justify-center items-center"
        >
          <img
            src={userPFP}
            className="h-[60px] w-[60px] border-[#525252] border-2 rounded-full"
            onClick={openModal}
          ></img>
          <BsFillCameraFill
            onClick={openModal}
            size={20}
            color={'rgb(255 255 255 / 85%)'}
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
