import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getUsersByAgeAndDate } from '../../../../services/http/userReportHttp';

export default function useUsersByAgeReportThisMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingUsersByAgeReportThisMonth, setLoadingUsersByAgeReportThisMonth] = useState(true);
  const [usersByAgeReportThisMonth, setUsersByAgeReportThisMonth] = useState();
  const [usersByAgeMetadataThisMonth, setUsersByAgeMetadata] = useState({
    ages: [],
  });

  // const loadMedatada = function () {
  //   return Promise.all([
  //     ageHttp.getAll(),
  //   ]).then(function ([ages]) {
  //     setUsersByAgeMetadata({
  //       ...usersByAgeMetadata,
  //       ages,
  //     });
  //   });
  // };

  const loadReports = function () {
    setLoadingUsersByAgeReportThisMonth(true);
    // loadMedatada().then(function () {
      return getUsersByAgeAndDate(filters.fromDate, filters.toDate)
        .then(setUsersByAgeReportThisMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingUsersByAgeReportThisMonth(false));
    // });
  };

  function updateFiltersByAgeThisMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    usersByAgeReportThisMonth,
    loadingUsersByAgeReportThisMonth,
    usersByAgeMetadataThisMonth,
    updateFiltersByAgeThisMonth,
    refreshByAge: loadReports,
  };
}
