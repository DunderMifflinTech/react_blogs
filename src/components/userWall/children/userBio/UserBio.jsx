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
import { NavLink, useNavigate } from 'react-router-dom';
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
  const auth = useSelector((state) => state.auth);
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
    if (!img) {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/users/save-profile-picture`, {
          id: auth._id,
          image: null,
        })
        .then((res) => {
          dispatch(updateProfilePicture(res.data.data));
          closeModal();
        });
    } else {
      const canvas = await getCroppedImg(img, croppedArea);
      const canvasDataURL = canvas.toDataURL('image/jpeg');
      const convertedURLtoFile = dataURLtoFile(
        canvasDataURL,
        'cropped-image.jpeg'
      );
      try {
        const formData = new FormData();
        formData.append('croppedImage', convertedURLtoFile);
        formData.append('id', auth._id);
        await axios
          .post(
            `${import.meta.env.VITE_API_URL}/users/save-profile-picture`,
            formData
          )
          .then((response) => {
            dispatch(updateProfilePicture(response.data.data));
            closeModal();
          });
        // console.log(response.data);
      } catch (err) {
        console.warn(err);
      }
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
  const auth = useSelector((state) => state.auth);
  const [imgHover, setImgHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canModalClose, setCanModalClose] = useState(true);
  const navigate = useNavigate();

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
      <div className="min-h-[120px] flex flex-row overflow-hidden bg-[#ffff] rounded-2xl border-[0.5px] border-[#fff] shadow-[-6px_6px_14px_2px_rgb(185,185,185)] sticky top-10">
        <div
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          className=" relative overflow-y-visible user-img xsm:w-[100px] w-[120px] h-100 flex justify-center items-center"
        >
          <div className="relative w-[full]">
            <img
              src={profilePicture === null ? unknownPerson : profilePicture}
              className="relative h-[60px] w-[60px] border-[#525252] border-2 rounded-full object-cover"
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
                'absolute top-[35px] right-[0px] hover:cursor-pointer'
              }
            />
          </div>
          <div className="pfpbg absolute h-full w-full bg-[#6246EA] -z-10"></div>
        </div>
        <div className="w-full pt-[10px] flex flex-col justify-between">
          <div className="flex items-center justify-center text-[20px] font-nunito font-medium cursor-pointer">
            <NavLink to={`/user/${auth._id}`}>
              {auth.name}
              <span className="text-[#6246ea]">{'.Nik'}</span>
            </NavLink>
          </div>
          <div className="text-[12px] text-center font-nunito text-[#8a8a8a] font-bold px-[10px] pt-[5px] pb-[15px]">
            {auth?.bio}
          </div>
          <div className="flex pb-[10px] px-[10px] font-nunito justify-around 2xsm:text-[12px]">
            <button>78 Followers</button>
            <button className="pl-[5px]">124 Following</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserBio;
