import { createContext } from 'react';

export const defaultUser = {
  email: '',
  password: '',
  loaded: false,
};

const updateUser = () => {};

const UserContext = createContext({
  user: defaultUser,
  updateUser,
});

export default UserContext;
