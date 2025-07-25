import { request } from './http';

const userPrefix = '/AppUsers';

export const login = (user) =>
  request({
    url: `${userPrefix}/Login`,
    method: 'POST',
    data: user,
  });

export const changePassword = (user) =>
  request({
    url: `${userPrefix}/changepassword`,
    method: 'POST',
    data: user,
  });

export const externalLogin = (provider) =>
  request({
    url: `/SocialAccount`,
    method: 'POST',
    params: { provider },
  });

export const getUsersHasEvent = function (user) {
  return request({
    url: `${userPrefix}/WithEvents`,
    method: 'GET',
    data: user,
  });
};

export function getAllByOrderId(params) {
  return request({
    url: `${userPrefix}`,
    method: 'GET',
    params,
  });
}

export const register = (user) =>
  request({
    url: `${userPrefix}`,
    method: 'POST',
    data: user,
  });

export const getCurrentUser = () =>
  request({
    url: `${userPrefix}/currentUser`,
    method: 'GET',
  });

export const getAll = function () {
  return request({
    url: `${userPrefix}`,
    method: 'GET',
  });
};

export const getUser = (id) =>
  request({
    url: `${userPrefix}/${id}`,
    method: 'GET',
  });

export const updateUser = (user) =>
  request({
    url: `${userPrefix}/${user.id}`,
    method: 'PUT',
    data: user,
  });

export const recoverPassword = (user) =>
  request({
    url: `${userPrefix}/recoverpassword`,
    method: 'POST',
    data: user,
  });

export const deleteUser = (id) =>
  request({
    url: `${userPrefix}/${id}`,
    method: 'DELETE',
  });
