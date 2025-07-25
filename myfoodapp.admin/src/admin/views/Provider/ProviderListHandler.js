import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { ROUTES } from '../../../common/globalConstants';
import { logisticProviderHttp, providerHttp } from '../../../services/http';
import { errorHandler } from '../../../common/Forms';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';
import globalMessages from '../../../common/globalMessages';
import messages from './messages';

import ProviderList from './ProviderList';

const ProviderListHandler = ({ isReadOnly }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);

  const goToCreate = () => history.push(ROUTES.createProvider);
  const goToEdit = (id) => history.push(ROUTES.editProvider.replace(':id', id));

  const loadProviders = () => {
    setLoading(true);
    logisticProviderHttp
      .getAllByBranch()
      .then((providers) => setProviders(providers))
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .then(setLoading.bind(null,false));
  };

  useEffect(loadProviders, []);

  const deleteProvider = (id) => {
    setLoading(true);
    providerHttp
      .remove(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        loadProviders();
      })
      .catch(generalErrorHandler);
  };

  const toggleDefault = function (id) {
    return providerHttp.updateDefault(id)
      .then(loadProviders);
  }

  return (
    <ProviderList
      loading={loading}
      providers={providers}
      goToCreate={goToCreate}
      goToEdit={goToEdit}
      refresh={loadProviders}
      toggleActive={providerHttp.updateIsActive}
      deleteProvider={deleteProvider}
      isReadOnly={isReadOnly}
      toggleDefault={toggleDefault}
    />
  );
};

export default ProviderListHandler;
