import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { ROUTES } from '../../../common/globalConstants';
import { toDictonary } from '../../../common/utils';
import {
  deliveryCostHttp,
  logisticProviderHttp,
  providerHttp,
  providerRateTypeHttp,
} from '../../../services/http';
import { errorHandler } from '../../../common/Forms';
import globalMessages from '../../../common/globalMessages';
import messages from './messages';

import DeliveryCostList from './DeliveryCostList';

const loadDependencies = () => {
  const promises = Promise.allSettled([
    logisticProviderHttp.getAllByBranch(),
    //providerHttp.getProviders(),
    providerRateTypeHttp.getProviderRateTypes(),
  ]).then(([providerResolved, providerRateTypeResolved]) => ({
    providers:
      providerResolved.status === 'fulfilled'
        ? toDictonary(providerResolved.value)
        : [],
    rateTypes:
      providerRateTypeResolved.status === 'fulfilled'
        ? toDictonary(providerRateTypeResolved.value)
        : [],
  }));
  return promises;
};

const DeliveryCostListHandler = ({ isReadOnly }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [deliveryCosts, setDeliveryCosts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [rateTypes, setRateTypes] = useState([]);

  const goToCreate = () => history.push(ROUTES.createDeliveryCost);
  const goToEdit = (id) =>
    history.push(ROUTES.editDeliveryCost.replace(':id', id));

  const loadDeliveryCosts = () => {
    setLoading(true);
    return deliveryCostHttp
      .getDeliveryCosts()
      .then((deliveryCosts) => setDeliveryCosts(deliveryCosts))
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    loadDependencies()
      .then(({ providers, rateTypes }) => {
        setProviders(providers);
        setRateTypes(rateTypes);
      })
      .then(loadDeliveryCosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleIsActive = function (rate) {
    
    return deliveryCostHttp
    .toggleIsActiveDeliveryCost(rate)
    .then(loadDeliveryCosts);
  }

  const deleteDeliveryCost = (id) => {
    setLoading(true);
    deliveryCostHttp
      .deleteDeliveryCost(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
      })
      .then(loadDeliveryCosts)
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <DeliveryCostList
      loading={loading}
      deliveryCosts={deliveryCosts}
      goToCreate={goToCreate}
      goToEdit={goToEdit}
      deleteDeliveryCost={deleteDeliveryCost}
      refresh={loadDeliveryCosts}
      isReadOnly={isReadOnly}
      rateTypes={rateTypes}
      toggleIsActive={toggleIsActive}
      providers={providers}
    />
  );
};

export default DeliveryCostListHandler;
