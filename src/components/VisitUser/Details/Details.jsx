import React, { useState } from 'react';
import moment from 'moment';
import { MdCake } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa6';
import { TiLocation } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Details = () => {
  const visitingUser = useSelector((state) => state.visitingUser);
  const auth = useSelector((state) => state.auth);
  const [editHover, setEditHover] = useState(false);

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

  return (
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
          >
            <FiEdit size={20} color="#8a939e" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Details;
