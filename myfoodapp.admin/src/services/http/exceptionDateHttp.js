import { request } from './http';

const exceptionDatePrefix = '/BranchExceptionDate';

export function getAll() {
  return request({
    url: `${exceptionDatePrefix}`,
    method: 'GET',
  });
}
export function updateIsClosed(data) {
  return request({
    url: `${exceptionDatePrefix}/UpdateIsClosed`,
    method: 'PATCH',
    data,
  });
}
export function getById(exceptionDateId) {
  return request({
    url: `${exceptionDatePrefix}/${exceptionDateId}`,
    method: 'GET',
  });
}
export function update(data) {
  return request({
    url: `${exceptionDatePrefix}`,
    method: 'PUT',
    data,
  });
}
export function create(data) {
  return request({
    url: `${exceptionDatePrefix}`,
    method: 'POST',
    data,
  });
}
