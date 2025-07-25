import { request } from './http';

const logisticProviderPrefix = '/LogisticProvider';

export function getAllByBranch() {
  return request({
    url: `${logisticProviderPrefix}/ByBranch`,
    method: 'GET',
  });
}
