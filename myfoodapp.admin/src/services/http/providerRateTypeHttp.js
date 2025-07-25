import { request } from './http';
import { toPairs } from 'lodash/object';

const providerRateTypePrefix = '/logisticproviderratetype';

const convertToForm = (providerRateType) => {
  const data = new FormData();
  toPairs(providerRateType).forEach(([key, value]) => {
    data.append(key, value);
  });
  return data;
};

export const createProviderRateType = (providerRateType) => {
  const data = convertToForm(providerRateType);

  return request({
    url: `${providerRateTypePrefix}`,
    method: 'POST',
    data,
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const updateProviderRateType = (providerRateType) => {
  const data = convertToForm(providerRateType);
  return request({
    url: `${providerRateTypePrefix}/${providerRateType.id}`,
    method: 'PUT',
    data,
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const getProviderRateType = (id) =>
  request({
    url: `${providerRateTypePrefix}/${id}`,
    method: 'GET',
  });

export const getProviderRateTypes = () => {
  return request({
    url: `${providerRateTypePrefix}`,
    method: 'GET',
  });
};

export const deleteProviderRateType = (id) =>
  request({
    url: `${providerRateTypePrefix}/${id}`,
    method: 'DELETE',
  });
