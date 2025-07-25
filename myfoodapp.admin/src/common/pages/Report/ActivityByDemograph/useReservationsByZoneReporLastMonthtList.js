import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getReservationsByZoneAndDate } from '../../../../services/http/reservationReportHttp';
import { zoneHttp } from '../../../../services/http';

export default function useReservationsByZoneReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingReservationsByZoneReportLastMonth, setLoadingReservationsByZoneReportLastMonth] = useState(true);
  const [reservationsByZoneReportLastMonth, setReservationsByZoneReportLastMonth] = useState();
  const [reservationsByZoneMetadataLastMonth, setReservationsByZoneMetadataLastMonth] = useState({
    zones: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      zoneHttp.getAll(),
    ]).then(function ([zones]) {
      setReservationsByZoneMetadataLastMonth({
        ...reservationsByZoneMetadataLastMonth,
        zones,
      });
    });
  };  

  const loadReports = function () {
    setLoadingReservationsByZoneReportLastMonth(true);
    loadMedatada().then(function () {
      return getReservationsByZoneAndDate(filters.fromDate, filters.toDate)
        .then(setReservationsByZoneReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingReservationsByZoneReportLastMonth(false));
    });
  };

  function updateFiltersByZoneLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    reservationsByZoneReportLastMonth,
    loadingReservationsByZoneReportLastMonth,
    reservationsByZoneMetadataLastMonth,
  };
}
