import { request } from './http';

const sidePrefix = '/Side';

export const sideHttp = {
  getAll: function () {
    return request({
      url: `${sidePrefix}`,
      method: 'GET',
    });
  },
  getExtras: function () {
    return request({
      url: `${sidePrefix}`,
      method: 'GET',
    });
  },
};
