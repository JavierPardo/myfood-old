import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import globalMessages from '../../globalMessages';
import {
  Spinner,
  ContentWrapper,
  PageHeader,
  DataTable,
} from '../../components';
import useEventList from './useEventList';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { useState } from 'react';
import { eventHttp } from '../../../services/http';
import { memoize } from 'lodash';
import { renderEnum, dateToString } from '../../utils';
import Select from '../../components/Select';
import DateRange from '../../components/DateRange';

function ChangeStatusModal({
  onChangeStatus,
  onChangeStatusCancel,
  currentStatus,
  statuses,
}) {
  const [actualStatus, setActualStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const { formatMessage } = useIntl();

  function changeStatusHandler({ target: { value } }) {
    setActualStatus(value);
  }

  function changeStatusSaveHandler({ target: { value } }) {
    setLoading(true);

    onChangeStatus(actualStatus).then(function () {
      setLoading(false);
      onChangeStatusCancel();
    });
  }

  if (!currentStatus) return null;
  else
    return (
      <Modal isOpen={true}>
        <ModalHeader>{formatMessage(messages.changeStatus)}</ModalHeader>
        <ModalBody>
          <Spinner show={loading} />
          <ButtonGroup>
            {statuses.map(function (status) {
              return (
                <Button
                  onClick={changeStatusHandler}
                  color={status.id === actualStatus ? 'primary' : 'secondary'}
                  value={status.id}
                >
                  {status.name}
                </Button>
              );
            })}
          </ButtonGroup>
        </ModalBody>
        <ModalFooter>
          <Spinner show={loading} />
          <Button color="primary" onClick={changeStatusSaveHandler}>
            {formatMessage(globalMessages.saveButton)}
          </Button>
          <Button color="primary" onClick={onChangeStatusCancel} outline>
            {formatMessage(globalMessages.cancelButton)}
          </Button>
        </ModalFooter>
      </Modal>
    );
}

const renderButtons = function ({ buttons }, event) {
  return buttons.map(function ({ label, action, icon, isHidden }) {
    if (isHidden) {
      return null;
    }
    return (
      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        style={{ marginLeft: '1rem' }}
        onClick={action.bind({}, event)}
      >
        {label}
        {icon && <em className={icon} />}
      </Button>
    );
  });
};

const generateColumns = memoize(function ({
  isReadOnly,
  formatMessage,
  goToEdit,
  metadata,
  showModalChangeStatus,
}) {
  return [
    { name: formatMessage(messages.eventId), selector: 'id', sortable: true },
    {
      name: formatMessage(messages.user),
      selector: 'appUserId',
      cell: function (event) {
        return event.user.email;
      },
      sortable: true,
    },
    {
      name: formatMessage(messages.startDate),
      selector: 'startDateTime',
      cell: dateToString.bind(
        {},
        {
          formatDate: formatMessage(globalMessages.completeFormatDate),
          propertyName: 'startDateTime',
        }
      ),
      sortable: true,
    },
    {
      name: formatMessage(messages.eventStatus),
      selector: 'currentStatusId',
      cell: renderEnum.bind({}, metadata.eventStatus, 'currentStatusId'),
      sortable: true,
    },
    {
      name: formatMessage(messages.eventType),
      selector: 'typeId',
      cell: renderEnum.bind({}, metadata.eventTypes, 'typeId'),
      sortable: true,
    },
    {
      name: formatMessage(messages.amount),
      selector: 'totalAmount',
      sortable: true,
    },
    {
      cell: renderButtons.bind(
        {},
        {
          buttons: [
            {
              label: formatMessage(messages.changeStatus),
              action: showModalChangeStatus,
              isHidden: isReadOnly,
            },
            {
              icon: isReadOnly ? 'far fa-eye' : 'fas fa-fw fa-pencil-alt',
              action: goToEdit,
            },
          ],
        }
      ),
      right: true,
    },
  ];
});
const initialFilter = {
  userName: '',
  id: '',
  fromDate: null,
  toDate: null,
  status: 'all',
};
function FilterEvents({ onChangeFilter, statuses, formatMessage }) {
  const currentStatuses = [
    ...statuses,
    { value: 'all', label: 'Todos', id: 'all' },
  ];
  const [filter, setFilter] = useState({ ...initialFilter });
  function clickChangeFilterHandler() {
    onChangeFilter(filter);
  }

  function clickClearFilterHandler() {
    setFilter({ ...initialFilter });
    onChangeFilter({ ...initialFilter });
  }

  function changeFilterHandler({ target: { value, name } }) {
    setFilter({ ...filter, [name]: value });
  }

  let statusSelected = currentStatuses.find(function (status) {
    return status.id === filter.status;
  });
  return (
    <>
      <h3>Filtrar por:</h3>
      <Row>
        <Col lg="2">
          {formatMessage(messages.eventId)}:<br />
          <Input
            placeholder={'# Pedido'}
            onChange={changeFilterHandler}
            name={'id'}
            value={filter.id}
          />
        </Col>
        <Col lg="2">
          {formatMessage(messages.user)}:<br />
          <Input
            placeholder={'Nombre de usuario'}
            onChange={changeFilterHandler}
            name={'userName'}
            value={filter.userName}
          />
        </Col>
        <Col lg="3">
          {formatMessage(messages.rangeDate)}:<br />
          <DateRange
            name="Date"
            onDateRangeChange={changeFilterHandler}
            fromDate={filter.fromDate}
            toDate={filter.toDate}
          />
        </Col>
        <Col lg="2">
          {formatMessage(messages.eventStatus)}:<br />
          <Select
            options={currentStatuses}
            placeholder={formatMessage(messages.eventStatus)}
            onChange={function (event) {
              const { value } = event || {};
              changeFilterHandler({ target: { value, name: 'status' } });
            }}
            value={statusSelected}
            name={'status'}
          />
        </Col>
        <Col className="d-flex flex-lg-row justify-content-center" lg="3">
          <Button
            color={'primary'}
            outline
            onClick={clickClearFilterHandler}
            className="btn-sm mt-4"
            style={{ flexGrow: 1 }}
          >
            <em className="fas fa-trash-alt"></em>&nbsp;
            {formatMessage(globalMessages.clearFilter)}
          </Button>
          <Button
            color={'primary'}
            onClick={clickChangeFilterHandler}
            className="ml-1 btn-sm mt-4"
            style={{ flexGrow: 1 }}
          >
            <em className="fas fa-search"></em>&nbsp;
            {formatMessage(globalMessages.searchLabel)}
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default function List({ isReadOnly }) {
  const [orderSelected, setOrderSelected] = useState({});
  const [filters, setFilters] = useState(initialFilter);
  const {
    events,
    loading,
    refresh,
    goToCreate,
    goToEdit,
    metadata,
    updateIsVisible,
  } = useEventList();

  function changeStatusHandler(newStatus) {
    return eventHttp
      .updateEventStatus(`${orderSelected.id}/${newStatus}`)
      .then(function () {
        refresh();
      });
  }
  const { formatMessage } = useIntl();

  function showModalChangeStatus(event) {
    setOrderSelected(event);
  }

  const columns = generateColumns({
    formatMessage,
    updateIsVisible,
    goToEdit,
    metadata,
    isReadOnly,
    showModalChangeStatus,
  });

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
      isHidden: isReadOnly,
    },
  ];

  function changeStatusCancelHandler() {
    setOrderSelected({});
  }

  const eventsFiltered = events.filter(function (event) {
    return (
      (!filters.id || event.id.toString().includes(filters.id)) &&
      (filters.status === 'all' ||
        event.currentStatusId.toString() === filters.status) &&
      (!filters.userName || event.user.email.includes(filters.userName)) &&
      (!filters.fromDate ||
        filters.fromDate
          .startOf('day')
          .isSameOrBefore(event.startDateTime, 'day')) &&
      (!filters.toDate ||
        filters.toDate.endOf('day').isSameOrAfter(event.startDateTime, 'day'))
    );
  });
  function filterChangedHandler(filters) {
    setFilters({ ...filters });
  }

  const isModalOpen = !!orderSelected.currentStatusId;
  return (
    <>
      {isModalOpen && (
        <ChangeStatusModal
          onChangeStatus={changeStatusHandler}
          currentStatus={orderSelected.currentStatusId}
          onChangeStatusCancel={changeStatusCancelHandler}
          statuses={metadata.eventStatus}
        />
      )}
      <ContentWrapper>
        <PageHeader
          title={formatMessage(messages.listTitle)}
          buttons={buttons}
        />

        <Card className="card-default">
          <Spinner show={loading} />
          <CardBody>
            {events && !!events.length && (
              <FilterEvents
                formatMessage={formatMessage}
                onChangeFilter={filterChangedHandler}
                statuses={metadata.eventStatus.map(function (status) {
                  return { ...status, value: status.id, label: status.name };
                })}
              />
            )}
            <DataTable
              columns={columns}
              data={eventsFiltered}
              isLoading={loading}
              pagination
              className="stripped-data-table"
            />
          </CardBody>
        </Card>
      </ContentWrapper>
    </>
  );
}
