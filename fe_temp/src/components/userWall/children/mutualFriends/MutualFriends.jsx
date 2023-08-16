import React from 'react';
import SuggestedUser from './SuggestedUser';
import userPFP from '../../../../images/userPFP.png';

function MutualFriends() {
  let usersArray = [
    {
      userPFP: userPFP,
      userNik: 'Daniel Carraway',
      userBio: 'To do is to be, to be is to do, scooby dooby doo',
      interests: ['music', 'History', 'song'], //include at max 3 choices
      mutualFriends: ["Ajay", "Dev", "Rohan"]
    },
    {
      userPFP: userPFP,
      userNik: 'Daniel Carraway',
      userBio: 'I do stuff hehe',
      interests: ['literature', 'History', 'Old'], //include at max 3 choices
      mutualFriends: ["Ajay", "Dev", "Rohan"]
    },
    {
      userPFP: userPFP,
      userNik: 'Daniel Carraway',
      userBio: 'We are just a spec of dust in this ginormous universe',
      interests: ['literature', 'History', 'Technology'], //include at max 3 choices
      mutualFriends: ["Ajay", "Dev", "Rohan"]
    },
  ];
  return (
    <div className="bg-[#fff] rounded-2xl border-[0.5px] border-[#fff] shadow-[6px_6px_14px_2px_rgb(185,185,185)] sticky top-10">
      <div className="pt-[10px] pb-[10px] flex place-content-center text-sm font-bold">
        People you may know
      </div>
      {usersArray.map((user, idx) => {
        return (
          <SuggestedUser
            user={user}
            isLast={idx == usersArray.length - 1}
            isFirst={idx == 0}
            key={idx}
          />
        );
      })}
    </div>
  );
}

export default MutualFriends;
