import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getOrdersByAgeAndDate } from '../../../../services/http/orderReportHttp';

export default function useOrdersByAgeReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingOrdersByAgeReportLastMonth, setLoadingOrdersByAgeReportLastMonth] = useState(true);
  const [ordersByAgeReportLastMonth, setOrdersByAgeReportLastMonth] = useState();
  const [ordersByAgeMetadataLastMonth, setOrdersByAgeMetadata] = useState({
    ages: [],
  });

  // const loadMedatada = function () {
  //   return Promise.all([
  //     ageHttp.getAll(),
  //   ]).then(function ([ages]) {
  //     setOrdersByAgeMetadata({
  //       ...ordersByAgeMetadata,
  //       ages,
  //     });
  //   });
  // };

  const loadReports = function () {
    setLoadingOrdersByAgeReportLastMonth(true);
    // loadMedatada().then(function () {
      return getOrdersByAgeAndDate(filters.fromDate, filters.toDate)
        .then(setOrdersByAgeReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingOrdersByAgeReportLastMonth(false));
    // });
  };

  function updateFiltersByAgeLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    ordersByAgeReportLastMonth,
    loadingOrdersByAgeReportLastMonth,
    ordersByAgeMetadataLastMonth,
  };
}
