import { request } from './http';

const deliveryCostPrefix = '/logisticproviderrate';

export const createDeliveryCost = (entity) =>
  request({
    url: `${deliveryCostPrefix}`,
    method: 'POST',
    data: entity,
  });

export const updateDeliveryCost = (entity) =>
  request({
    url: `${deliveryCostPrefix}/${entity.id}`,
    method: 'PUT',
    data: entity,
  });

export const getDeliveryCost = (id) =>
  request({
    url: `${deliveryCostPrefix}/${id}`,
    method: 'GET',
  });

export const toggleIsActiveDeliveryCost = function (id) {
  return request({
    url: `${deliveryCostPrefix}/toggleActive`,
    method: 'PATCH',
    data: { id }
  });
}

export const getDeliveryCosts = () => {
  return request({
    url: `${deliveryCostPrefix}/bybranch`,
    method: 'GET',
  });
};

export const deleteDeliveryCost = (id) =>
  request({
    url: `${deliveryCostPrefix}/${id}`,
    method: 'DELETE',
  });
