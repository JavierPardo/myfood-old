import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { toValueLabelList } from '../../../common/utils';

import { ROUTES } from '../../../common/globalConstants';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';
import { reservationHttp, specialEventHttp } from '../../../services/http';
import Reservation from './Reservation';
import messages from './messages';

export const fieldsName = {
  ID: 'id',
  ON_BEHALF: 'userFullName',
  USER_FIRST_NAME: 'user.firstName',
  USER_LAST_NAME: 'user.lastName',
  USER_PHONE: 'user.phoneNumber',
  USER_EMAIL: 'user.email',
  DATE_TIME: 'reservationDateTime',
  RECORD_DATE: 'requestedDateTime',
  GUESTS: 'numberOfGuests',
  STATUS_ID: 'currentStatusId',
  TRANSACTION_ID: 'transactionId',
  NOTES: 'notes',
  SPECIAL_EVENT_ID: 'specialEventId',
};

const initialValues = {
  [fieldsName.USER_FIRST_NAME]: '',
  [fieldsName.USER_LAST_NAME]: '',
  [fieldsName.USER_PHONE]: '',
  [fieldsName.USER_EMAIL]: '',
  [fieldsName.DATE_TIME]: undefined,
  [fieldsName.RECORD_DATE]: undefined,
  [fieldsName.GUESTS]: '',
  [fieldsName.STATUS_ID]: 1,
  [fieldsName.NOTES]: '',
  [fieldsName.SPECIAL_EVENT_ID]: '',
};

const loadDependencies = () => {
  const promises = Promise.allSettled([
    reservationHttp.getAllStatus(),
    specialEventHttp.getActivesOnly(),
  ]).then(([statusResolved, specialEventResolved]) => ({
    statusList:
      statusResolved.status === 'fulfilled'
        ? toValueLabelList(statusResolved.value)
        : [],
    specialEvents:
      specialEventResolved.status === 'fulfilled'
        ? toValueLabelList(specialEventResolved.value)
        : [],
  }));

  return promises;
};

const ReservationHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const [statusList, setStatusList] = useState([]);
  const [specialEvents, setSpecialEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    loadDependencies().then(({ statusList, specialEvents }) => {
      setStatusList(statusList);
      setSpecialEvents(specialEvents);
      if (!id) {
        setLoading(false);
        return;
      }
      reservationHttp
        .getOne(id)
        .then(setInitValues)
        .catch(generalErrorHandler)
        .finally(() => setLoading(false));
    });
  }, [id, formatMessage]);

  const saveReservation = (entity) => {
    setLoading(true);
    const serviceMethod = id
      ? reservationHttp.update(entity)
      : reservationHttp.create(entity);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullysaved));
        history.push(ROUTES.reservation.list);
      })
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  const goBack = () => history.push(ROUTES.reservation.list);
  const sendWhatsapp = (number) => window.open(`https://wa.me/591${number}`);
  const sendEmail = (email) => (window.location = `mailto:${email}`);

  return (
    <Reservation
      loading={loading}
      isEdit={!!id}
      initValues={initValues}
      goBack={goBack}
      saveReservation={saveReservation}
      statusList={statusList}
      specialEvents={specialEvents}
      sendWhatsapp={sendWhatsapp}
      sendEmail={sendEmail}
      isReadOnly={isReadOnly}
    />
  );
};

export default ReservationHandler;
