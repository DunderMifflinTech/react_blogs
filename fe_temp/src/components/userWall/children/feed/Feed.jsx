import React, { useEffect } from 'react';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFeed } from '../../../../rtk/features/Post/postsSlice';

function Feed() {
  const dispatch = useDispatch();
  const postsArray = useSelector((state) => state.feed.posts);
  const userCache = useSelector(state=> state.userCache.users);
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        await dispatch(fetchUserFeed()).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeed();
  }, []);

  const getUser = (obj)=>{
    for(let usr of userCache){
      if(usr._id === obj.ownerId){
        return usr;
      }
    }
    return null;
  }

  return (
    <>
      {postsArray.map((obj)=>(<Post key = {obj._id} props = {obj} user = {getUser(obj)}/>)).reverse()}
    </>
  );
}

export default Feed;
