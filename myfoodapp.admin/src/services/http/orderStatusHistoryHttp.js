import { request } from './http';

const orderStatusHistoryPrefix = 'orderStatusHistory';

export const getAllByOrderId = function (orderId) {
  return request({
    url: `${orderStatusHistoryPrefix}/${orderId}`,
    method: 'GET',
  });
};
