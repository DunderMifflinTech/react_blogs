import React from 'react';
import './UserBio.css'

function UserBio({ userPFP, creatorNik, creatorBio, ...restOfProps }) {
  return (
    <div className=" rounded-lg h-[100px] flex flex-row bg-[#ffff]">
      <div className=' user-img w-[100px] bg-[#6246EA] shrink-0 h-full flex justify-center items-center'>
        <img
          src={userPFP}
          className="h-[60px] w-[60px] border-[#525252] border-2 rounded-full"
        ></img>
      </div>
      <div className='w-full'>
        <p>{creatorNik}</p>
        <hr/>
        <p>{creatorBio}</p>
      </div>
    </div>
  );
}

export default UserBio;
