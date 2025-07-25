import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getUsersByAgeAndDate } from '../../../../services/http/userReportHttp';

export default function useUsersByAgeReportLastMonthList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loadingUsersByAgeReportLastMonth, setLoadingUsersByAgeReportLastMonth] = useState(true);
  const [usersByAgeReportLastMonth, setUsersByAgeReportLastMonth] = useState();
  const [usersByAgeMetadataLastMonth, setUsersByAgeMetadata] = useState({
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
    setLoadingUsersByAgeReportLastMonth(true);
    // loadMedatada().then(function () {
      return getUsersByAgeAndDate(filters.fromDate, filters.toDate)
        .then(setUsersByAgeReportLastMonth)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoadingUsersByAgeReportLastMonth(false));
    // });
  };

  function updateFiltersByAgeLastMonth (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    usersByAgeReportLastMonth,
    loadingUsersByAgeReportLastMonth,
    usersByAgeMetadataLastMonth,
  };
}
