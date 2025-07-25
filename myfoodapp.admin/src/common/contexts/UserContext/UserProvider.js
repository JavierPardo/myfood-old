 import React, { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useLocation } from 'react-router';

import { userHttp } from '../../../services/http';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';

import UserContext, { defaultUser } from './UserContext';

const UserProvider = ({ children }) => {
  let location = useLocation();
  const [user, updateUser] = useState(defaultUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !location.pathname.toLowerCase().startsWith('/admin') &&
      !location.pathname.toLowerCase().startsWith('/login')
    ) {
      updateUser({ loaded: true });
    } else if (user && !user.loaded) {
      dispatch(addSpinner('load_currentUser'));
      userHttp
        .getCurrentUser()
        .then(function (currentUser) {
          updateUser({ ...currentUser, loaded: true });
        })
        .catch(function () {
          updateUser({ loaded: true });
        })
        .finally(function () {
          dispatch(removeSpinner('load_currentUser'));
        });
    }
    return () => {};
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
