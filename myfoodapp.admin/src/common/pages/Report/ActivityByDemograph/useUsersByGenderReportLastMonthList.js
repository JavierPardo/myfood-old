import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getUsersByGenderAndDate } from '../../../../services/http/userReportHttp';
import { genderHttp } from '../../../../services/http';

export default function useUsersByGenderReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingUsersByGenderReportLastMonth, setLoadingUsersByGenderReportLastMonth] = useState(true);
  const [usersByGenderReportLastMonth, setUsersByGenderReportLastMonth] = useState();
  const [usersByGenderMetadataLastMonth, setUsersByGenderMetadataLastMonth] = useState({
    genders: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      genderHttp.getAll(),
    ]).then(function ([genders]) {
      setUsersByGenderMetadataLastMonth({
        ...usersByGenderMetadataLastMonth,
        genders,
      });
    });
  };

  const loadReports = function () {
    setLoadingUsersByGenderReportLastMonth(true);
    loadMedatada().then(function () {
      return getUsersByGenderAndDate(filters.fromDate, filters.toDate)
        .then(setUsersByGenderReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingUsersByGenderReportLastMonth(false));
    });
  };

  function updateFiltersByGenderLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    usersByGenderReportLastMonth,
    loadingUsersByGenderReportLastMonth,
    usersByGenderMetadataLastMonth,
    updateFiltersByGenderLastMonth,
    refreshByGenderLastMonth: loadReports,
  };
}
