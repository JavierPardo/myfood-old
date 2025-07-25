import { request } from './http';

const branchPreferencePrefix = '/branchPreference';

export const getAll = function () {
  return request({
    url: `${branchPreferencePrefix}`,
    method: 'GET',
  });
};

export const update = function (branchPreference) {
  return request({
    url: `${branchPreferencePrefix}`,
    method: 'PUT',
    data: branchPreference,
  });
};
