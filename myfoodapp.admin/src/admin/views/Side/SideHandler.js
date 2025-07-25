import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import { errorHandler } from '../../../common/Forms';
import { sideHttp } from '../../../services/http';
import Side from './Side';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

export const fieldsName = {
  NAME: 'name',
  IMAGE: 'image',
  DESCRIPTION: 'description',
  PRICE: 'currentPrice',
  ACTIVE: 'isActive',
};

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.DESCRIPTION]: '',
  [fieldsName.PRICE]: '',
  [fieldsName.IMAGE]: '',
  [fieldsName.ACTIVE]: true,
};

const SideHandler = ({ isReadOnly }) => {
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
    sideHttp
      .getSide(id)
      .then(setInitValues)
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  }, [id, formatMessage]);

  const saveSide = (side) => {
    setLoading(true);
    const serviceMethod = id
      ? sideHttp.updateSide(side)
      : sideHttp.createSide(side);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreated));
        history.push(ROUTES.side.list);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const deleteSide = () => {
    setLoading(true);
    sideHttp
      .deleteSide(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        history.push(ROUTES.side.list);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const goBack = () => history.push(ROUTES.side.list);

  return (
    <Side
      loading={loading}
      initValues={initValues}
      isEdit={!!id}
      goBack={goBack}
      saveSide={saveSide}
      deleteSide={deleteSide}
      isReadOnly={isReadOnly}
    />
  );
};

export default SideHandler;
