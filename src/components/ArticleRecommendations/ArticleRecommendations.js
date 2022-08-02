import React from 'react'
import BlogPost from '../BlogPost/BlogPost'
import laptop from '../../images/laptop.png';
import userPFP from '../../images/userPFP.png';
import BaseButton from '../BaseButton/BaseButton';

function ArticleRecommendations({ section }) {
    return (
        <div className='w-full flex flex-col bg-white min-w-[300px]'>
            <div className = 'w-full flex flex-row flex-wrap px-[90px] py-[20px] justify-between'>
                <div className = 'font-[700] flex items-center justify-center'>{section}</div>
                <BaseButton className='font-[700]' variant = 'ghost'>See all  articles</BaseButton>
            </div>

            <div className='flex flex-row flex-wrap mx-[70px] justify-between mb-[40px]'>
                <BlogPost title='title here' creatorName='CreatorName' image={laptop} dateCreated={new Date()} creatorPFP={userPFP} />
                <BlogPost title='title here' creatorName='CreatorName' image={laptop} dateCreated={new Date()} creatorPFP={userPFP} />
                <BlogPost title='title here' creatorName='CreatorName' image={laptop} dateCreated={new Date()} creatorPFP={userPFP} />
                <BlogPost title='title here' creatorName='CreatorName' image={laptop} dateCreated={new Date()} creatorPFP={userPFP} />
            </div>
        </div>
    )
}

export default ArticleRecommendations;
