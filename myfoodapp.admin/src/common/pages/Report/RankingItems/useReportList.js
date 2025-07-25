import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../../Forms';
import globalMessages from '../../../globalMessages';
import { useEffect } from 'react';
import { getEvents } from '../../../../services/http/eventHttp';
import { eventTypeHttp, eventStatusHttp } from '../../../../services/http';

export default function useReportList() {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [metadata, setMetadata] = useState({
    eventTypes: [],
    eventStatus: [],
    users: [],
  });

  const loadMedatada = function () {
    return Promise.all([
      eventTypeHttp.getEventTypes(),
      eventStatusHttp.getEventStatus(),
    ]).then(function ([eventTypes, eventStatus]) {
      setMetadata({
        ...metadata,
        eventTypes,
        eventStatus,
      });
    });
  };

  const loadReports = function () {
    setLoading(true);
    loadMedatada().then(function () {
      return getEvents()
        .then(setReports)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoading(false));
    });
  };

  useEffect(loadReports, []);

  return {
    reports,
    loading,
    metadata,
    refresh: loadReports,
  };
}
