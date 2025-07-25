import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';
import memoize from 'memoize-one';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
  DataTable,
} from '../../../common/components';

import { renderYesNo } from '../../../common/cmptUtils';
import { sortByDate, formatDate } from '../../../common/utils';
import { DATE_TIME_FORMAT } from '../../../common/globalConstants';
import { fieldsName } from './ReservationHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import { ROUTES } from '../../../common/globalConstants';
import FilterBar from './FilterBar';

const statusColorMapper = {
  1: 'badge-info',
  2: 'badge-danger',
  3: 'badge-danger',
  4: 'badge-success',
};

const renderButtons = ({ editAction, deleteAction }, { id }) => {
  return (
    <>
      <Button
        outline
        size="xs"
        color="danger"
        type="button"
        onClick={deleteAction.bind(null, id)}
        className="mr-2"
      >
        <em className={`fas fa-fw fa-trash-alt`} />
      </Button>
      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        onClick={editAction.bind(null, id)}
      >
        <em className={`fas fa-fw fa-pencil-alt`} />
      </Button>
    </>
  );
};

const renderLinkToShow = ({ id }) => (
  <Link to={ROUTES.reservation.preview.replace(':id', id)}>{id}</Link>
);

const renderStatus = (allStatus, { [fieldsName.STATUS_ID]: statusId }) => {
  return (
    <div className={`badge ${statusColorMapper[statusId]}`}>
      {allStatus[statusId]}
    </div>
  );
};

const generateColumns = memoize(
  (formatMessage, editAction, deleteAction, allStatus, allEvents) => [
    {
      name: formatMessage(messages.idFieldLabel),
      selector: fieldsName.ID,
      cell: renderLinkToShow,
      grow: 0.5,
    },
    {
      name: formatMessage(messages.onBehalfFieldLabel),
      selector: fieldsName.ON_BEHALF,
      sortable: true,
    },
    {
      name: formatMessage(messages.statusFieldLabel),
      cell: renderStatus.bind({}, allStatus),
      sortable: false,
      center: true,
    },
    {
      name: formatMessage(messages.reservationDateFieldLabel),
      selector: fieldsName.DATE_TIME,
      format: formatDate(fieldsName.DATE_TIME, DATE_TIME_FORMAT),
      sortable: true,
      sortFunction: sortByDate(fieldsName.DATE_TIME),
    },

    {
      name: formatMessage(messages.guestsFieldLabel),
      selector: fieldsName.GUESTS,
      center: true,
    },
    {
      name: formatMessage(messages.specialEventFieldLabel),
      selector: fieldsName.SPECIAL_EVENT_ID,
      format: ({ [fieldsName.SPECIAL_EVENT_ID]: eventId }) =>
        allEvents[eventId],
      center: true,
    },
    {
      name: formatMessage(messages.transactionFieldLabel),
      selector: fieldsName.TRANSACTION_ID,
      format: renderYesNo(fieldsName.TRANSACTION_ID),
      center: true,
    },
    {
      cell: renderButtons.bind(null, { editAction, deleteAction }),
      right: true,
      grow: 0.5,
    },
  ]
);

const ReservationList = ({
  loading,
  reservations,
  goToEdit,
  goToCreate,
  refresh,
  deleteReservation,
  allStatus,
  allEvents,
  onFiltersApplied,
}) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(
    formatMessage,
    goToEdit,
    deleteReservation,
    allStatus,
    allEvents
  );
  const buttons = [
    {
      label: formatMessage(globalMessages.refreshButton),
      icon: 'fa-sync-alt',
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
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
      <Card className="card-default">
        <Spinner show={loading} />

        <CardBody>
          <FilterBar
            statusDic={allStatus}
            onFiltersApplied={onFiltersApplied}
          />
          <DataTable
            columns={columns}
            data={reservations}
            pagination
            noHeader
            isLoading={loading}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

ReservationList.propTypes = {
  loading: PropTypes.bool,
  reservations: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  deleteReservation: PropTypes.func.isRequired,
  allStatus: PropTypes.object,
  allEvents: PropTypes.object,
  onFiltersApplied: PropTypes.func,
};

export default ReservationList;
