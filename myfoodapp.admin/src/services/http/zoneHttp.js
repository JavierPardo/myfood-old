import { request } from './http';

const countryPrefix = '/zone';

export const getAll = () => {
  return request({
    url: `${countryPrefix}`,
    method: '',
  });
};
