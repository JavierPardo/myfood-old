import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getReservationsByAgeAndDate } from '../../../../services/http/reservationReportHttp';

export default function useReservationsByAgeReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingReservationsByAgeReportLastMonth, setLoadingReservationsByAgeReportLastMonth] = useState(true);
  const [reservationsByAgeReportLastMonth, setReservationsByAgeReportLastMonth] = useState();
  const [reservationsByAgeMetadataLastMonth, setReservationsByAgeMetadata] = useState({
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
    setLoadingReservationsByAgeReportLastMonth(true);
    // loadMedatada().then(function () {
      return getReservationsByAgeAndDate(filters.fromDate, filters.toDate)
        .then(setReservationsByAgeReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingReservationsByAgeReportLastMonth(false));
    // });
  };

  function updateFiltersByAgeLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    reservationsByAgeReportLastMonth,
    loadingReservationsByAgeReportLastMonth,
    reservationsByAgeMetadataLastMonth,
    updateFiltersByAgeLastMonth,
    refreshByAge: loadReports,
  };
}
