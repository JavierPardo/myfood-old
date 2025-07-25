import { request } from './http';

const orderPrefix = '/Order';

export const orderHttp = {
  save: function (orderId, data) {
    return request({
      url: `${orderPrefix}/${orderId}`,
      method: 'PUT',
      data,
    });
  },
  create: function (data) {
    return request({
      url: `${orderPrefix}`,
      method: 'POST',
      data,
    });
  },
  updateOrderStatus: function (data) {
    return request({
      url: `${orderPrefix}/${data}`,
      method: 'PATCH',
    });
  },
  getAll: function () {
    return request({
      url: `${orderPrefix}`,
      method: 'GET',
    });
  },
  getById: function (orderId) {
    return request({
      url: `${orderPrefix}/${orderId}`,
      method: 'GET',
    });
  },
  getAllByEventId: function (eventId) {
    return request({
      url: `${orderPrefix}/Event/${eventId}`,
      method: 'GET',
    });
  },
  getAllByEventIdAndStatuses: function (eventId, statuses) {
    return request({
      url: `${orderPrefix}/Event/${eventId}`,
      method: 'GET',
      params: { statuses },
    });
  },
};

export function filterOrderByStatus(orderStatuses) {
  return request({
    url: `${orderPrefix}/Event`,
    method: 'POST',
    data: JSON.stringify(orderStatuses.join(',')),
  });
}
export function createOrderEvent(order) {
  return request({
    url: `${orderPrefix}/Event`,
    method: 'POST',
    data: order,
  });
}
