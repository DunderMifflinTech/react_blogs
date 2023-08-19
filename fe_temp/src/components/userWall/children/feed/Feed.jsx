import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFeed } from '../../../../rtk/features/Post/postsSlice';
import Modal from '../../../helperComponents/Modal/Modal';


function Feed() {
  const dispatch = useDispatch();
  const postsArray = useSelector((state) => state.feed.posts);
  const userCache = useSelector(state=> state.userCache.users);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    {isModalOpen && <Modal modalState = {{isModalOpen, setIsModalOpen}}  />}
      {postsArray.map((obj)=>(<Post key = {obj._id} props = {obj} user = {getUser(obj)} modalState = {{isModalOpen, setIsModalOpen}}/>)).reverse()}
    </>
  );
}

export default Feed;
