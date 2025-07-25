import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import { Route } from 'react-router';
import { ROUTES } from '../../globalConstants';
import Edit from './Edit';
import List from './List';

export default function Index() {
  return (
    <>
      <Route exact path={`${ROUTES.user}`} component={List} />
      <Route exact path={`${ROUTES.user}/new`} component={Edit} />
    </>
  );
}
