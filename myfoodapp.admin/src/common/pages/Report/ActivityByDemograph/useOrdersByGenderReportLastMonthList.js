import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getOrdersByGenderAndDate } from '../../../../services/http/orderReportHttp';
import { genderHttp } from '../../../../services/http';

export default function useOrdersByGenderReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingOrdersByGenderReportLastMonth, setLoadingOrdersByGenderReportLastMonth] = useState(true);
  const [ordersByGenderReportLastMonth, setOrdersByGenderReportLastMonth] = useState();
  const [ordersByGenderMetadataLastMonth, setOrdersByGenderMetadataLastMonth] = useState({
    genders: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      genderHttp.getAll(),
    ]).then(function ([genders]) {
      setOrdersByGenderMetadataLastMonth({
        ...ordersByGenderMetadataLastMonth,
        genders,
      });
    });
  };

  const loadReports = function () {
    setLoadingOrdersByGenderReportLastMonth(true);
    loadMedatada().then(function () {
      return getOrdersByGenderAndDate(filters.fromDate, filters.toDate)
        .then(setOrdersByGenderReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingOrdersByGenderReportLastMonth(false));
    });
  };

  function updateFiltersByGenderLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    ordersByGenderReportLastMonth,
    loadingOrdersByGenderReportLastMonth,
    ordersByGenderMetadataLastMonth,
    updateFiltersByGenderLastMonth,
    refreshByGenderLastMonth: loadReports,
  };
}
