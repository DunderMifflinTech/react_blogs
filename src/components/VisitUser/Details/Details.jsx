import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { MdCake } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa6';
import { TiLocation } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Modal from '../../Utils/Modal';
import TextareaAutosize from 'react-textarea-autosize';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Country, State, City } from 'country-state-city';
import BaseButton from '../../BaseButton/BaseButton';

const Details = () => {
  const visitingUser = useSelector((state) => state.visitingUser);
  const auth = useSelector((state) => state.auth);
  const [editHover, setEditHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    country: null,
    city: null,
    education: null,
  });

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const displayTime = (t) => {
    const timeElapsed = (Date.now() - new Date(t)) / 1000;
    const min = 60;
    const hour = min * 60;
    const day = hour * 24;

    if (timeElapsed < 5 * min) {
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

  const setCountry = (e) => {
    console.log(State.getStatesOfCountry(e.target.value));
    setUserInfo((p) => {
      return { ...p, country: e.target.value };
    });
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          modalState={{ isModalOpen, setIsModalOpen }}
          openModal={openModal}
          closeModal={closeModal}
        >
          <div className="5xl:w-[700px] bg-white m-[10px] font-nunito font-medium text-[16px] ">
            <div className='flex flex-row justify-start items-center my-[15px]'>
              <label
                className={'pr-[3px] flex flex-row items-center justify-center'}
                htmlFor="countries"
              >
                {' '}
                <IoAddCircleOutline
                  size={30}
                  color={'#6246e9'}
                  className="mr-[15px]"
                />{' '}
                Country{' '}
              </label>
              <select
                className="w-[150px] text-[#6246e9] border-[#6246e9] rounded-lg"
                onChange={setCountry}
                id="countries"
              >
                {Country.getAllCountries().map((obj, id) => (
                  <option key={obj.isoCode} value={obj.isoCode}>
                    {obj.name}
                  </option>
                ))}
              </select>
              <label
                disabled={false}
                htmlFor="state"
                className="pl-[20px] pr-[5px]"
              >
                State{' '}
              </label>
              <select
                className="text-[#6246e9] 5xl:w-[200px]"
                disabled={false}
                name="state"
              >
                {
                  State.getStatesOfCountry(userInfo.country).map((obj, id) => (
                    <option key={obj.isoCode}>{obj.name}</option>
                  ))
                  // console.log(State.getStatesOfCountry('IN'))
                }
              </select>
            </div>
            <div className='flex flex-row justify-start items-center my-[15px]'>
              <label
                className={'pr-[3px] flex flex-row items-center justify-center'}
                htmlFor="userBio"
              >
                {' '}
                <IoAddCircleOutline
                  size={30}
                  color={'#6246e9'}
                  className="mr-[15px]"
                />{' '}
                Bio{' '}
              </label>
              <TextareaAutosize
                  placeholder="Your bio goes here..."
                  className="font-nunito text-[16px] 5xl:w-[500px] text-[#6246e9] font-medium pl-[10px] w-[300px]"
                  id='userBio'
                />
            </div>
            <div className='flex flex-row justify-start my-[15px]'>
              <label
                className={'pr-[3px] flex flex-row items-center justify-center'}
                htmlFor="education"
              >
                {' '}
                <IoAddCircleOutline
                  size={30}
                  color={'#6246e9'}
                  className="mr-[15px]"
                />{' '}
                Studied From{' '}
              </label>
              <TextareaAutosize
                  placeholder="School/College"
                  className="font-nunito text-[16px] 5xl:w-[500px] text-[#6246e9] font-medium pl-[10px] w-[300px]"
                  id='education'
                />
            </div>
            <div className='flex justify-center mt-[40px]'>
                <BaseButton variant={'solid'} className={'mr-[10px]'}>Save</BaseButton>
                <BaseButton variant={'red'}>Discard Changes</BaseButton>
            </div>
          </div>
        </Modal>
      )}
      <div
        className="bg-[#fff] w-[450px] h-full m-[20px] flex justify-between flex-row rounded-xl shadow-[0px_6px_14px_2px_rgb(185,185,185)]"
        onMouseEnter={() => setEditHover(true)}
        onMouseLeave={() => setEditHover(false)}
      >
        <div>
          <div //*  JOINED AT
            className="w-full p-[5px] py-[10px]"
          >
            <div className="flex items-center mx-[10px]">
              <MdCake size={22} color="#8a939e" />
              <span className="ml-[15px] align-text-bottom font-nunito text-[#303030]">
                Joined on
              </span>
              <span className="ml-[3px] font-nunito font-extrabold">
                {displayTime(visitingUser?.user?.dateCreated)}
              </span>
            </div>
          </div>
          <div //*  FROM
            className="w-full p-[5px] pb-[10px]"
          >
            <div className="flex items-center mx-[10px]">
              <TiLocation size={22} color="#8a939e" />
              <span className="ml-[15px] align-text-bottom font-nunito text-[#303030]">
                From
              </span>
              <span className="ml-[3px] font-nunito font-extrabold">
                New Delhi, India
              </span>
            </div>
          </div>
          <div //*  STUDIED AT
            className="w-full p-[5px] pb-[10px]"
          >
            <div className="flex items-center mx-[10px]">
              <FaGraduationCap size={22} color="#8a939e" />
              <span className="ml-[15px] align-text-bottom font-nunito text-[#303030]">
                Studied at
              </span>
              <span className="ml-[3px] font-nunito font-extrabold">
                {'Make Shift Institute of Technology'}
              </span>
            </div>
          </div>
        </div>
        <div className="m-[10px]">
          {visitingUser.user._id === auth._id && (
            <span
              className={
                editHover
                  ? 'hover:cursor-pointer opacity-1 transition-all'
                  : '' + ' opacity-0 transition-all'
              }
              onClick={openModal}
            >
              <FiEdit size={20} color="#8a939e" />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
