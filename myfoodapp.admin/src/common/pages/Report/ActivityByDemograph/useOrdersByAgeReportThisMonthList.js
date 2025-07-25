import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getOrdersByAgeAndDate } from '../../../../services/http/orderReportHttp';

export default function useOrdersByAgeReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingOrdersByAgeReportThisMonth, setLoadingOrdersByAgeReportThisMonth] = useState(true);
  const [ordersByAgeReportThisMonth, setOrdersByAgeReportThisMonth] = useState();
  const [ordersByAgeMetadataThisMonth, setOrdersByAgeMetadata] = useState({
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
    setLoadingOrdersByAgeReportThisMonth(true);
    // loadMedatada().then(function () {
      return getOrdersByAgeAndDate(filters.fromDate, filters.toDate)
        .then(setOrdersByAgeReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingOrdersByAgeReportThisMonth(false));
    // });
  };

  function updateFiltersByAgeThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    ordersByAgeReportThisMonth,
    loadingOrdersByAgeReportThisMonth,
    ordersByAgeMetadataThisMonth,
    updateFiltersByAgeThisMonth,
    refreshByAge: loadReports,
  };
}
