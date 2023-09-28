import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

const Modal = ({
  modalState,
  closeModal,
  children,
  modalWidth,
  modalHeight,
}) => {
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
    setCanModalClose(false);
  };

  return (
    <>
      <div
        className={
          'w-full h-full backdrop-blur-sm backdrop-brightness-50 fixed bottom-0 left-0 z-[1] flex justify-center items-center'
        }
        onMouseDown={onModalBackdropMouseDown}
        onMouseUp={onModalBackdropMouseUp}
      >
        <div
          className={
            'bg-white flex flex-col rounded-xl'+
            (modalWidth ? ` w-[${modalWidth}px]` : '') +
            (modalHeight ? ` h-[${modalHeight}px]` : '')
          }
          onMouseDown={handleModalInsideMouseDown}
          onMouseUp={handleModalInsideMouseUp}
        >
          <div className=" flex justify-end rounded-xl">
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

export default Modal;
