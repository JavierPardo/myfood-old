import { request } from './http';

const eventStatusPrefix = '/eventStatus';

export const getEventStatus = () =>
  request({
    url: `${eventStatusPrefix}`,
    method: 'GET',
  });
