import { request } from './http';

const transactionStatusPrefix = '/transactionstatus';

export const getAll = function () {
  return request({
    url: `${transactionStatusPrefix}`,
    method: 'GET',
  });
};
