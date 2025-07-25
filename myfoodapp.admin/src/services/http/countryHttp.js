import { request } from './http';

const countryPrefix = '/country';

export const createCountry = (country) => {
  return request({
    url: `${countryPrefix}`,
    method: 'POST',
    data: country,
  });
};

export const updateCountry = (country) =>
  request({
    url: `${countryPrefix}/${country.id}`,
    method: 'PATCH',
    data: country,
  });

export const getCountry = (id) =>
  request({
    url: `${countryPrefix}/${id}`,
    method: 'GET',
  });

export const getCountries = () =>
  request({
    url: `${countryPrefix}`,
    method: 'GET',
  });

export const deleteCountry = (id) =>
  request({
    url: `${countryPrefix}/${id}`,
    method: 'DELETE',
  });

export const getAll = function () {
  return request({
    url: `${countryPrefix}`,
    method: 'GET',
  });
};
