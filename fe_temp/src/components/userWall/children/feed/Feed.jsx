import React, { useEffect, useState } from 'react';
import Post from './Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFeed } from '../../../../rtk/features/Post/postsSlice';
import Modal from '../../../helperComponents/Modal/Modal';

function Feed() {
  const dispatch = useDispatch();
  const postsArray = useSelector((state) => state.feed.posts);
  const feed = useSelector((state)=>state.feed);
  const userCache = useSelector((state) => state.userCache.users);
  const [isModalOpen, setIsModalOpen] = useState(false); //* this state is used to toggle the opening and closing of the edit/delete modal that resides in this component.
  const [modalParams, setModalParams] = useState({
    editValue: null,
    userId: '',
    modalType: '',
    postId: '',
  }); //* modalType is used to set the type of modal ie edit/delete. editValue is used to supply the edit value to the modal.

  const openModal = (type, userId, postid, body) => {
    console.log(type, userId, postid, body);
    if (type === 'DELETE') {
      setModalParams((prev) => {
        return { ...prev, userId: userId, modalType: 'DELETE', postId: postid };
      });
      setIsModalOpen(postid);
    } else if (type === 'EDIT') {
      setModalParams(() => {
        return {
          editValue: body,
          userId: userId,
          modalType: 'EDIT',
          postId: postid,
        };
      });
      setIsModalOpen(postid);
    } else {
      console.log('default modal');
    }
    document.body.style.overflow = 'hidden';
  };

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

  const getUser = (obj) => {
    for (let usr of userCache) {
      if (usr._id === obj.ownerId) {
        return usr;
      }
    }
    return null;
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          modalState={{ isModalOpen, setIsModalOpen }}
          modalParamsState={{ modalParams, setModalParams }}
        />
      )}
      {feed.loading ? <span>loading</span> : 
      (postsArray
        .map((obj) => (
          <Post
            key={obj._id}
            props={obj}
            user={getUser(obj)}
            modalState={{ isModalOpen, setIsModalOpen, openModal }}
          />
        ))
        .reverse())}
    </>
  );
}

export default Feed;
