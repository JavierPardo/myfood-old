import { request } from './http';

const clientPrefix = '/Client';

export function createClient(data) {
  return request({
    url: `${clientPrefix}`,
    method: 'POST',
    data,
  });
}

export function updateClient(data) {
  return request({
    url: `${clientPrefix}`,
    method: 'PUT',
    data,
  });
}

export function getById(clientId) {
  return request({
    url: `${clientPrefix}/${clientId}`,
    method: 'GET',
  });
}

export default {
  getInformation: function (branchId) {
    return request({
      url: `${clientPrefix}/${branchId}/Information`,
      method: 'GET',
    });
  },
  getAll: function () {
    return request({
      url: `${clientPrefix}`,
      method: 'GET',
    });
  },
  updateIsActive: function (data) {
    return request({
      url: `${clientPrefix}/updateIsActive`,
      method: 'PATCH',
      data,
    });
  },
};
