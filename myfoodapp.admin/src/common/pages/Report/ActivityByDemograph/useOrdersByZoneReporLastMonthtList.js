import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getOrdersByZoneAndDate } from '../../../../services/http/orderReportHttp';
import { zoneHttp } from '../../../../services/http';

export default function useOrdersByZoneReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingOrdersByZoneReportLastMonth, setLoadingOrdersByZoneReportLastMonth] = useState(true);
  const [ordersByZoneReportLastMonth, setOrdersByZoneReportLastMonth] = useState();
  const [ordersByZoneMetadataLastMonth, setOrdersByZoneMetadataLastMonth] = useState({
    zones: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      zoneHttp.getAll(),
    ]).then(function ([zones]) {
      setOrdersByZoneMetadataLastMonth({
        ...ordersByZoneMetadataLastMonth,
        zones,
      });
    });
  };  

  const loadReports = function () {
    setLoadingOrdersByZoneReportLastMonth(true);
    loadMedatada().then(function () {
      return getOrdersByZoneAndDate(filters.fromDate, filters.toDate)
        .then(setOrdersByZoneReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingOrdersByZoneReportLastMonth(false));
    });
  };

  function updateFiltersByZoneLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    ordersByZoneReportLastMonth,
    loadingOrdersByZoneReportLastMonth,
    ordersByZoneMetadataLastMonth,
    updateFiltersByZoneLastMonth,
    refreshByZoneLastMonth: loadReports,
  };
}
