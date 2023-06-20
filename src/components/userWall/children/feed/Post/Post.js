import React from 'react';
import userPFP from '../../../../../images/userPFP.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const bio = 'To do is to be, to be is to do, scooby dooby doo';

function Post({}) {
  return (
    <div className="h-[100px] w-full bg-[#fff] mt-[20px] rounded-md outline outline-[1px] outline-[#d7d7d7]">
      <div>
        <div className="post-container p-[15px]">
          {' '}
          {/*// ! contains the whole post in this div */}
          <div className="postee-info-container flex">
            {' '}
            {/* //! the postee's info*/}
            <div>
              <img src={userPFP} className="h-[48px] w-[48px] rounded-full" />
            </div>
            <div>
              <ul className="pl-[10px]">
                <li className="h-[15px] user-name list-none text-[12px] font-bold flex items-center">
                  Daniel Carraway
                </li>
                <li className="h-[15px] user-bio list-none text-[12px] text-[#4d4d4d]">
                  {' '}
                  {bio.length > 28 ? bio.substring(0, 28) + '...' : bio}
                </li>
                <li className="time-stamp h-[15px] list-none text-[#4d4d4d] text-[12px]"> 3h</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
