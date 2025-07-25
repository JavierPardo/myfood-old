import React from 'react';
import { Route } from 'react-router';
import PrivateRoute from '../../PrivateRoute';
import { ROUTES } from '../../globalConstants';
import List from './List';
import Edit from './Edit';

export default function index() {
  return (
    <>
      <PrivateRoute exact path={ROUTES.event.list} component={List} />
      <PrivateRoute exact path={ROUTES.event.edit} component={Edit} />
      <PrivateRoute exact path={ROUTES.event.new} component={Edit} />
    </>
  );
}
