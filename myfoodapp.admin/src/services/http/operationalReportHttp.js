import { request } from './http';

const operationalReportPrefix = '/operationalreport';

export const getOperationalByDate = function (fromDate, toDate) {
  return request({
    url: `${operationalReportPrefix}/getoperationalbydate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const GetOperationalTimesByDate = function (fromDate, toDate) {
  return request({
    url: `${operationalReportPrefix}/getoperationaltimesbydate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};