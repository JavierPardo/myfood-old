import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import {
  toDictonary,
  filterByTerm,
  filterByEquality,
  filterByDateRange,
} from '../../../common/utils';
import { ROUTES } from '../../../common/globalConstants';
import { reservationHttp, specialEventHttp } from '../../../services/http';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';

import { fieldsName } from './ReservationHandler';
import ReservationList from './ReservationList';
import messages from './messages';

const loadDependencies = () => {
  const promises = Promise.allSettled([
    reservationHttp.getAllStatus(),
    specialEventHttp.getAll(false),
  ]).then(([statusResolved, specialEventResolved]) => ({
    statusDic:
      statusResolved.status === 'fulfilled'
        ? toDictonary(statusResolved.value)
        : [],
    specialEventsDic:
      specialEventResolved.status === 'fulfilled'
        ? toDictonary(specialEventResolved.value)
        : [],
  }));

  return promises;
};

const ReservationListHandler = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [statusDic, setStatusDic] = useState({});
  const [specialEventsDic, setSpecialEventsDic] = useState({});

  const goToEdit = (id) =>
    history.push(ROUTES.reservation.edit.replace(':id', id));
  const goToCreate = () => history.push(ROUTES.reservation.new);

  const loadReservations = () => {
    if (!loading) {
      setLoading(true);
    }
    return reservationHttp
      .getAll()
      .then((reservations) => setReservations(reservations))
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    loadDependencies()
      .then(({ statusDic, specialEventsDic }) => {
        setStatusDic(statusDic);
        setSpecialEventsDic(specialEventsDic);
        loadReservations();
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteReservation = (id) => {
    setLoading(true);
    reservationHttp
      .remove(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        loadReservations();
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      })
      .catch(generalErrorHandler);
  };

  const handleFilters = useCallback(
    ({ term, statusId, dateRange: { from, to } }) => {
      const termFiltered = filterByTerm(reservations, term, [
        fieldsName.ON_BEHALF,
        fieldsName.ID,
      ]);
      const statusFiltered =
        statusId === 0
          ? termFiltered
          : filterByEquality(termFiltered, statusId, [fieldsName.STATUS_ID]);

      const dateFiltered = filterByDateRange(
        statusFiltered,
        fieldsName.DATE_TIME,
        from,
        to
      );
      setFilteredReservations(dateFiltered);
    },
    [reservations]
  );
  return (
    <ReservationList
      loading={loading}
      reservations={filteredReservations}
      goToEdit={goToEdit}
      goToCreate={goToCreate}
      refresh={loadReservations}
      deleteReservation={deleteReservation}
      allStatus={statusDic}
      allEvents={specialEventsDic}
      onFiltersApplied={handleFilters}
    />
  );
};

export default ReservationListHandler;
