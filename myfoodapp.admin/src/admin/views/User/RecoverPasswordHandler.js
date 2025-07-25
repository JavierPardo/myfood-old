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

import RecoverPassword from './RecoverPassword';

export const fieldsName = {
  EMAIL: 'email',
};

const initialValues = {
  [fieldsName.EMAIL]: '',
};

const RecoverPasswordHandler = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { id } = useParams();

  const sendEmail = (user) => {
    setLoading(true);

    const serviceMethod = userHttp.recoverPassword(user);

    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.recoverMailSent));
        //history.push(ROUTES.user);
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
    <RecoverPassword
      loading={loading}
      initValues={initValues}
      sendEmail={sendEmail}
    />
  );
};

export default RecoverPasswordHandler;
