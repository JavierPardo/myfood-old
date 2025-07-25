import React from 'react';

import Edit from './Edit';
import List from './List';
import { ROUTES } from '../../globalConstants';
import PrivateRoute from '../../PrivateRoute';

export default function Index() {
  return (
    <>
      <PrivateRoute exact path={ROUTES.order.edit} component={Edit} />
      <PrivateRoute exact path={ROUTES.order.new} component={Edit} />
      <PrivateRoute exact path={ROUTES.order.list} component={List} />
    </>
  );
}
