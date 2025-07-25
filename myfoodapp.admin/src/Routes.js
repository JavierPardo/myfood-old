import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Admin from './admin';

import { NotFound, Error500, Login, Forbidden } from './common/pages';
import Examples from './examples/Routes';
import { UserProvider } from './common/contexts/UserContext';
import { ROUTES } from './common/globalConstants';
import PublicRoute from './common/PublicRoute';
import { ResetPasswordHandler } from './admin/views/User';
import { RecoverPasswordHandler } from './admin/views/User';
import Payment from './common/pages/Payment/payment';

const Routes = ({ location }) => {
  return (
    <UserProvider>
      <Switch location={location}>
        <PublicRoute exact path={ROUTES.public.login} component={Login} />
        <PublicRoute
          exact
          path={ROUTES.public.payment}
          component={Payment}
        />
        <PublicRoute
          exact
          path={ROUTES.resetPassword}
          component={ResetPasswordHandler}
        />
        <Route
          exact
          path={ROUTES.recoverPassword}
          component={RecoverPasswordHandler}
        />
        <Route path="/admin" component={Admin} />
        <Route exact path="/" component={Admin} />
        <Route path="/404" component={NotFound} />
        <Route path="/403" component={Forbidden} />
        <Route path="/500" component={Error500} />
        <Route path="/examples" component={Examples} />
        <Route component={NotFound} />
        {/* <Route exact path="/" component={Base} />
        <Route path={ROUTES.configuration} component={Client} />
        <Route path="/order" component={Order} /> */}
      </Switch>
    </UserProvider>
  );
};

export default Routes;
