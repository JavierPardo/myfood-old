import { request } from './http';

const categoryPrefix = '/category';

export const createCategory = (category) => {
  return request({
    url: `${categoryPrefix}`,
    method: 'POST',
    data: category,
  });
};

export const updateCategory = (category) =>
  request({
    url: `${categoryPrefix}/${category.id}`,
    method: 'PUT',
    data: category,
  });

export const getCategory = (id) =>
  request({
    url: `${categoryPrefix}/${id}`,
    method: 'GET',
  });

export const getCategories = () =>
  request({
    url: `${categoryPrefix}`,
    method: 'GET',
  });

export const updateIsVisibleFlag = (id, isVisibleInMenu) => {
  return request({
    url: `${categoryPrefix}/${id}`,
    method: 'PATCH',
    data: { isVisibleInMenu },
  });
};

export const deleteCategory = (id) =>
  request({
    url: `${categoryPrefix}/${id}`,
    method: 'DELETE',
  });

export const getAll = function () {
  return request({
    url: `${categoryPrefix}`,
    method: 'GET',
  });
};

export const rearrange = (categories) =>
  request({
    url: `${categoryPrefix}/rearrange`,
    method: 'PATCH',
    data: `${JSON.stringify(JSON.stringify(categories))}`,
    headers: { 'Content-Type': 'application/json' },
  });
