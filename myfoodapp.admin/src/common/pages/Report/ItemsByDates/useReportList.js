import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getOrderItemsByDate } from '../../../../services/http/orderItemReportHttp';

export default function useReportList(initialFilter) {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState(initialFilter);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState();

  const loadReports = function () {
    setLoading(true);
    return getOrderItemsByDate(filters.fromDate, filters.toDate)
      .then(setReports)
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  function updateFilters (filters){
    setFilters({ ...filters });
  }

  useEffect(() => {
    loadReports();
  }, [filters]);

  return {
    reports,
    loading,
    updateFilters,
    refresh: loadReports,
  };
}
