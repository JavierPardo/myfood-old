import { request } from './http';

const orderItemSidePrefix = 'orderItemSide';

export const getAllByOrderId = function (orderId) {
  return request({
    url: `${orderItemSidePrefix}/Order/${orderId}`,
    method: 'GET',
  });
};

export function getAllByEventId(eventId) {
  return request({
    url: `${orderItemSidePrefix}/Event/${eventId}`,
    method: 'Get',
  });
}
