import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import { errorHandler } from '../../../common/Forms';
import { providerHttp, cityHttp, countryHttp, branchHttp } from '../../../services/http';
import Provider from './Provider';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

import { toValueLabelList } from '../../../common/utils';

export const fieldsName = {
  ID: 'id',
  NAME: 'name',
  CONTACT: 'contact',
  EMAIL: 'email',
  PHONE: 'phone',
  WHATSAPP: 'whatsapp',
  ADDRESS: 'address',
  WEBSITE: 'webSite',
  CITY_ID: 'cityId',
  COUNTRY_ID: 'countryId',
  ACTIVE: 'isActive',
  BRANCHES: 'branchLogisticProviders',
  IS_DEFAULT: 'isBranchDefault',
};

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.CONTACT]: '',
  [fieldsName.EMAIL]: '',
  [fieldsName.PHONE]: '',
  [fieldsName.WHATSAPP]: '',
  [fieldsName.ADDRESS]: '',
  [fieldsName.WEBSITE]: '',
  [fieldsName.CITY_ID]: '',
  [fieldsName.COUNTRY_ID]: 26,
  [fieldsName.ACTIVE]: true,
  [fieldsName.BRANCHES]: null
};

const loadDependecies = (providerId) => {
  const promises = Promise.allSettled([
    cityHttp.getCities(),
    countryHttp.getCountries()
  ]).then(function ([cityResolved, countryResolved]) {

    const location = {
      cities:
        cityResolved.status === 'fulfilled'
          ? cityResolved.value.map(function ({ id, cityName, countryId }) {
            return { value: id, key: id, label: cityName, countryId };
          })
          : [],
      countries:
        countryResolved.status === 'fulfilled'
          ? toValueLabelList(countryResolved.value, 'id', 'countryName')
          : []
    };
    return location;
  });
  if (!providerId) {
    return promises;
  }
  return Promise.all([promises, 
    providerHttp.getProvider(providerId),
    branchHttp.getAll()]).then(
    function ([{ cities, countries }, { branchLogisticProviders, ...values }, branches]) {

      return {
        cities,
        countries,
        provider: {
          ...values,
          branchLogisticProviders: branchLogisticProviders.map(function(logisticBranch){
            const branch=branches.find(function(b){
              return b.id===logisticBranch.branchId;
            });
            logisticBranch.label=branch.name
            return logisticBranch;
          }),
        },
      }
    }
  );
};

const ProviderHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { id } = useParams();
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    loadDependecies(id)
      .then(({ cities, countries, provider }) => {
        setCities(cities);
        setCountries(countries);
        if (provider) {
          setInitValues(provider);
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

  const saveProvider = (provider) => {
    setLoading(true);
    const serviceMethod = id
      ? providerHttp.updateProvider(provider)
      : providerHttp.createProvider(provider);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreated));
        history.push(ROUTES.provider);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const deleteProvider = () => {
    setLoading(true);
    providerHttp
      .deleteProvider(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        history.push(ROUTES.provider);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const goBack = function () {
    history.push(ROUTES.provider);
  }

  return (
    <Provider
      loading={loading}
      initValues={initValues}
      isEdit={!!id}
      goBack={goBack}
      saveProvider={saveProvider}
      deleteProvider={deleteProvider}
      availableCities={cities}
      countries={countries}
      isReadOnly={isReadOnly}
    />
  );
};

export default ProviderHandler;
