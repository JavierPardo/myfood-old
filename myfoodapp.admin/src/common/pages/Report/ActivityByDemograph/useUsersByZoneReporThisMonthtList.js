import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getUsersByZoneAndDate } from '../../../../services/http/userReportHttp';
import { zoneHttp } from '../../../../services/http';

export default function useUsersByZoneReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingUsersByZoneReportThisMonth, setLoadingUsersByZoneReportThisMonth] = useState(true);
  const [usersByZoneReportThisMonth, setUsersByZoneReportThisMonth] = useState();
  const [usersByZoneMetadataThisMonth, setUsersByZoneMetadataThisMonth] = useState({
    zones: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      zoneHttp.getAll(),
    ]).then(function ([zones]) {
      setUsersByZoneMetadataThisMonth({
        ...usersByZoneMetadataThisMonth,
        zones,
      });
    });
  };

  const loadReports = function () {
    setLoadingUsersByZoneReportThisMonth(true);
    loadMedatada().then(function () {
      return getUsersByZoneAndDate(filters.fromDate, filters.toDate)
        .then(setUsersByZoneReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingUsersByZoneReportThisMonth(false));
    });
  };

  function updateFiltersByZoneThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    usersByZoneReportThisMonth,
    loadingUsersByZoneReportThisMonth,
    usersByZoneMetadataThisMonth,
    updateFiltersByZoneThisMonth,
    refreshByZoneThisMonth: loadReports,
  };
}
