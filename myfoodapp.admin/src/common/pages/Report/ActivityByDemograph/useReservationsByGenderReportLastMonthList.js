import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getReservationsByGenderAndDate } from '../../../../services/http/reservationReportHttp';
import { genderHttp } from '../../../../services/http';

export default function useReservationsByGenderReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingReservationsByGenderReportLastMonth, setLoadingReservationsByGenderReportLastMonth] = useState(true);
  const [reservationsByGenderReportLastMonth, setReservationsByGenderReportLastMonth] = useState();
  const [reservationsByGenderMetadataLastMonth, setReservationsByGenderMetadataLastMonth] = useState({
    genders: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      genderHttp.getAll(),
    ]).then(function ([genders]) {
      setReservationsByGenderMetadataLastMonth({
        ...reservationsByGenderMetadataLastMonth,
        genders,
      });
    });
  };

  const loadReports = function () {
    setLoadingReservationsByGenderReportLastMonth(true);
    loadMedatada().then(function () {
      return getReservationsByGenderAndDate(filters.fromDate, filters.toDate)
        .then(setReservationsByGenderReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingReservationsByGenderReportLastMonth(false));
    });
  };

  function updateFiltersByGenderLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    reservationsByGenderReportLastMonth,
    loadingReservationsByGenderReportLastMonth,
    reservationsByGenderMetadataLastMonth,
    updateFiltersByGenderLastMonth,
    refreshByGenderLastMonth: loadReports,
  };
}
