import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { ROUTES } from '../../../common/globalConstants';
import { specialEventHttp } from '../../../services/http';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';

import SpecialEventList from './SpecialEventList';
import messages from './messages';

export const FILTER_VALUES = {
  all: 'all',
  future: 'future',
};

const SpecialEventListHandler = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [dateFilter, setDateFilter] = useState(FILTER_VALUES.future);

  const goToCreate = () => history.push(ROUTES.specialEvent.new);
  const goToEdit = (id) =>
    history.push(ROUTES.specialEvent.edit.replace(':id', id));

  const loadEvents = () => {
    setLoading(true);
    specialEventHttp
      .getAll(dateFilter === FILTER_VALUES.future)
      .then((events) => setEvents(events))
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  const deleteSpecialEvent = (id) => {
    setLoading(true);
    specialEventHttp
      .remove(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        loadEvents();
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      })
      .catch(generalErrorHandler);
  };

  useEffect(loadEvents, [dateFilter]);

  return (
    <SpecialEventList
      loading={loading}
      events={events}
      goToCreate={goToCreate}
      goToEdit={goToEdit}
      refresh={loadEvents}
      onDateFilter={setDateFilter}
      selectedFilter={dateFilter}
      deleteSpecialEvent={deleteSpecialEvent}
      toggleActive={specialEventHttp.updateIsActive}
    />
  );
};

export default SpecialEventListHandler;
