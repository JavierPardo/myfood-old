import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';

import { ROUTES } from '../../../common/globalConstants';
import { userHttp } from '../../../services/http';
import { errorHandler } from '../../../common/Forms';
import globalMessages from '../../../common/globalMessages';

import UserList from './UserList';

const UserListHandler = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const goToCreate = () => history.push(ROUTES.createUser);
  const goToEdit = (id) => history.push(ROUTES.editUser.replace(':id', id));

  const loadUsers = () => {
    setLoading(true);
    userHttp
      .getAll()
      .then((users) => setUsers(users))
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(loadUsers, []);

  return (
    <UserList
      loading={loading}
      users={users}
      goToCreate={goToCreate}
      goToEdit={goToEdit}
      refresh={loadUsers}
    />
  );
};

export default UserListHandler;
