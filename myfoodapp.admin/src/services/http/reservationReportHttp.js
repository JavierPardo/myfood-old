import { request } from './http';

const reservationItemReportPrefix = '/reservationreport';

export const getReservationsByZoneAndDate = function (fromDate, toDate) {
  return request({
    url: `${reservationItemReportPrefix}/getreservationsbyzoneanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const getReservationsByGenderAndDate = function (fromDate, toDate) {
  return request({
    url: `${reservationItemReportPrefix}/getreservationsbygenderanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};

export const getReservationsByAgeAndDate = function (fromDate, toDate) {
  return request({
    url: `${reservationItemReportPrefix}/getreservationsbyageanddate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};