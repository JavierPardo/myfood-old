import { request } from './http';

const transactionReportPrefix = '/clienttransactionreport';

export const getTransactionByDate = function (fromDate, toDate) {
  return request({
    url: `${transactionReportPrefix}/getclienttransactionsbydate/${fromDate.format(
      'YYYYMMDD'
    )}/${toDate.format('YYYYMMDD')}`,
    method: 'GET',
  });
};
