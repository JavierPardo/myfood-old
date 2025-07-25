import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getReservationsByAgeAndDate } from '../../../../services/http/reservationReportHttp';

export default function useReservationsByAgeReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingReservationsByAgeReportThisMonth, setLoadingReservationsByAgeReportThisMonth] = useState(true);
  const [reservationsByAgeReportThisMonth, setReservationsByAgeReportThisMonth] = useState();
  const [reservationsByAgeMetadataThisMonth, setReservationsByAgeMetadata] = useState({
    ages: [],
  });

  // const loadMedatada = function () {
  //   return Promise.all([
  //     ageHttp.getAll(),
  //   ]).then(function ([ages]) {
  //     setReservationsByAgeMetadata({
  //       ...reservationsByAgeMetadata,
  //       ages,
  //     });
  //   });
  // };

  const loadReports = function () {
    setLoadingReservationsByAgeReportThisMonth(true);
    // loadMedatada().then(function () {
      return getReservationsByAgeAndDate(filters.fromDate, filters.toDate)
        .then(setReservationsByAgeReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingReservationsByAgeReportThisMonth(false));
    // });
  };

  function updateFiltersByAgeThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    reservationsByAgeReportThisMonth,
    loadingReservationsByAgeReportThisMonth,
    reservationsByAgeMetadataThisMonth,
    updateFiltersByAgeThisMonth,
    refreshByAge: loadReports,
  };
}
