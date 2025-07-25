import { request } from './http';

const orderStatusPrefix = '/orderStatus';

export const getOrderStatus = () =>
  request({
    url: `${orderStatusPrefix}`,
    method: 'GET',
  });
