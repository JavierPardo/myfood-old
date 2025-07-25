import { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../globalConstants';
import { UserContext } from '../contexts/UserContext';
import { removeCookie } from '../../common/cookies';
import {
  changeClientAction,
  changeBranchAction,
} from '../../store/actions/user.actions';

export const useLogout = () => {
  const { updateUser } = useContext(UserContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    updateUser({ loaded: true });
    removeCookie('Authorization');

    dispatch(changeClientAction(''));
    dispatch(changeBranchAction(''));
    history.push(ROUTES.public.login);
  }, [dispatch, history, updateUser]);

  return logout;
};
