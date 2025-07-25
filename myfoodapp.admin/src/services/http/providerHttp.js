import { request } from './http';

const providerPrefix = '/logisticprovider';

export const createProvider = (entity) => {
  return request({
    url: `${providerPrefix}`,
    method: 'POST',
    data: entity,
  });
};

export const updateProvider = (entity) => {
  return request({
    url: `${providerPrefix}/${entity.id}`,
    method: 'PUT',
    data: entity,
  });
};

export const getProvider = (id) =>
  request({
    url: `${providerPrefix}/${id}`,
    method: 'GET',
  });

export const getProviders = () =>
  request({
    url: `${providerPrefix}`,
    method: 'GET',
  });

export const remove = (id) =>
  request({
    url: `${providerPrefix}/${id}`,
    method: 'DELETE',
  });

export const updateIsActive = (id, isActive) =>
  request({
    url: `${providerPrefix}/toggleActive`,
    method: 'PATCH',
    data: { id, isActive },
  });

  export const updateDefault = (data) =>
  request({
    url: `${providerPrefix}/toggleDefault`,
    method: 'PATCH',
    data: data,
  });