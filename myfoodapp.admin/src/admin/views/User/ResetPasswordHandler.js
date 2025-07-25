import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import { errorHandler } from '../../../common/Forms';
import { userHttp } from '../../../services/http';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

import ResetPassword from './ResetPassword';

export const fieldsName = {
  PASSWORD: 'password',
  CONFIRMPASSWORD: 'confirmPassword',
};

const initialValues = {
  [fieldsName.PASSWORD]: '',
  [fieldsName.CONFIRMPASSWORD]: '',
};

const ResetPasswordHandler = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { id } = useParams();

  const savePassword = (user) => {
    if (user.password !== user.confirmPassword) {
      toast.error(formatMessage(messages.passwordError));
      return;
    }
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get('token');
    let email = params.get('email');
    if (token) user.token = token;
    if (email) user.email = email;
    setLoading(true);

    return userHttp.changePassword(user)
      .then(() => {
        toast.success(formatMessage(messages.userChangedPasswordSucessfully));
        history.push(ROUTES.public.login);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <ResetPassword
      loading={loading}
      initValues={initValues}
      savePassword={savePassword}
    />
  );
};

export default ResetPasswordHandler;
