import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getUsersByGenderAndDate } from '../../../../services/http/userReportHttp';
import { genderHttp } from '../../../../services/http';

export default function useUsersByGenderReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingUsersByGenderReportThisMonth, setLoadingUsersByGenderReportThisMonth] = useState(true);
  const [usersByGenderReportThisMonth, setUsersByGenderReportThisMonth] = useState();
  const [usersByGenderMetadataThisMonth, setUsersByGenderMetadataThisMonth] = useState({
    genders: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      genderHttp.getAll(),
    ]).then(function ([genders]) {
      setUsersByGenderMetadataThisMonth({
        ...usersByGenderMetadataThisMonth,
        genders,
      });
    });
  };

  const loadReports = function () {
    setLoadingUsersByGenderReportThisMonth(true);
    loadMedatada().then(function () {
      return getUsersByGenderAndDate(filters.fromDate, filters.toDate)
        .then(setUsersByGenderReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingUsersByGenderReportThisMonth(false));
    });
  };

  function updateFiltersByGenderThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    usersByGenderReportThisMonth,
    loadingUsersByGenderReportThisMonth,
    usersByGenderMetadataThisMonth,
    updateFiltersByGenderThisMonth,
    refreshByGenderThisMonth: loadReports,
  };
}
