import { request } from './http';

const menuPrefix = '/Menu';

export function getById(id) {
  return request({
    url: `${menuPrefix}/${id}`,
    method: 'GET',
  });
}
export function update(data) {
  return request({
    url: `${menuPrefix}`,
    method: 'PUT',
    data,
  });
}

export function create(data) {
  return request({
    url: `${menuPrefix}`,
    method: 'POST',
    data,
  });
}

export function getAll() {
  return request({
    url: `${menuPrefix}`,
    method: 'GET',
  });
}

export const updateIsVisibleFlag = (id, isActive) => {
  return request({
    url: `${menuPrefix}/${id}`,
    method: 'PATCH',
    data: { isActive },
  });
};
