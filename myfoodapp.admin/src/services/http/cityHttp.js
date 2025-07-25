import { request } from './http';

const cityPrefix = '/city';

export const createCity = (city) => {
  return request({
    url: `${cityPrefix}`,
    method: 'POST',
    data: city,
  });
};

export const updateCity = (city) =>
  request({
    url: `${cityPrefix}/${city.id}`,
    method: 'PATCH',
    data: city,
  });

export const getCity = (id) =>
  request({
    url: `${cityPrefix}/${id}`,
    method: 'GET',
  });

export const getCities = () =>
  request({
    url: `${cityPrefix}`,
    method: 'GET',
  });

export const deleteCity = (id) =>
  request({
    url: `${cityPrefix}/${id}`,
    method: 'DELETE',
  });

export const getAll = function () {
  return request({
    url: `${cityPrefix}`,
    method: 'GET',
  });
};
