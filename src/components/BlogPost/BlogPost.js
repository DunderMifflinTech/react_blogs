import React from 'react'
import './BlogPost.css'

function BlogPost({ image, title, creatorName, creatorPFP }) {
    return (
        <div className='w-[300px] h-[465px] flex flex-col bg-white content-center items-center rounded-[12px] border-none transition duration-150 ease-in-out hover:shadow-lg active:scale-95 cursor-pointer'>
            <div className='h-[240px] w-full p-[20px] flex content-center items-center overflow-hidden rounded-[12px]'>
                <img className='w-full h-full object-cover rounded-[12px]' src={image} alt='img'></img>
            </div>
            <div className='pt-[5px] px-[20px] font-[550] text-left text-[20px] '>
                {title} How to create a full stack web app in 2022
            </div>

            <div className='mt-[70px] mx-[20px] w-[260px] flex flex-row h-[57px]'>
                <div className = 'w-[57px] h-[57px] rounded-full flex content-center items-center overflow-hidden'>
                    <img className = 'w-full h-full object-cover' src={creatorPFP} alt='img'></img>
                </div>
                <ul className = 'pl-[15px] text-[16px]'>
                    <li className = 'font-[600]'>{creatorName}</li>
                    <li className = 'font-[100] mt-[5px] text-[14px]'>10 Jan '22</li>
                </ul>
                <div className = 'h-[20px] w-[80px] mt-[30px] ml-[2px] font-[100] text-[14px] '>3 min read</div>
            </div>
        </div>
    )
}

export default BlogPost;
