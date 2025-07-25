import React from 'react';
import PrivateRoute from '../../../PrivateRoute';
import { ROUTES } from '../../../globalConstants';
import List from './List';

export default function index() {
  return (
    <>
      <PrivateRoute exact path={ROUTES.report.list} component={List} />
    </>
  );
}
