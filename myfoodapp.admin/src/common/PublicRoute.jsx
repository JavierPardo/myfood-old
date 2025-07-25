import React from 'react';
import { Route, Redirect } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { ROUTES } from './globalConstants';

export default function PublicRoute({ ...rest }) {
  const { user } = useContext(UserContext);
  if (!!user.roles && !!user.roles.length) {
    return <Redirect to={ROUTES.private.default} path="*" />;
  }
  return <Route {...rest} />;
}
