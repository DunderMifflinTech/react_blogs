import { React, useEffect, useRef, useState, useCallback } from 'react';
import './UserBio.css';
import { IoClose } from 'react-icons/io5';
import { BsFillCameraFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';
import { BsSave } from 'react-icons/bs';
import Cropper from 'react-easy-crop';
import ReactSlider from 'react-slider';
import getCroppedImg, { dataURLtoFile, generateDownload } from './utils';
import axios from 'axios';


import BaseButton from '../../../BaseButton/BaseButton';

const ImageModal = ({ setIsModalOpen, userPFP, userNik }) => {
  const [img, setImg] = useState(userPFP);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const inputRef = useRef();

  const step = useRef(0);

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

  const sliderChange = (arg1, arg2) => {
    console.log(`arg1 = ${arg1}  step = ${step.current}`);
    if (arg1 > step.current) {
      setZoom((prev) => prev + 0.1);
      step.current = arg1;
    } else if (arg1 < step.current) {
      setZoom((prev) => prev - 0.1);
      step.current = arg1;
    }
  };

  const handleImgSave = async () => {
    const canvas = await getCroppedImg(img, croppedArea);
    const canvasDataURL = canvas.toDataURL("image/jpeg");
    const convertedURLtoFile = dataURLtoFile(canvasDataURL, "cropped-image.jpeg");
    try{
      const formData = new FormData();
      formData.append('croppedImage', convertedURLtoFile);
      const response = await axios.post(`http://localhost:3001/users/save-profile-picture`, formData);
      console.log(response.data);
    } catch(err){
      console.warn(err);
    }
  };

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
        className="rounded-lg w-[700px] h-[540px] bg-[#fff] "
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
        <div className="h-[40px]">
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            onChange={sliderChange}
            max={10}
          />
        </div>
        <div className=" h-[85px] p-[15px] flex place-content-center place-items-center">
          <BaseButton
            children={
              <>
                <FiUpload
                  size={20}
                  className="mr-[10px]"
                />
                <span>Upload</span>
              </>
            }
            onClick={() => inputRef.current.click()}
            variant={'solid'}
            className={' flex flex-row h-[40px] mr-[10px] place-items-center'}
          />
          <BaseButton
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
          <BaseButton
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
        null
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
