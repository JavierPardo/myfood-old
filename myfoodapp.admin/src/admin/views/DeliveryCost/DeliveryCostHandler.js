import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import { errorHandler } from '../../../common/Forms';
import {
  deliveryCostHttp,
  logisticProviderHttp,
  providerHttp,
  providerRateTypeHttp,
} from '../../../services/http';
import DeliveryCost from './DeliveryCost';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

import { toValueLabelList } from '../../../common/utils';

export const fieldsName = {
  PROVIDER_ID: 'logisticProviderId',
  RATE_ID: 'rateTypeId',
  START_RANGE: 'startRange',
  END_RANGE: 'endRange',
  IS_ACTIVE: 'isActive',
  FEE: 'fee',
};

const initialValues = {
  [fieldsName.PROVIDER_ID]: '',
  [fieldsName.RATE_ID]: '',
  [fieldsName.FEE]: '',
};

const loadDependecies = (deliveryCostId) => {
  const promises = Promise.allSettled([
    logisticProviderHttp.getAllByBranch(),
    //providerHttp.getProviders(),
    providerRateTypeHttp.getProviderRateTypes(),
  ]).then(([providerResolved, providerRateTypeResolved]) => ({
    providers:
      providerResolved.status === 'fulfilled'
        ? toValueLabelList(providerResolved.value)
        : [],
    providerRateTypes:
      providerRateTypeResolved.status === 'fulfilled'
        ? toValueLabelList(providerRateTypeResolved.value)
        : [],
  }));
  if (!deliveryCostId) {
    return promises;
  }

  return Promise.all([
    promises,
    deliveryCostHttp.getDeliveryCost(deliveryCostId),
  ]).then(([{ providers, providerRateTypes }, { ...values }]) => ({
    providers,
    providerRateTypes,
    deliveryCost: {
      ...values,
    },
  }));
};

const DeliveryCostHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { id } = useParams();
  const [providers, setProviders] = useState([]);
  const [providerRateTypes, setProviderRateTypes] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadDependecies(id)
      .then(({ providers, providerRateTypes, deliveryCost }) => {
        setProviders(providers);
        setProviderRateTypes(providerRateTypes);
        if (deliveryCost) {
          setInitValues(deliveryCost);
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

  const saveDeliveryCost = (deliveryCost) => {
    setLoading(true);

    const serviceMethod = id
      ? deliveryCostHttp.updateDeliveryCost(deliveryCost)
      : deliveryCostHttp.createDeliveryCost(deliveryCost);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreated));
        history.push(ROUTES.deliveryCost);
      })
      .catch(function (error) {
        if (error.data && error.data.Message) {

          errorHandler.bind(
            null,
            error.data.Message
          )(error);
        }
        else {
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )(error);
        }
      }
      )
      .finally(() => setLoading(false));
  };

  const goBack = () => history.push(ROUTES.deliveryCost);

  return (
    <DeliveryCost
      loading={loading}
      initValues={initValues}
      isEdit={!!id}
      goBack={goBack}
      saveDeliveryCost={saveDeliveryCost}
      availableProviders={providers}
      availableRateTypes={providerRateTypes}
      isReadOnly={isReadOnly}
    />
  );
};

export default DeliveryCostHandler;
