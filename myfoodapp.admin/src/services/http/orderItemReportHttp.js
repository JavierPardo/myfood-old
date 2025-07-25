import { request } from './http';

const orderItemReportPrefix = '/orderitemreport';

export const getOrderItemsByDate = function (fromDate, toDate) {
  return request({
    url: `${orderItemReportPrefix}/getorderitemsbydate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};