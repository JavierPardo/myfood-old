import { request } from './http';
import * as moment from 'moment';

const routePrefix = '/ReservationSpecialEvents';

const getEndDayInUtc = (date) => moment(date.toISOString()).endOf('day').utc();

export const getAll = (future = true) =>
  request({
    url: `${routePrefix}${future ? '/future' : ''}`,
    method: 'GET',
  });

export const create = ({ endDateTime, ...entity }) =>
  request({
    url: `${routePrefix}`,
    method: 'POST',
    data: { ...entity, endDateTime: getEndDayInUtc(endDateTime) },
  });

export const update = ({ endDateTime, ...entity }) =>
  request({
    url: `${routePrefix}`,
    method: 'PUT',
    data: { ...entity, endDateTime: getEndDayInUtc(endDateTime) },
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
  }).then(({ startDateTime, endDateTime, ...entity }) => ({
    ...entity,
    startDateTime: moment.utc(startDateTime),
    endDateTime: moment.utc(endDateTime),
  }));

export const updateIsActive = (id, isActive) =>
  request({
    url: `${routePrefix}/toggleActive`,
    method: 'PATCH',
    data: { id, isActive },
  });

export const getActivesOnly = () =>
  request({
    url: `${routePrefix}`,
    params: { activesOnly: true },
    method: 'GET',
  });
