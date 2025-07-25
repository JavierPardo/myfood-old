import React, { useState, useEffect, useContext } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { ModalContext } from '../../../common/contexts/ModalContext';
import { optionHttp } from '../../../services/http';
import { errorHandler } from '../../../common/Forms';

import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import OptionList from './OptionList';
import OptionHandler from './OptionHandler';

export const OptionListHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const { openModal, updateModalProps } = useContext(ModalContext);
  const [options, setoptions] = useState([]);
  const loadOptions = () => {
    setLoading(true);
    optionHttp
      .getOptions()
      .then((options) => setoptions(options))
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const openFormModal = (id) => {
    updateModalProps({
      title: formatMessage(id ? messages.editTitle : messages.createTitle),
      content: (
        <OptionHandler id={id} refresh={loadOptions} isReadOnly={isReadOnly} />
      ),
      acceptLabel: formatMessage(
        id ? globalMessages.updateButton : globalMessages.saveButton
      ),
      cancelLabel: formatMessage(globalMessages.cancelButton),
      isReadOnly: isReadOnly,
    });
    openModal();
  };

  const deleteOption = (id) => {
    setLoading(true);
    optionHttp
      .deleteOption(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        loadOptions();
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      );
  };

  useEffect(loadOptions, []);
  return (
    <OptionList
      loading={loading}
      options={options}
      refresh={loadOptions}
      openModal={openFormModal}
      deleteOption={deleteOption}
      toggleActive={optionHttp.updateIsActive}
      isReadOnly={isReadOnly}
    />
  );
};

export default OptionListHandler;
