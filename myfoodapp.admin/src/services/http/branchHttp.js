import { request } from './http';

const branchPrefix = '/Branch';

export function getAll() {
  return request({
    url: `${branchPrefix}`,
    method: 'GET',
  });
}

export function updateIsActive(data) {
  return request({
    url: `${branchPrefix}/UpdateIsActiveBranch`,
    method: 'PATCH',
    data,
  });
}

export default {
  updateBranch: function (data) {
    return request({
      url: `${branchPrefix}`,
      method: 'PUT',
      data,
    });
  },
  createBranch: function (data) {
    return request({
      url: `${branchPrefix}`,
      method: 'POST',
      data,
    });
  },
  getCurrent: function () {
    return request({
      url: `${branchPrefix}/Current`,
      method: 'GET',
    });
  },

  getById: function (branchId) {
    return request({
      url: `${branchPrefix}/${branchId}`,
      method: 'GET',
    });
  },

  getByClientId: function (clientId) {
    return request({
      url: `${branchPrefix}/Client/${clientId}`,
      method: 'GET',
    });
  },
  saveInformation: function (data) {
    return request({
      url: `${branchPrefix}/Information`,
      method: 'PUT',
      data,
    });
  },
};
