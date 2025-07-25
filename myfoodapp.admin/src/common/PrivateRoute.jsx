import React from 'react';
import { Route, Redirect, useHistory } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { ROUTES } from './globalConstants';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import globalMessages from './globalMessages';
import { useIntl } from 'react-intl';
import { useState } from 'react';

export default function PrivateRoute({
  roles = [],
  readonly = [],
  component: Component,
  clientDepends,
  branchDepends,
  ...rest
}) {
  const [warningVisible, setWarningVisible] = useState(true);
  const { formatMessage } = useIntl();
  const { branchId, clientId } = useSelector((state) => state.userPreference);
  const { user } = useContext(UserContext);
  if (!roles || !roles.length) {
    return <Redirect to={ROUTES.public.forbidden} path="*" />;
  }

  if (
    !user.roles ||
    !user.roles.length ||
    !user.roles.find(function (role) {
      return roles.indexOf(role) > -1;
    })
  ) {
    return <Redirect to={ROUTES.public.forbidden} path="*" />;
  }

  const isReadOnly =
    !!readonly &&
    !!readonly.filter(function (role) {
      return !!user.roles.find(function (r) {
        return r === role;
      });
    }).length;
  if ((clientDepends || branchDepends) && !clientId) {
    return <ClientRequired />;
  }
  if (branchDepends && !branchId) {
    return <BranchRequired />;
  }

  const messageEntityDepends = clientDepends
    ? globalMessages.clientDependsWarning
    : branchDepends
    ? globalMessages.branchDependsWarning
    : null;

  function warningDependsClickHandler() {
    setWarningVisible(false);
  }

  return (
    <Route
      {...rest}
      render={function () {
        return (
          <>
            {messageEntityDepends && (
              <Alert color="warning" isOpen={warningVisible}>
                {formatMessage(messageEntityDepends)}
              </Alert>
            )}
            <Component isReadOnly={isReadOnly} />
          </>
        );
      }}
    />
  );
}

function ClientRequired() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Alert color="error">
        <h4 className="alert-heading">
          {formatMessage(globalMessages.errorTitle)}!
        </h4>
        <p>{formatMessage(globalMessages.branchRequired)}</p>
        <hr />
        <p className="mb-0"></p>
      </Alert>
    </>
  );
}

function BranchRequired() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Alert color="danger">
        <h4 className="alert-heading">
          {formatMessage(globalMessages.errorTitle)}!
        </h4>
        <p>{formatMessage(globalMessages.branchRequired)}</p>
        <hr />
        <p className="mb-0"></p>
      </Alert>
    </>
  );
}
