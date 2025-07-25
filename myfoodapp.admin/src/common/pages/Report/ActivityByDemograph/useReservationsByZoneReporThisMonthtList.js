import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getReservationsByZoneAndDate } from '../../../../services/http/reservationReportHttp';
import { zoneHttp } from '../../../../services/http';

export default function useReservationsByZoneReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingReservationsByZoneReportThisMonth, setLoadingReservationsByZoneReportThisMonth] = useState(true);
  const [reservationsByZoneReportThisMonth, setReservationsByZoneReportThisMonth] = useState();
  const [reservationsByZoneMetadataThisMonth, setReservationsByZoneMetadataThisMonth] = useState({
    zones: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      zoneHttp.getAll(),
    ]).then(function ([zones]) {
      setReservationsByZoneMetadataThisMonth({
        ...reservationsByZoneMetadataThisMonth,
        zones,
      });
    });
  };

  const loadReports = function () {
    setLoadingReservationsByZoneReportThisMonth(true);
    loadMedatada().then(function () {
      return getReservationsByZoneAndDate(filters.fromDate, filters.toDate)
        .then(setReservationsByZoneReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingReservationsByZoneReportThisMonth(false));
    });
  };

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    reservationsByZoneReportThisMonth,
    loadingReservationsByZoneReportThisMonth,
    reservationsByZoneMetadataThisMonth,
  };
}
