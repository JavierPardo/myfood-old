import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getOrdersByGenderAndDate } from '../../../../services/http/orderReportHttp';
import { genderHttp } from '../../../../services/http';

export default function useOrdersByGenderReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingOrdersByGenderReportThisMonth, setLoadingOrdersByGenderReportThisMonth] = useState(true);
  const [ordersByGenderReportThisMonth, setOrdersByGenderReportThisMonth] = useState();
  const [ordersByGenderMetadataThisMonth, setOrdersByGenderMetadataThisMonth] = useState({
    genders: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      genderHttp.getAll(),
    ]).then(function ([genders]) {
      setOrdersByGenderMetadataThisMonth({
        ...ordersByGenderMetadataThisMonth,
        genders,
      });
    });
  };

  const loadReports = function () {
    setLoadingOrdersByGenderReportThisMonth(true);
    loadMedatada().then(function () {
      return getOrdersByGenderAndDate(filters.fromDate, filters.toDate)
        .then(setOrdersByGenderReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingOrdersByGenderReportThisMonth(false));
    });
  };

  function updateFiltersByGenderThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    ordersByGenderReportThisMonth,
    loadingOrdersByGenderReportThisMonth,
    ordersByGenderMetadataThisMonth,
    updateFiltersByGenderThisMonth,
    refreshByGenderThisMonth: loadReports,
  };
}
