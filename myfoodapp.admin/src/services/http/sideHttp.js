import { request } from './http';

const sidePrefix = '/side';

export function patchIsvisible(side) {
  return request({
    url: `${sidePrefix}/IsActive`,
    method: 'PATCH',
    data: side,
  });
}

export const getSides = () =>
  request({
    url: `${sidePrefix}`,
    method: 'GET',
  });

export const createSide = (side) =>
  request({
    url: `${sidePrefix}`,
    method: 'POST',
    data: side,
  });

export const updateSide = (side) =>
  request({
    url: `${sidePrefix}`,
    method: 'PATCH',
    data: side,
  });

export const updateIsActive = (id, isActive) =>
  request({
    url: `${sidePrefix}/UpdateIsActiveSide`,
    method: 'PATCH',
    data: { id, isActive },
  });

export const deleteSide = (id) =>
  request({
    url: `${sidePrefix}/${id}`,
    method: 'DELETE',
  });

export const getSide = (id) =>
  request({
    url: `${sidePrefix}/${id}`,
    method: 'GET',
  });

export const getAll = function () {
  return request({
    url: `${sidePrefix}`,
    method: 'GET',
  });
};

export const sideHttp = {
  getAllByEventId: function (eventId) {
    return request({
      url: `${sidePrefix}/Event/${eventId}`,
      method: 'GET',
    });
  },
  getAll: function () {
    return request({
      url: `${sidePrefix}`,
      method: 'GET',
    });
  },
  getAllById: function (sideIds) {
    return request({
      url: `${sidePrefix}/IdList`,
      method: 'POST',
      data: sideIds,
    });
  },
  getAllByIds: function (sideIds) {
    return request({
      url: `${sidePrefix}/IdList`,
      method: 'GET',
      params: { idList: sideIds },
    });
  },
  getAllByOrderId: function (orderId) {
    return request({
      url: `${sidePrefix}/Order/${orderId}`,
      method: 'GET',
    });
  },
  getExtras: function () {
    return request({
      url: `${sidePrefix}`,
      method: 'GET',
    });
  },
};
