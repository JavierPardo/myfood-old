import { request } from './http';

const userItemReportPrefix = '/userreport';

export const getUsersByZoneAndDate = function (fromDate, toDate) {
  return request({
    url: `${userItemReportPrefix}/getusersbyzoneanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const getUsersByGenderAndDate = function (fromDate, toDate) {
  return request({
    url: `${userItemReportPrefix}/getusersbygenderanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const getUsersByAgeAndDate = function (fromDate, toDate) {
  return request({
    url: `${userItemReportPrefix}/getusersbyageanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};