import {React, useState} from 'react';
import userPFP from '../../../../../images/userPFP.png';
import {FcLike, FcLikePlaceholder} from 'react-icons/fc'
import {TbShare3} from 'react-icons/tb'
import {BiComment} from 'react-icons/bi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Post.css'

const bio = 'To do is to be, to be is to do, scooby dooby doo';
function Post({}) {
    const [likeVar, setLikeVar] = useState(false);
  return (
    <div className="h-auto w-full bg-[#fff] mt-[20px] rounded-md outline outline-[1px] outline-[#d7d7d7]">
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
                <li className="h-[15px] user-bio list-none text-[12px] text-[#666666]">
                  {' '}
                  {bio.length > 28 ? bio.substring(0, 28) + '...' : bio}
                </li>
                <li className="time-stamp h-[15px] list-none text-[#666666] text-[12px]"> 3h</li>
              </ul>
            </div>
          </div>
          <div>
            <div className='post-body text-lg text-[#000] pt-[20px] text-[0.9rem]'>
                Yeehaw this is my first post !
            </div>
            <div className='flex flex-row-reverse select-none'>
                <div onClick={()=>setLikeVar(lv=> !lv)} className='like hover:cursor-pointer pr-[20px] flex text-[14px] items-center'><span className='pr-[7px]'>18</span>{likeVar?<FcLike size={25} className='like-enabled-icon'/> : <FcLikePlaceholder size={25} />}</div>
                <div className='share pr-[20px] hover:cursor-pointer flex text-[13px] items-center'><span className='pr-[7px]'>4</span><TbShare3 size={25}/></div>
                <div className='comment pr-[20px] hover:cursor-pointer flex text-[13px] items-center'><span className='pr-[7px]'>55</span><BiComment size={25}/></div>
                <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
