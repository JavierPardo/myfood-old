import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { userHttp } from '../../../services/http';
import { ROUTES } from '../../globalConstants';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../contexts/UserContext';
import { setCookie } from '../../cookies';
import { toast } from 'react-toastify';
import messages from './messages';
import { useIntl } from 'react-intl';
import { userHasSomeRoles } from '../../utils';
import roles from '../../../admin/roles';
import { useLogout } from '../../hooks/useLogout';

const useLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { updateUser } = useContext(UserContext);
  const logout = useLogout();

  const onSubmit = (user) => {
    dispatch(addSpinner('login_request'));
    userHttp
      .login(user)
      .then((token) => {
        setCookie('Authorization', `Bearer ${token}`, 1);
        return userHttp.getCurrentUser();
      })
      .catch(() => {
        throw formatMessage(messages.loginFailed);
      })
      .then((user) => {
        if (userHasSomeRoles(user.roles, [roles.user])) {
          logout();
          throw formatMessage(messages.notAllowedUser);
        }
        return user;
      })
      .then((user) => {
        updateUser({ ...user, loaded: true });
        history.push(ROUTES.private.default);
      })
      .catch((errorMessage) => {
        toast.error(errorMessage);
      })
      .finally(function () {
        dispatch(removeSpinner('login_request'));
      });
  };

  return { onSubmit };
};

export default useLogin;
