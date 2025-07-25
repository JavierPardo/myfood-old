import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';
import { specialEventHttp } from '../../../services/http';
import SpecialEvent from './SpecialEvent';
import messages from './messages';

export const fieldsName = {
  ID: 'id',
  NAME: 'name',
  START_DATE: 'startDateTime',
  END_DATE: 'endDateTime',
  PRICE: 'currentPrice',
  DESCRIPTION: 'description',
  PRE_PAID: 'prepaid',
  IMAGE: 'image',
  ACTIVE: 'isActive',
};

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.START_DATE]: undefined,
  [fieldsName.END_DATE]: undefined,
  [fieldsName.PRICE]: '',
  [fieldsName.DESCRIPTION]: '',
  [fieldsName.PRE_PAID]: false,
  [fieldsName.IMAGE]: '',
  [fieldsName.ACTIVE]: true,
};

const SpecialEventHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    specialEventHttp
      .getOne(id)
      .then(setInitValues)
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  }, [id, formatMessage]);

  const saveEvent = (entity) => {
    setLoading(true);
    const serviceMethod = id
      ? specialEventHttp.update(entity)
      : specialEventHttp.create(entity);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullysaved));
        history.push(ROUTES.specialEvent.list);
      })
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  const goBack = () => history.push(ROUTES.specialEvent.list);

  return (
    <SpecialEvent
      loading={loading}
      initValues={initValues}
      isEdit={!!id}
      goBack={goBack}
      saveEvent={saveEvent}
      isReadOnly={isReadOnly}
    />
  );
};

export default SpecialEventHandler;
