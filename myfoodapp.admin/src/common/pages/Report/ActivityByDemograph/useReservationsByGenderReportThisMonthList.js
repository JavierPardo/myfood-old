import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getReservationsByGenderAndDate } from '../../../../services/http/reservationReportHttp';
import { genderHttp } from '../../../../services/http';

export default function useReservationsByGenderReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingReservationsByGenderReportThisMonth, setLoadingReservationsByGenderReportThisMonth] = useState(true);
  const [reservationsByGenderReportThisMonth, setReservationsByGenderReportThisMonth] = useState();
  const [reservationsByGenderMetadataThisMonth, setReservationsByGenderMetadataThisMonth] = useState({
    genders: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      genderHttp.getAll(),
    ]).then(function ([genders]) {
      setReservationsByGenderMetadataThisMonth({
        ...reservationsByGenderMetadataThisMonth,
        genders,
      });
    });
  };

  const loadReports = function () {
    setLoadingReservationsByGenderReportThisMonth(true);
    loadMedatada().then(function () {
      return getReservationsByGenderAndDate(filters.fromDate, filters.toDate)
        .then(setReservationsByGenderReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingReservationsByGenderReportThisMonth(false));
    });
  };

  function updateFiltersByGenderThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    reservationsByGenderReportThisMonth,
    loadingReservationsByGenderReportThisMonth,
    reservationsByGenderMetadataThisMonth,
    updateFiltersByGenderThisMonth,
    refreshByGenderThisMonth: loadReports,
  };
}
