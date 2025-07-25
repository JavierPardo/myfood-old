import { request } from './http';

const orderExtraPrefix = 'orderExtra';

export function getAllByOrderId(orderId) {
  return request({
    url: `${orderExtraPrefix}/Order/${orderId}`,
    method: 'GET',
  });
}

export function getAllByEventId(eventId) {
  return request({
    url: `${orderExtraPrefix}/Event/${eventId}`,
    method: 'Get',
  });
}
