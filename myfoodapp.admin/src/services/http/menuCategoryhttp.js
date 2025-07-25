import { request } from './http';

const menuCategoryPrefix = '/MenuCategory';

export const getAllByCategoryId = (menuId) =>
  request({
    url: `${menuCategoryPrefix}/Category/${menuId}`,
    method: 'GET',
  });
