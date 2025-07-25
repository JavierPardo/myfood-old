import { request } from './http';

const clientTransactionReportPrefix = '/clienttransactionreport';

export const getLogisticReconciliationByDate = function (fromDate, toDate, withConciliation) {
  return request({
    url: `${clientTransactionReportPrefix}/getlogisticreconciliationbydate/${fromDate.format('YYYYMMDD')}/${toDate.format('YYYYMMDD')}/${withConciliation}`,
    method: 'GET',
  });
};