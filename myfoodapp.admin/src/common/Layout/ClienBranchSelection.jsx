import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from '../components/Select';
import clientHttp from '../../services/http/clientHttp';
import branchHttp from '../../services/http/branchHttp';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  changeClientAction,
  changeBranchAction,
} from '../../store/actions/user.actions';

import {
  addSpinner,
  removeSpinner,
  toggleRealoadBranches,
  toggleReloadClients,
} from '../../store/actions/applications.actions';
import { Row, Col } from 'reactstrap';
import { UserContext, UserProvider } from '../contexts/UserContext';
import { useContext } from 'react';
import roles from '../../admin/roles';
import { removeCookie } from '../cookies';
import { ROUTES } from '../globalConstants';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import globalMessages from '../globalMessages';

export default function ClienBranchSelection() {
  const [clients, setClients] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [client, setClient] = useState(null);
  const { updateUser, user } = useContext(UserContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { formatMessage } = useIntl();
  const userPreference = useSelector((state) => state.userPreference);
  const { reloadClients, reloadBranches } = useSelector(function (state) {
    return state.application;
  });
  if (reloadBranches) {
    dispatch(toggleRealoadBranches());
    loadBranches(client.value);
  }

  if (reloadClients) {
    dispatch(toggleReloadClients());
    loadClients(client.value);
  }

  function loadBranches(clientId) {
    if (!clientId) {
      return;
    }
    dispatch(addSpinner('Load_BRANCHEs'));
    return branchHttp
      .getByClientId(clientId)
      .then(function (responseBranches) {
        return responseBranches.map(function (c) {
          return { label: c.name, value: c.id };
        });
      })
      .then((responseBranches) => {
        const branchPreferred =
          responseBranches.find((b) => b.value === userPreference.branchId) ||
          responseBranches[0] ||
          {};
        setBranches(responseBranches);
        dispatch(changeBranchAction(branchPreferred.value));
        setBranch(branchPreferred);
        dispatch(removeSpinner('Load_BRANCHEs'));
      });
  }

  function loadClients() {
    dispatch(addSpinner('Load_CLIENTS'));
    return clientHttp
      .getAll()
      .then(function (responseClients) {
        return responseClients.map(function (c) {
          return { label: c.clientName, value: c.id };
        });
      })
      .then((responseClients) => {
        const clientPreferred =
          responseClients.find((c) => c.value === userPreference.clientId) ||
          responseClients[0] ||
          {};
        dispatch(removeSpinner('Load_CLIENTS'));
        if (!clientPreferred.value && !user.roles.includes(roles.superAdmin)) {
          logout();
        } else {
        }
        setClients(responseClients);
        dispatch(changeClientAction(clientPreferred.value));
        setClient(clientPreferred);
        if (!clientPreferred.value) {
          return;
        }
        return loadBranches(clientPreferred.value);
      });
  }

  function logout() {
    updateUser({ loaded: true });
    removeCookie('Authorization');

    dispatch(changeClientAction(''));
    dispatch(changeBranchAction(''));
    history.push(ROUTES.public.login);
  }

  useEffect(() => {
    loadClients().catch(() => {});
    return () => {};
  }, []);

  const changeClientHandler = function (val) {
    dispatch(changeClientAction(val.value));
    dispatch(changeBranchAction(''));
    window.location.reload();
  };

  const changeBranchHandler = function (val) {
    setBranch(val);
    dispatch(changeBranchAction(val.value));

    window.location.reload();
  };

  return (
    <>
      <Row style={{ width: '500px', marginTop: '10px' }}>
        <Col>
          <Select
            value={client}
            options={clients}
            noOptionsMessage={function () {
              return formatMessage(globalMessages.noOptionLabel);
            }}
            onChange={changeClientHandler}
          />
        </Col>
        <Col>
          <Select
            value={branch}
            options={branches}
            noOptionsMessage={function () {
              return formatMessage(globalMessages.noOptionLabel);
            }}
            onChange={changeBranchHandler}
          />
        </Col>
      </Row>
    </>
  );
}
