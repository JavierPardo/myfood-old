import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getUsersByZoneAndDate } from '../../../../services/http/userReportHttp';
import { zoneHttp } from '../../../../services/http';

export default function useUsersByZoneReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingUsersByZoneReportLastMonth, setLoadingUsersByZoneReportLastMonth] = useState(true);
  const [usersByZoneReportLastMonth, setUsersByZoneReportLastMonth] = useState();
  const [usersByZoneMetadataLastMonth, setUsersByZoneMetadataLastMonth] = useState({
    zones: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      zoneHttp.getAll(),
    ]).then(function ([zones]) {
      setUsersByZoneMetadataLastMonth({
        ...usersByZoneMetadataLastMonth,
        zones,
      });
    });
  };  

  const loadReports = function () {
    setLoadingUsersByZoneReportLastMonth(true);
    loadMedatada().then(function () {
      return getUsersByZoneAndDate(filters.fromDate, filters.toDate)
        .then(setUsersByZoneReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingUsersByZoneReportLastMonth(false));
    });
  };

  function updateFiltersByZoneLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    usersByZoneReportLastMonth,
    loadingUsersByZoneReportLastMonth,
    usersByZoneMetadataLastMonth,
    updateFiltersByZoneLastMonth,
    refreshByZoneLastMonth: loadReports,
  };
}
