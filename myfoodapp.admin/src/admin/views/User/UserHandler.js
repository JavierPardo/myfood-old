import React from 'react';
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { useHistory } from 'react-router';

import { useIntl } from 'react-intl';

import { useParams } from 'react-router-dom';

import { errorHandler } from '../../../common/Forms';
import { ROUTES } from '../../../common/globalConstants';
import globalMessages from '../../../common/globalMessages';
import { toValueLabelList } from '../../../common/utils';
import { userHttp, roleHttp } from '../../../services/http';

import User from './User';
import messages from './messages';

export const fieldsName = {
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  USERNAME: 'userName',
  EMAIL: 'email',
  PHONENUMBER: 'phoneNumber',
  PHONENUMBERCONFIRMED: 'phoneNumberConfirmed',
  PASSWORD: 'password',
  ROLEID: 'role',
};

const initialValues = {
  [fieldsName.FIRSTNAME]: '',
  [fieldsName.LASTNAME]: '',
  [fieldsName.EMAIL]: '',
  [fieldsName.USERNAME]: '',
  [fieldsName.PHONENUMBER]: '',
  [fieldsName.PHONENUMBERCONFIRMED]: '',
  [fieldsName.PASSWORD]: '',
  [fieldsName.ROLEID]: '',
  canEdit: true,
};

const loadDependecies = (userId) => {
  const promises = Promise.allSettled([roleHttp.getRoles()]).then(
    ([roleResolved]) => ({
      roles:
        roleResolved.status === 'fulfilled'
          ? toValueLabelList(roleResolved.value, 'name', 'name')
          : [],
    })
  );
  if (!userId) {
    return promises;
  }
  return Promise.all([promises, userHttp.getUser(userId)]).then(
    ([{ roles }, { ...values }]) => ({
      roles,
      user: {
        ...values,
      },
    })
  );
};

const UserHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { id } = useParams();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadDependecies(id)
      .then(({ roles, user }) => {
        setRoles(roles);
        if (user) {
          setInitValues(user);
        }
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  }, [id, formatMessage]);

  const saveUser = (user) => {
    setLoading(true);
    if (user.password === fieldsName.PASSWORD) delete user.password;

    const serviceMethod = id
      ? userHttp.updateUser({ ...user, id })
      : userHttp.register(user);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreated));
        history.push(ROUTES.user);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const deleteUser = () => {
    setLoading(true);
    userHttp
      .deleteUser(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        history.push(ROUTES.user);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const goBack = () => history.push(ROUTES.user);

  return (
    <User
      loading={loading}
      initValues={initValues}
      isEdit={!!id}
      availableRoles={roles}
      goBack={goBack}
      saveUser={saveUser}
      deleteUser={deleteUser}
      isReadOnly={isReadOnly}
    />
  );
};

export default UserHandler;
