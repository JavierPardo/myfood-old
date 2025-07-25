import { request } from './http';

const transactionPrefix = '/transaction';

export const getByEvent = (eventId) =>
  request({
    url: `${transactionPrefix}/Event/${eventId}`,
    method: 'GET',
  });
