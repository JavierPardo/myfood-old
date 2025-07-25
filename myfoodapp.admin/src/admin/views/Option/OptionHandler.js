import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { errorHandler } from '../../../common/Forms';
import { optionHttp } from '../../../services/http';
import { ModalContext } from '../../../common/contexts/ModalContext';

import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import Option from './Option';

export const fieldsName = {
  NAME: 'name',
  ACTIVE: 'isActive',
  CHOICES: 'choices',
};

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.ACTIVE]: false,
  [fieldsName.CHOICES]: [],
};

const OptionHandler = ({ id, refresh, isReadOnly }) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { closeModal } = useContext(ModalContext);
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    optionHttp
      .getOption(id)
      .then(setInitValues)
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  }, [id, formatMessage]);

  const saveOption = (option) => {
    setLoading(true);
    const serviceMethod = id
      ? optionHttp.updateOption(option)
      : optionHttp.createOption(option);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreated));
        closeModal();
        refresh();
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  return (
    <Option
      loading={loading}
      initValues={initValues}
      saveOption={saveOption}
      isReadOnly={isReadOnly}
    />
  );
};

OptionHandler.defaultProps = {
  refresh: () => {},
};

OptionHandler.prototype = {
  id: PropTypes.number.isRequired,
  refresh: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

export default React.memo(OptionHandler);
