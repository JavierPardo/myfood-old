import { request } from './http';

const optionPrefix = '/option';

export const getOptions = () =>
  request({
    url: `${optionPrefix}`,
    method: 'GET',
  });

export const createOption = ({ choices, ...rest }) => {
  const choicesStr = choices ? JSON.stringify(choices) : '[]';
  return request({
    url: `${optionPrefix}`,
    method: 'POST',
    data: { ...rest, choices: choicesStr },
  });
};

export const updateOption = ({ choices, ...rest }) => {
  const choicesStr = choices ? JSON.stringify(choices) : '[]';
  return request({
    url: `${optionPrefix}`,
    method: 'PUT',
    data: { ...rest, choices: choicesStr },
  });
};

export const updateIsActive = (id, isActive) =>
  request({
    url: `${optionPrefix}/${id}`,
    method: 'PATCH',
    data: { isActive },
  });

export const deleteOption = (id) =>
  request({
    url: `${optionPrefix}/${id}`,
    method: 'DELETE',
  });

export const getOption = (id) => {
  return request({
    url: `${optionPrefix}/${id}`,
    method: 'GET',
  }).then(({ choices, ...rest }) => {
    return { ...rest, choices: JSON.parse(choices) };
  });
};

export const getAllByOrderId = (orderId) => {
  return request({
    url: `${optionPrefix}/Order/${orderId}`,
    method: 'GET',
  });
};

export const getAllByItemId = function (itemId) {
  return request({
    url: `${optionPrefix}/Item/${itemId}`,
    method: 'GET',
  });
};
export const optionHttp = {
  getAll: function () {
    return request({
      url: `${optionPrefix}`,
      method: 'GET',
    });
  },
  getByItem: function (itemId) {
    return request({
      url: `${optionPrefix}/Item/${itemId}`,
      method: 'GET',
    });
  },
  getAllByIds: function (optionIds) {
    return request({
      url: `${optionPrefix}/IdList`,
      method: 'GET',
      params: { idList: optionIds },
    });
  },
};
