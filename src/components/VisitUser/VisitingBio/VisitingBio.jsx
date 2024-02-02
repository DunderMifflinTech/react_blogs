import axios from 'axios';
import { React, useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { BsSave } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import unknownPerson from '../../../images/UnknownPerson.jpg';
import backgroundPlaceholder from '../../../images/backgroundImage.png';
import BaseButton from '../../BaseButton/BaseButton';
import getCroppedImg, { dataURLtoFile } from '../../userWall/children/userBio/utils';
import { BsCheckLg } from 'react-icons/bs'
import './VisitingBio.css';

function VisitingBio({ ...restOfProps }) {
  const visitingUser = useSelector((state) => state.visitingUser);
  const auth = useSelector((state) => state.auth);
  const[bghover, setBghover] = useState(false);
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
    {isModalOpen && visitingUser?.user?._id === auth?._id ? (
        <ImageModal
          setIsModalOpen={setIsModalOpen}
          userPFP={visitingUser?.user?.backgroundPictureURL}
          userNik={auth?.name}
          canModalClose={canModalClose}
          setCanModalClose={setCanModalClose}
          closeModal={closeModal}
        />
      ) : null}
    <div className=" w-full flex flex-col items-center bg-[#ffff] max-w-[4000px] min-w-[240px]">
      <div className=" w-[85%] relative overflow-y-visible user-img h-full grid items-center">
        <div className={"bg-img-cont relative transition-all" + (visitingUser?.user?._id === auth?._id ? ' cursor-pointer' : '')}
        onClick={openModal}
        onMouseEnter={()=>setBghover(true)}
        onMouseLeave={()=>setBghover(false)}>
          <img
            className=" w-full h-[calc(28vw-10px)] object-cover rounded-b-2xl xsm:h-[calc(34vw-10px)]"
            src={visitingUser?.user?.backgroundPictureURL || backgroundPlaceholder}
          ></img>
          {visitingUser?.user?._id === auth?._id && (<div className='background-blur absolute w-full rounded-b-2xl bottom-0 h-[100px] pt-[50px] text-center text-white fi'>{bghover && 'Upload Image'}</div>)}
        </div>
        <img
          src={visitingUser?.user?.profilePictureURL || unknownPerson}
          className=" absolute h-[160px] w-[160px] sm:h-[100px] sm:w-[100px] border-[#ffffff] border-4 rounded-full object-cover top-[calc(24.5vw-10px)] left-[calc(10%-50px)] sm:left-[calc(50%-50px)] sm:top-[calc(19vw-10px)] xl:top-[calc(25vw-10px)] xl:left-[calc(10%-50px)]"
        ></img>
        <div className="pt-[10px] flex flex-row sm:mt-[80px]">
          <div className="xl:w-[220px] 2xl:w-[260px] 3xl:w-[300px] 4xl:w-[350px] 5xl:w-[700px] sm:w-0"></div>
          <div className=" sm:flex sm:flex-col sm:items-center">
            <div className="flex items-center justify-start text-[20px] font-nunito font-medium cursor-pointer">
              <NavLink to={`/user/${auth._id}`}>
                {visitingUser?.user?.name}
                <span className="text-[#6246ea]">{'.Nik'}</span>
              </NavLink>
            </div>
            <div className="sm:text-center text-[14px] text-start font-nunito text-[#8a8a8a] font-bold pt-[5px] pb-[15px]">
              {visitingUser?.user?.details?.bio}
            </div>
            <div className="flex pb-[10px] font-nunito justify-start 2xsm:text-[12px]">
              <button>78 Followers</button>
              <button className="ml-[20px]">124 Following</button>
            </div>
          </div>
          {auth?._id !== visitingUser?.user?._id && <div className='absolute right-0 bottom-0'>
            {true ? <button className='w-[80px] bg-[#6246ea] rounded-lg text-white font-nunito py-[7px] px-[5px] mb-[3px]'>Follow</button> : 
            (false ? (<button className='w-[100px] bg-[#6246ea] rounded-lg text-white font-nunito py-[7px] px-[5px] mb-[3px]'>Requested</button>) : 
          (<button className='w-[90px] bg-[#d1d1d1] rounded-lg font-bold font-nunito text-[#353535] py-[7px] px-[5px] mb-[3px]'>Following</button>))}
          </div>}
        </div>
      </div>
      <hr className="my-[40px] w-[85vw] "></hr>
    </div>
    </>
  );
}

const ImageModal = ({
  userPFP,
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
        .post(`${import.meta.env.VITE_API_URL}/users/save-background-picture`, {
          id: auth._id,
          image: null,
        })
        .then((res) => {
          closeModal();
          window.location.reload(false);
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
            `${import.meta.env.VITE_API_URL}/users/save-background-picture`,
            formData
          )
          .then((response) => {
            closeModal();
            window.location.reload(false);
          });
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
              cropShape="rect"
              aspect={16/5}
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

export default VisitingBio;
