import { request } from './http';

const rolePrefix = '/role';

export const getRoles = () =>
  request({
    url: `${rolePrefix}`,
    method: 'GET',
  });
