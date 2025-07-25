import React, { useContext } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ModalContext } from '../contexts/ModalContext';

const ModalCmpt = () => {
  const {
    isOpen,
    closeModal,
    modalProps: {
      title,
      acceptLabel,
      cancelLabel,
      onAccept,
      content,
      size,
      isReadOnly,
    },
  } = useContext(ModalContext);
  return (
    <Modal isOpen={isOpen} size={size}>
      <ModalHeader toggle={closeModal}>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          {cancelLabel}
        </Button>
        {!isReadOnly && (
          <Button color="primary" onClick={onAccept}>
            {acceptLabel}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ModalCmpt;
