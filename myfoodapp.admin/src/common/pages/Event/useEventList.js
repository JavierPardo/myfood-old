import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { errorHandler } from '../../Forms';
import globalMessages from '../../globalMessages';
import { ROUTES } from '../../globalConstants';
import { useEffect } from 'react';
import { getEvents } from '../../../services/http/eventHttp';
import { eventTypeHttp, eventStatusHttp } from '../../../services/http';

export default function useEventList() {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [metadata, setMetadata] = useState({
    eventTypes: [],
    eventStatus: [],
    users: [],
  });

  const goToCreate = function () {
    history.push(ROUTES.event.new);
  };

  const goToEdit = function ({ id }) {
    history.push(ROUTES.event.edit.replace(':eventId', id));
  };

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

  const loadEvents = function () {
    setLoading(true);
    loadMedatada().then(function () {
      return getEvents()
        .then(setEvents)
        .catch(
          errorHandler.bind(
            null,
            formatMessage(globalMessages.generalErrorMessage)
          )
        )
        .finally(() => setLoading(false));
    });
  };

  function gotToAddOrder(event) {
    console.log(event);
  }

  useEffect(loadEvents, []);

  return {
    events,
    loading,
    goToCreate,
    goToEdit,
    gotToAddOrder,
    metadata,
    refresh: loadEvents,
  };
}
