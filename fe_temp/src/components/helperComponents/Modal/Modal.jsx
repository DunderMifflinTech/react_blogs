import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import BaseButton from '../../BaseButton/BaseButton';
import { useDispatch } from 'react-redux';
import { fetchUserFeed } from '../../../rtk/features/Post/postsSlice';
import axios from 'axios';

const Modal = ({ modalState, modalParamsState }) => {
  const [canModalClose, setCanModalClose] = useState(true);
  const dispatch = useDispatch();

  const onModalBackdropClick = () => {
    if (canModalClose) {
      document.body.style.overflow = '';
      modalState.setIsModalOpen(false);
    }
    setCanModalClose(true);
  };

  const onModalBodyContainerMouseDown = (e) => {
    e.stopPropagation();
    setCanModalClose(false);
  };

  const onUpdateButtonClick = async () => {
    console.log(modalParamsState.modalParams);
    if (modalParamsState.modalParams.editValue.trim().split(' ').length <= 0)
      return;
    try {
      await axios.patch(import.meta.env.VITE_API_URL + '/post/edit-post', {
        user: { _id: modalParamsState.modalParams.userId },
        post: { _id: modalParamsState.modalParams.postId },
        body: modalParamsState.modalParams.editValue.trim(),
      });
      document.body.style.overflow = '';
      modalState.setIsModalOpen(false);
      await dispatch(fetchUserFeed()).unwrap();
    } catch (err) {
      alert('something went wrong, please try again later. error: \n' + err);
    }
  };

  const onDeleteButtonClick = async () => {
    try {
      let payload = {
        user: { _id: modalParamsState.modalParams.userId },
        post: { _id: modalParamsState.modalParams.postId },
      };
      await axios.delete(import.meta.env.VITE_API_URL + '/post/delete-post', { data : payload });
      document.body.style.overflow = '';
      modalState.setIsModalOpen(false);
      await dispatch(fetchUserFeed()).unwrap();
    } catch (e) {
      alert(
        'something went wrong, please try again later. error: \n' + e.message
      );
    }
  };

  return (
    <div
      className="modal-backdrop w-full h-full backdrop-blur-sm backdrop-brightness-50 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
      onClick={onModalBackdropClick}
    >
      <div
        onMouseDown={onModalBodyContainerMouseDown}
        className={
          (modalParamsState.modalParams.modalType === 'EDIT'
            ? 'w-[600px] h-[400px]'
            : 'w-[430px] h-[215px]') +
          ' modal-body-container rounded-lg bg-[#fff]'
        }
      >
        <div className="flex flex-row justify-between p-[10px] pl-[18px] pb-[15px] border-b">
          <h3 className="font-semibold self-end">
            {modalParamsState.modalParams.modalType === 'EDIT'
              ? 'Update Post'
              : 'Delete post'}
          </h3>
          <IoClose
            onClick={() => {
              document.body.style.overflow = '';
              modalState.setIsModalOpen(false);
            }}
            size={30}
            style={{ color: '#5c5c5c' }}
            className=" hover:bg-slate-200 rounded-full p-[2px] duration-300 ease-in-out cursor-pointer"
          />
        </div>
        {modalParamsState.modalParams.modalType === 'EDIT' ? (
          <div //* INPUT
          >
            <div className="flex flex-col">
              <textarea
                placeholder={'Update your post here...'}
                className="post-div p-[20px] w-full h-[250px] overflow-y-scroll font-nunito text-[16px] font-semibold text-[#303030]"
                value={modalParamsState.modalParams.editValue}
                onChange={(e) => {
                  modalParamsState.setModalParams((prev) => {
                    return { ...prev, editValue: e.target.value.trimStart() };
                  });
                }}
              ></textarea>
            </div>
          </div>
        ) : (
          <div className="p-[20px] mt-[10px]">
            <span> Are you sure you want to delete this post ?</span>
          </div>
        )}
        <div className=" h-[85px] p-[15px] flex place-content-center place-items-center">
          {modalParamsState.modalParams.modalType === 'EDIT' ? (
            <BaseButton
              disabled={
                modalParamsState.modalParams.editValue.trim().split('')
                  .length == 0
                  ? true
                  : false
              }
              children={
                <>
                  <FiUpload size={20} className="mr-[10px]" />
                  <span>Update</span>
                </>
              }
              variant={'solid'}
              className={' flex flex-row h-[40px] mr-[10px] place-items-center'}
              onClick={onUpdateButtonClick}
            />
          ) : (
            <BaseButton
              children={
                <>
                  <MdDelete size={20} className="mr-[10px]" />
                  <span>Delete</span>
                </>
              }
              variant={'red'}
              className={' flex flex-row h-[40px] mr-[10px] place-items-center'}
              onClick={onDeleteButtonClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
