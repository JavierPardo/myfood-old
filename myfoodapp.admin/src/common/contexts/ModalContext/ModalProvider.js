import React, { useState } from 'react';
import ModalContext, { defaultModalProps } from './ModalContext';

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState(defaultModalProps);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    const { onCancel = () => {} } = modalProps;
    onCancel();
    setIsOpen(false);
  };

  const updateModalProps = (props, mergeWithOldOnes = false) => {
    if (mergeWithOldOnes) {
      setModalProps({ ...modalProps, ...props });
      return;
    }
    setModalProps(props);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, updateModalProps, isOpen, modalProps }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
