import { request } from './http';
import * as moment from 'moment';

const routePrefix = '/reservation';
const statusPrefix = '/reservationStatus';

export const getAll = () =>
  request({
    url: `${routePrefix}`,
    method: 'GET',
  }).then((reservations) =>
    reservations.map(
      ({ user, reservationDateTime, requestedDateTime, ...reservation }) => ({
        ...reservation,
        userFullName: user ? `${user.firstName} ${user.lastName}` : '',
        reservationDateTime: moment.utc(reservationDateTime),
        requestedDateTime: moment.utc(requestedDateTime),
      })
    )
  );

export const create = ({ specialEventId, ...entity }) =>
  request({
    url: `${routePrefix}`,
    method: 'POST',
    data: {
      ...entity,
      specialEventId: specialEventId ? specialEventId : null,
    },
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
  }).then(({ reservationDateTime, requestedDateTime, ...entity }) => ({
    ...entity,
    reservationDateTime: moment.utc(reservationDateTime),
    requestedDateTime: moment.utc(requestedDateTime),
  }));

export const getAllStatus = () =>
  request({
    url: `${statusPrefix}`,
    method: 'GET',
  });
