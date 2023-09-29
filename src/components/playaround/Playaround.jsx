import React, { useState, useRef, useEffect } from 'react';
import { useTransition } from 'react-spring';
import './playaround.css';

import { IoClose } from 'react-icons/io5';

function Playaround({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };
  return (
    <>
      <div className="bg-[#a61300db] w-[100vw] h-[100vh]">
        {isModalOpen && (
          <Modal
            modalState={{ isModalOpen, setIsModalOpen }}
            openModal={openModal}
            closeModal={closeModal}
          >
            <PopUp />
          </Modal>
        )}
        <button onClick={() => openModal()}>open modal</button>
      </div>
    </>
  );
}

const Modal = ({ modalState, openModal, closeModal, children }) => {
  const [canModalClose, setCanModalClose] = useState(true);
  const onModalBackdropMouseDown = () => {
    setCanModalClose(true);
  };

  const onModalBackdropMouseUp = () => {
    if (canModalClose) closeModal();
    setCanModalClose(true);
  };

  const handleModalInsideMouseDown = (e) => {
    e.stopPropagation();
    setCanModalClose(false);
  };

  const handleModalInsideMouseUp = (e) => {
    e.stopPropagation();
    canModalClose(false);
  };

  return (
    <>
      <div
        className="w-full h-full backdrop-blur-sm backdrop-brightness-50 fixed bottom-0 left-0 z-[1] flex justify-center items-center"
        onMouseDown={onModalBackdropMouseDown}
        onMouseUp={onModalBackdropMouseUp}
      >
        <div
          className="flex flex-col"
          onMouseDown={handleModalInsideMouseDown}
          onMouseUp={handleModalInsideMouseUp}
        >
          <div className="bg-[#fffffff5] flex justify-end">
            <IoClose
              size={30}
              style={{ color: '#5c5c5c' }}
              className=" hover:bg-slate-200 rounded-full p-[2px]"
              onClick={closeModal}
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

const PopUp = ({}) => {
  return (
    <>
      <div className="w-[300px] h-[200px] bg-[#fffffff5] flex flex-row justify-end"></div>
    </>
  );
};

export default Playaround;
