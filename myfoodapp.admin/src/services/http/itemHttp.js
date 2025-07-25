import { request } from './http';

const itemPrefix = '/item';

export const getItems = () =>
  request({
    url: `${itemPrefix}`,
    method: 'GET',
  });

export const createItem = (item) => {
  return request({
    url: `${itemPrefix}`,
    method: 'POST',
    data: item,
  });
};

export const updateItem = (item) => {
  return request({
    url: `${itemPrefix}`,
    method: 'PUT',
    data: item,
  });
};

export const deleteItem = (id) =>
  request({
    url: `${itemPrefix}/${id}`,
    method: 'DELETE',
  });

export const getItem = (id) =>
  request({
    url: `${itemPrefix}/getwithrelations/${id}`,
    method: 'GET',
  });

export const updateIsVisible = (id, isVisibleInMenu) =>
  request({
    url: `${itemPrefix}/${id}`,
    method: 'PATCH',
    data: { isVisibleInMenu },
  });

export const getAll = function (menu, category, params) {
  return request({
    url: `${itemPrefix}/Search/${menu}/${category}`,
    method: 'GET',
    params: params,
  });
};

export const getById = function (itemId) {
  return request({
    url: `${itemPrefix}/${itemId}`,
    method: 'GET',
  });
};

export const getAllByOrderId = function (orderId) {
  return request({
    url: `${itemPrefix}/Order/${orderId}`,
    method: 'GET',
  });
};

export const getAllByIds = function (sideIds) {
  return request({
    url: `${itemPrefix}/IdList`,
    method: 'GET',
    params: { idList: sideIds },
  });
};

export function getAllByEventId(eventId) {
  return request({
    url: `${itemPrefix}/Event/${eventId}`,
    method: 'Get',
  });
}

export const rearrange = (items) =>
  request({
    url: `${itemPrefix}/rearrange`,
    method: 'PATCH',
    data: `${JSON.stringify(JSON.stringify(items))}`,
    headers: { 'Content-Type': 'application/json' },
  });
