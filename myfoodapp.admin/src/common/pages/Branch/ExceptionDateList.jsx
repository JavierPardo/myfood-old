import React from 'react';
import {
  ContentWrapper,
  PageHeader,
  Spinner,
  DataTable,
} from '../../components';
import useExceptionDateList from './useExceptionDateList';
import { memoize } from 'lodash';
import { useIntl } from 'react-intl';
import { Button } from 'reactstrap';
import globalMessages from '../../globalMessages';
import messages from './messages';
import { dateToString } from '../../utils';
import { AsyncSwitch } from '../../Forms';

const fieldsName = {
  SERVICE: 'service',
  IS_CLOSED: 'isClosed',
  EXCEPTION_DATE: 'exceptionDate',
  TIME_START: 'timeStart',
  TIME_END: 'timeEnd',
};

function renderSwitch(updateIsClosed, { id, ...exceptionDate }) {
  return (
    <AsyncSwitch
      checked={exceptionDate[fieldsName.IS_CLOSED]}
      updateFn={updateIsClosed.bind(
        {},
        { [fieldsName.IS_CLOSED]: !exceptionDate[fieldsName.IS_CLOSED], id }
      )}
    />
  );
}

function renderButtons({ goToEdit }, { id }) {
  return (
    <>
      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        onClick={goToEdit.bind(null, id)}
      >
        <em className={`fas fa-fw fa-pencil-alt`} />
      </Button>
    </>
  );
}

const generateColumns = memoize(function ({
  formatMessage,
  goToEdit,
  updateIsClosed,
}) {
  return [
    {
      name: formatMessage(messages.serviceFieldName),
      selector: fieldsName.SERVICE,
      sortable: false,
      center: true,
    },
    {
      name: formatMessage(messages.isClosedFieldName),
      selector: fieldsName.IS_CLOSED,
      cell: renderSwitch.bind({}, updateIsClosed),
      center: true,
    },
    {
      name: formatMessage(messages.dateFieldName),
      selector: fieldsName.EXCEPTION_DATE,
      cell: dateToString.bind(
        {},
        {
          formatDate: formatMessage(globalMessages.formatDateShort),
          propertyName: fieldsName.EXCEPTION_DATE,
        }
      ),
    },
    {
      cell: renderButtons.bind({}, { goToEdit }),
      center: true,
    },
  ];
});

export default function ExceptionDateList() {
  const {
    title,
    exceptionDates,
    refresh,
    goToCreate,
    updateIsClosed,
    goToEdit,
    normalDates,
    isLoading,
  } = useExceptionDateList();
  const { formatMessage } = useIntl();
  const columns = generateColumns({ formatMessage, goToEdit, updateIsClosed });

  const buttons = [
    {
      label: formatMessage(globalMessages.refreshButton),
      icon: 'fa-sync',
      style: 'btn-secondary',
      onClick: refresh,
    },
    {
      label: formatMessage(globalMessages.addButton),
      icon: 'fa-plus',
      style: 'btn-primary',
      onClick: goToCreate,
    },
  ];

  return (
    <ContentWrapper>
      <PageHeader title={title} buttons={buttons} />
      <Spinner show={isLoading} />
      <h3>{formatMessage(messages.normalDates)}</h3>
      <DataTable columns={columns} data={normalDates} isLoading={isLoading} />
      <h3 className="mt-4">{formatMessage(messages.exceptionDate)}</h3>
      <DataTable
        columns={columns}
        data={exceptionDates}
        pagination
        isLoading={isLoading}
      />
    </ContentWrapper>
  );
}
