import { request } from './http';
import * as moment from 'moment';

const routePrefix = '/coupon';

export function getByCode(code) {
  return request({
    url: `${routePrefix}/Code`,
    method: 'GET',
    params: { code },
  });
}
export function getByEventId(eventId) {
  return request({
    url: `${routePrefix}/Event/${eventId}`,
    method: 'GET',
  });
}

export const getAll = () =>
  request({
    url: `${routePrefix}`,
    method: 'GET',
  });

export const create = (entity) =>
  request({
    url: `${routePrefix}`,
    method: 'POST',
    data: entity,
  });

export const update = (entity) =>
  request({
    url: `${routePrefix}`,
    method: 'PUT',
    data: entity,
  });

export const remove = (id) =>
  request({
    url: `${routePrefix}/${id}`,
    method: 'DELETE',
  });

export const getOne = (id) =>
  request({
    url: `${routePrefix}/${id}`,
    method: 'GET',
  }).then(({ endDate, ...entity }) => ({
    ...entity,
    endDate: moment(endDate),
  }));

export const updateIsActive = (id, isActive) =>
  request({
    url: `${routePrefix}/toggleActive`,
    method: 'PATCH',
    data: { id, isActive },
  });
