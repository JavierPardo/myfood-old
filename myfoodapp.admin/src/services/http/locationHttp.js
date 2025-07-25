import { request } from './http';

const locationPrefix = '/location';

export function getDeliveryDetails(coordinates) {
  return request({
    url: `${locationPrefix}/GetDeliveryCostByCoordinates`,
    method: 'GET',
    params: coordinates,
  });
}
export function getByEventId(eventId) {
  return request({
    url: `${locationPrefix}/Event/${eventId}`,
    method: 'GET',
  });
}
