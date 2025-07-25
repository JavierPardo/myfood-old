import { request } from './http';

const orderItemOptionPrefix = 'orderItemOption';

export function getAllByEventId(eventId) {
  return request({
    url: `${orderItemOptionPrefix}/Event/${eventId}`,
    method: 'Get',
  });
}
