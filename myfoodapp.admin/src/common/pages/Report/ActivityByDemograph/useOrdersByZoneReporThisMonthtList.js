import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getOrdersByZoneAndDate } from '../../../../services/http/orderReportHttp';
import { zoneHttp } from '../../../../services/http';

export default function useOrdersByZoneReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingOrdersByZoneReportThisMonth, setLoadingOrdersByZoneReportThisMonth] = useState(true);
  const [ordersByZoneReportThisMonth, setOrdersByZoneReportThisMonth] = useState();
  const [ordersByZoneMetadataThisMonth, setOrdersByZoneMetadataThisMonth] = useState({
    zones: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      zoneHttp.getAll(),
    ]).then(function ([zones]) {
      setOrdersByZoneMetadataThisMonth({
        ...ordersByZoneMetadataThisMonth,
        zones,
      });
    });
  };

  const loadReports = function () {
    setLoadingOrdersByZoneReportThisMonth(true);
    loadMedatada().then(function () {
      return getOrdersByZoneAndDate(filters.fromDate, filters.toDate)
        .then(setOrdersByZoneReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingOrdersByZoneReportThisMonth(false));
    });
  };

  function updateFiltersByZoneThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    ordersByZoneReportThisMonth,
    loadingOrdersByZoneReportThisMonth,
    ordersByZoneMetadataThisMonth,
    updateFiltersByZoneThisMonth,
    refreshByZoneThisMonth: loadReports,
  };
}
