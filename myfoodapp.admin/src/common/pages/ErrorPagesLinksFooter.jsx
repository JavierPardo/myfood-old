import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ROUTES } from '../globalConstants';
import { Link, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import globalMessages from '../globalMessages';
import { useDispatch } from 'react-redux';
import { removeCookie } from '../cookies';
import {
  changeBranchAction,
  changeClientAction,
} from '../../store/actions/user.actions';

export default function ErrorPagesLinksFooter() {
  const { user } = useContext(UserContext);
  const { formatMessage } = useIntl();

  const { updateUser } = useContext(UserContext);
  const history = useHistory();
  const dispatch = useDispatch();

  function logoutClickHandler() {
    updateUser({ loaded: true });
    removeCookie('Authorization');

    dispatch(changeClientAction(''));
    dispatch(changeBranchAction(''));
    history.push(ROUTES.public.login);
  }
  return (
    <ul className="list-inline text-center text-sm mb-4">
      <li className="list-inline-item">
        {user.roles && user.roles.length ? (
          <>
            <Link to={ROUTES.private.default} className="text-muted">
              {formatMessage(globalMessages.goToApp)}
            </Link>
            &nbsp;|&nbsp;
            <Link
              to={ROUTES.public.login}
              onClick={logoutClickHandler}
              className="text-muted"
            >
              {formatMessage(globalMessages.logout)}
            </Link>
          </>
        ) : (
          <Link to="login" className="text-muted">
            Login
          </Link>
        )}
      </li>
    </ul>
  );
}
