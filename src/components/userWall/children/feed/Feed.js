import React, { useEffect } from 'react';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFeed } from '../../../../rtk/features/Post/postsSlice';

function Feed() {
  const dispatch = useDispatch();
  const postsArray = useSelector((state) => state.feed.posts);
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

  return (
    <>
      {postsArray.map((obj)=>(<Post key = {obj._id} props = {obj}/>))}
    </>
  );
}

export default Feed;
