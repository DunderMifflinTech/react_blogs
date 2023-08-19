import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import BaseButton from '../../BaseButton/BaseButton';

const Modal = ({modalState}) => {

    const[inputVal, setInputVal] = useState('');
    const [canModalClose, setCanModalClose] = useState(true);

    const onModalBackdropClick = () =>{
        if(canModalClose){
            document.body.style.overflow = ''
            modalState.setIsModalOpen(false);
        }
        setCanModalClose(true);
    }

    const onModalBodyContainerMouseDown = (e) =>{
        e.stopPropagation();
        setCanModalClose(false);
    }

  return (
    <div className="modal-backdrop w-full h-full backdrop-blur-sm backdrop-brightness-50 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
    onClick={onModalBackdropClick}>
      <div 
      onMouseDown={onModalBodyContainerMouseDown}
      className="modal-body-container rounded-lg w-[600px] h-[400px] bg-[#fff] ">
        <div className="flex flex-row justify-between p-[10px] pl-[18px] pb-[25px]">
          <h3 className="font-semibold self-end">Update Post</h3>
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
        <div //* INPUT
        >
            <div className="flex flex-col">
              <textarea
                placeholder={'Update your post here...'}
                className="block post-div p-[20px] w-full h-[250px] outline-none overflow-y-scroll"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        <div className=" h-[85px] p-[15px] flex place-content-center place-items-center">
          <BaseButton //* UPDATE BUTTON
            children={
              <>
                <FiUpload size={20} className="mr-[10px]" />
                <span>Update</span>
              </>
            }
            variant={'solid'}
            className={' flex flex-row h-[40px] mr-[10px] place-items-center'}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
