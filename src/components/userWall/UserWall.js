import React from 'react';
import CreateArticles from './children/createArticle/CreateArticles';
import Feed from './children/feed/Feed';
import MutualFriends from './children/mutualFriends/MutualFriends';
import PersonalArticles from './children/personalArticles/PersonalArticles';
import TopicWiseArticle from './children/topicWisearticle/TopicWiseArticle';
import UserBio from './children/userBio/UserBio';
import './UserWall.css';
import userPFP from './../../images/userPFP.png';

function UserWall() {
  return (
    <>
      <div className="user-wall-container pl-[3rem] pr-[3rem] pt-[3rem]">
        <div>
          <UserBio
            userPFP={userPFP}
            creatorNik={'creatorNik'}
            creatorBio={'creatorBio'}
          />
          <PersonalArticles />
        </div>
        <div>
          <CreateArticles userPFP={userPFP} userNik = {"userNik"}/>
          <Feed />
        </div>
        <div>
          <MutualFriends />
          <TopicWiseArticle />
        </div>
      </div>
    </>
  );
}

export default UserWall;
