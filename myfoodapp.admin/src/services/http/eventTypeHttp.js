import { request } from './http';

const eventTypesPrefix = '/eventType';

export const getEventTypes = function () {
  return request({
    url: `${eventTypesPrefix}`,
    method: 'GET',
  });
};
