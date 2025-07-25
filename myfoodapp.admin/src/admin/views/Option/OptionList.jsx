import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Card, CardBody, Button } from 'reactstrap';
import memoize from 'memoize-one';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
  DataTable,
} from '../../../common/components';
import { AsyncSwitch, Switch } from '../../../common/Forms';
import { fieldsName } from './OptionHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const renderButtons = ({ openModal, deleteOption, isReadOnly }, { id }) => {
  return (
    <>
      {!isReadOnly && (
        <Button
          outline
          size="xs"
          color="danger"
          type="button"
          onClick={deleteOption.bind(null, id)}
          className="mr-2"
        >
          <em className={`fas fa-fw fa-trash-alt`} />
        </Button>
      )}
      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        onClick={openModal.bind(null, id)}
      >
        <em
          className={`fas fa-fw ${isReadOnly ? 'fa-eye' : 'fa-pencil-alt'}`}
        />
      </Button>
    </>
  );
};

const renderSwitch = ({ toggleActive, isReadOnly }, { isActive, id }) => {
  if (isReadOnly) {
    return (
      <Switch name={`swt${id}`} checked={isActive} disabled={isReadOnly} />
    );
  }
  return (
    <AsyncSwitch checked={isActive} updateFn={toggleActive.bind({}, id)} />
  );
};

const generateColumns = memoize(
  (formatMessage, openModal, toggleActive, deleteOption, isReadOnly) => [
    {
      name: formatMessage(messages.nameFieldLabel),
      selector: fieldsName.NAME,
      sortable: true,
    },
    {
      name: formatMessage(messages.isActiveFieldLabel),
      selector: fieldsName.ACTIVE,
      cell: renderSwitch.bind({}, { toggleActive, isReadOnly }),
      sortable: false,
    },
    {
      cell: renderButtons.bind(null, { openModal, deleteOption, isReadOnly }),
      right: true,
    },
  ]
);

const OptionList = ({
  loading,
  options,
  refresh,
  openModal,
  toggleActive,
  deleteOption,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(
    formatMessage,
    openModal,
    toggleActive,
    deleteOption,
    isReadOnly
  );

  const refreshBtn = {
    label: formatMessage(globalMessages.refreshButton),
    icon: 'fa-sync-alt',
    style: 'btn-secondary',
    onClick: refresh,
  };

  const addBtn = {
    label: formatMessage(globalMessages.addButton),
    icon: 'fa-plus',
    style: 'btn-primary',
    onClick: () => openModal(),
  };

  const buttons = isReadOnly ? [refreshBtn] : [refreshBtn, addBtn];
  return (
    <ContentWrapper>
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
      <Card className="card-default">
        <Spinner show={loading} />
        <CardBody>
          <DataTable
            columns={columns}
            data={options}
            pagination
            isLoading={loading}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

OptionList.propTypes = {
  loading: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default OptionList;
