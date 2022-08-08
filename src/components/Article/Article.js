import React from 'react';
import LoremIpsum from 'react-lorem-ipsum';

function Article({ info }) {
  return (
    <div className="flex flex-row">
      <div className="article-container ml-[5vw] mt-[20px] w-[75vw] h-full flex flex-col rounded-[12px] overflow-hidden">
        <div className="article-header p-[15px] bg-white flex flex-row rounded-[12px]">
          <div className=" article-image w-[40%] overflow-hidden rounded-[12px] flex justify-center items-center">
            <img
              className="object-contain rounded-[12px]"
              src={info.blogImage}
              alt="img"
            ></img>
          </div>
          <div className="mt-[20px] ml-[40px] flex flex-col w-[50%]">
            <div className="font-[700] text-[25px]">{info.blogTitle}</div>
            <div className="mt-[10px] flex flex-row flex-wrap justify-start list-none">
              {info.blogTags.map((val) => (
                <li
                  className="text-[15px] flex text-center px-[10px] py-[3px] mx-[5px] mb-[5px] text-[#e5e7eb] whitespace-nowrap bg-[#6246ea] hover:bg-[#322479] ease-out duration-300 rounded-full cursor-pointer"
                  key={val}
                >
                  {val}
                </li>
              ))}
            </div>
            <div className="blogAbstract mt-[7px] text-[13px] h-[7vh] overflow-scroll text-[#bfc1c4]">
              {info.blogAbstract}
            </div>
            <div className="mt-[25px] w-[260px] flex flex-row h-[57px]">
              <div className="w-[57px] h-[57px] rounded-full flex content-center items-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={info.creatorPFP}
                  alt="img"
                ></img>
              </div>
              <ul className="pl-[15px] text-[16px]">
                <li className="font-[600]">{info.creatorName}</li>
                <li className="font-[100] mt-[5px] text-[14px]">10 Jan '22</li>
              </ul>
              <div className="h-[20px] w-[80px] mt-[30px] mx-[20px] font-[100] text-[14px] ">
                3 min read
              </div>
            </div>
          </div>
        </div>
        <div className="article-content bg-white p-[20px]">
          <LoremIpsum p={14} />
        </div>
      </div>
      <div className=" bg-slate-700"></div>
    </div>
  );
}

export default Article;
