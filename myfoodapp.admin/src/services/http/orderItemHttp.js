import { request } from './http';

const orderItemPrefix = 'orderItem';

export function getAllByOrderId(orderId) {
  return request({
    url: `${orderItemPrefix}/Order/${orderId}`,
    method: 'Get',
  });
}
export function getAllByEventId(eventId) {
  return request({
    url: `${orderItemPrefix}/Event/${eventId}`,
    method: 'Get',
  });
}
