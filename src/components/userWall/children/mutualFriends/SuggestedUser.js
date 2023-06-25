import userEvent from '@testing-library/user-event';
import React from 'react';
import Tags from '../../../helperComponents/Tags';

function SuggestedUser({ user, isLast, isFirst, ...restOfProps }) {
  const tagsFunc = () => {
    let arr = [];
    let totalLenght = 0;
    for (let i = 0; i < user.interests.length; i++) {
      totalLenght += user.interests[i].length + 2;
      if (totalLenght > 25) break;
      else arr.push(user.interests[i]);
    }
    return arr;
  };
  return (
    <div
      className={
        (isLast == true ? 'hover:rounded-b-2xl' : '') +
        (isFirst == true ? 'border-t-[1px]' : '') +
        ' h-[110px] w-full flex align-items-center hover:bg-[#f7f7f7] hover:ease-in-out transition-all'
      }
    >
      <img
        src={user.userPFP}
        className=" m-[10px] mt-[20px] h-[30px] w-[30px] rounded-full "
      />
      <div className="overflow-hidden pt-[10px] w-full">
        <li className="list-none text-[0.8rem] font-bold">{user.userNik}</li>
        <li className="inline list-none text-[12px] text-[#4d4d4d]">
          {user.userBio.length > 28
            ? user.userBio.substring(0, 28) + '...'
            : user.userBio}
        </li>
        <li className="list-none whitespace-nowrap">
          {tagsFunc().map((val) => {
            return <Tags value={val} key={val} />;
          })}
        </li>
        <li className="list-none whitespace-nowrap text-[12px] text-[#666666] pt-[5px]">
          {(`friends with `) + (user.mutualFriends[0]) + ` and ${user.mutualFriends.length - 1} others`}
        </li>
      </div>
    </div>
  );
}

export default SuggestedUser;
