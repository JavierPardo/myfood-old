import { toast } from 'react-toastify';

export const errorHandler = (
  unknownMessage = 'unknow error',
  { status = 0, data: { title } = {} }
) => {
  if (status > 399 && status < 500 && title) {
    toast.error(title);
    return;
  }
  toast.error(unknownMessage);
};

export const generalErrorHandler = ({ title } = {}) => {
  if (title) {
    toast.error(title);
  }
  const message = 'Algo salió mal, por favor vuelve a intentar mas tarde.';
  toast.error(message);
};

export const silenceErrorHandler = (error) => {
  console.error(error);
};
