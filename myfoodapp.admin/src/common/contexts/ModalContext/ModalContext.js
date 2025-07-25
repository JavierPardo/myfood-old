import { createContext } from 'react';

export const defaultModalProps = {
  title: '',
  size: '',
  content: () => {},
  onAccept: () => {},
  onCancel: () => {},
  acceptLabel: 'Accept',
  cancelLabel: 'Cancel',
  isReadOnly: false,
};

const ModalContext = createContext({
  modalProps: defaultModalProps,
  updateModalProps: () => {},
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export default ModalContext;
