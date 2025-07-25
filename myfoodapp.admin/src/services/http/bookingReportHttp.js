import { request } from './http';

const bookingReportPrefix = '/reservationreport';

export const getBookingByDate = function (fromDate, toDate) {
  return request({
    url: `${bookingReportPrefix}/getreservationsbydate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};