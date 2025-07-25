import { request } from './http';

const orderItemReportPrefix = '/orderreport';

export const getOrdersByDate = function (fromDate, toDate) {
  return request({
    url: `${orderItemReportPrefix}/getordersbydate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const getOrdersByZoneAndDate = function (fromDate, toDate) {
  return request({
    url: `${orderItemReportPrefix}/getordersbyzoneanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const getOrdersByGenderAndDate = function (fromDate, toDate) {
  return request({
    url: `${orderItemReportPrefix}/getordersbygenderanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const getOrdersByAgeAndDate = function (fromDate, toDate) {
  return request({
    url: `${orderItemReportPrefix}/getordersbyageanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};