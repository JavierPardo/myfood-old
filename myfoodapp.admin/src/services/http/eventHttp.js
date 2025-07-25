import { request } from './http';

const eventPrefix = '/event';

export const getEvents = () =>
  request({
    url: `${eventPrefix}`,
    method: 'GET',
  });

export const getEvent = function (eventId) {
  return request({
    url: `${eventPrefix}/${eventId}`,
    method: 'GET',
  });
};

export const createEvent = function (data) {
  return request({
    url: `${eventPrefix}`,
    method: 'POST',
    data,
  });
};

export const refreshEventPayment = function (orderId) {
  return request({
    url: `${eventPrefix}/RefreshPayment/${orderId}`,
    method: 'POST',
  });
};

export const saveEvent = function ({
  coupon,
  location,
  locationId,
  couponId,
  ...data
}) {
  if (locationId) {
    data.locationId = locationId;
  } else {
    data.location = location;
  }
  if (couponId) {
    data.couponId = couponId;
  }
  return request({
    url: `${eventPrefix}`,
    method: 'PUT',
    data,
  });
};

export const updateEventStatus = function (eventParams) {
  return request({
    url: `${eventPrefix}/${eventParams}`,
    method: 'PATCH',
  });
};
