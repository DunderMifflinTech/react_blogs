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
import unknownPerson from '../../../../images/UnknownPerson.jpg';
import { SERVER_URL } from '../../../../Secrets';
// import {createImage} from './utils'
import BaseButton from '../../../BaseButton/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../../../rtk/features/userAuthentication/userAuthenticationSlice';

const ImageModal = ({
  userPFP,
  userNik,
  canModalClose,
  setCanModalClose,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const [img, setImg] = useState(userPFP);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploadedImg, setUploadedImg] = useState(null);
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

  const handleImageUpload = async () => {
    const canvas = await getCroppedImg(img, croppedArea);
    const canvasDataURL = canvas.toDataURL('image/jpeg');
    const convertedURLtoFile = dataURLtoFile(
      canvasDataURL,
      'cropped-image.jpeg'
    );
    try {
      const formData = new FormData();
      formData.append('croppedImage', convertedURLtoFile);
      formData.append('email', email);
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/save-profile-picture`,
          formData
        )
        .then((response) => {
          dispatch(updateProfilePicture(response.data.data));
          closeModal();
          // var pfpimg = document.createElement('img');
          // pfpimg.src = response.data.data;
          // document.querySelector("body").appendChild(pfpimg);
        });
      // console.log(response.data);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleImgDeletion = () => {
    setImg(null);
  };

  return (
    <div
      onClick={() => {
        document.body.style.overflow = '';
        if (canModalClose) closeModal();
        else setCanModalClose(true);
      }}
      className="w-full h-full backdrop-blur-sm backdrop-brightness-50 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => {
          setCanModalClose(false);
        }}
        onMouseUp={() => {
          setCanModalClose(true);
        }}
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
          {img && (
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              showGrid={false}
              cropShape="round"
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={img == null ? null : setZoom}
            />
          )}
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
          {img == null ? null : (
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.001}
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="block m-auto zoom-range w-[50%] h-1 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
            />
          )}
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
                <BsSave size={20} className="mr-[10px]" />
                <span>Save</span>
              </>
            }
            onClick={handleImageUpload}
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
            disabled={img == null ? true : false}
            variant={'red'}
            onClick={handleImgDeletion}
            className={'flex flex-row h-[40px] mr-[10px] place-items-center'}
          />
        </div>
      </div>
    </div>
  );
};

function UserBio({ userPFP, userNik, userBio, ...restOfProps }) {
  const profilePicture = useSelector((state) => state.auth.profilePictureURL);
  const [imgHover, setImgHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canModalClose, setCanModalClose] = useState(true);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = '';
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen ? (
        <ImageModal
          setIsModalOpen={setIsModalOpen}
          userPFP={profilePicture === undefined ? null : profilePicture}
          userNik={userNik}
          canModalClose={canModalClose}
          setCanModalClose={setCanModalClose}
          closeModal={closeModal}
        />
      ) : null}
      <div className=" h-[120px] flex flex-row bg-[#ffff] rounded-2xl border-[0.5px] border-[#fff]  shadow-[-6px_6px_14px_2px_rgb(185,185,185)]">
        <div
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          className=" relative user-img w-[100px] bg-[#6246EA] shrink-0 h-full flex justify-center items-center"
        >
          <img
            src={profilePicture === undefined ? unknownPerson : profilePicture}
            className="h-[60px] w-[60px] border-[#525252] border-2 rounded-full object-cover"
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
