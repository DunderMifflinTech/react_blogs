import React from 'react';
import UnknownPerson from '../../../images/UnknownPerson.jpg';

const FoundUsers = ({ users }) => {
  return (
    <div className="bg-white w-[300px] max-h-[450px] overflow-y-scroll border-b rounded-b-2xl absolute top-[40px] shadow-md z-10 flex flex-col justify-center items-center">
      {users?.length > 0 ? (
        users.map((obj, idx) => {
          return (
            <div
              key={obj?._id || idx}
              className={
                (idx === 0 ? ' mt-[16px]' : ' ') +
                (idx === users?.length - 1 ? ' mb-[16px]' : ' ') +
                ' h-[70px] w-11/12 mt-[7px] rounded-xl hover:bg-[#f8f8f8] hover:shadow-sm transition-shadow duration-300 ease-in-out flex'
              }
            >
              <div className="h-[40px] w-[40px] ml-[5px] mt-[10px]">
                <img
                  src={obj?.profilePictureURL || UnknownPerson}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col pl-[10px] cursor-pointer">
                <span className="font-extrabold h-[15px]">{obj?.name}</span>
                <span className="text-[#666666] text-[13.5px] h-[15px] pt-[6px]">
                  to do is to be to be is to do
                </span>
                <div className='pt-[10px] text-[#666666] text-[13.5px]'>
                  <span>83  Followers</span>
                  <span className='ml-[10px]'>91  Following</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="my-[20px] w-11/12 text-center table-cell text-[#666666]">
          no users found
        </div>
      )}
    </div>
  );
};

export default FoundUsers;
