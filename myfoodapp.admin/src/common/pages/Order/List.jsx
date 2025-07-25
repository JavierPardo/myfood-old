import React from 'react';

import { useIntl } from 'react-intl';

import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from 'reactstrap';

import { memoize } from 'lodash';
import {
  PageHeader,
  ContentWrapper,
  Spinner,
  DataTable,
} from '../../components';
import globalMessages from '../../globalMessages';

import messages from './messages';
import useOrderList from './useOrderList';
import { useState } from 'react';
import { orderHttp } from '../../../services/http/orderHttp';

function ChangeStatusModal({
  onChangeStatus,
  onChangeStatusCancel,
  currentStatus,
  metadata: { orderStatuses },
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
      <Modal isOpen={true} size="lg">
        <ModalHeader>{formatMessage(messages.changeStatus)}</ModalHeader>
        <ModalBody>
          <Spinner show={loading} />
          <ButtonGroup>
            {orderStatuses.map(function (status) {
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

const generateColumns = memoize(function ({
  formatMessage,
  updateIsVisible,
  goToEdit,
  metadata: { orderStatuses },
  showModalChangeStatus,
}) {
  const buttons = [
    {
      label: formatMessage(messages.changeStatus),
      action: showModalChangeStatus,
    },
    { action: goToEdit, icon: 'fas fa-fw fa-pencil-alt' },
  ];

  return [
    { name: formatMessage(messages.orderId), selector: 'id', sortable: true },
    {
      name: formatMessage(messages.customerName),
      selector: 'customerName',
      sortable: true,
    },
    {
      name: formatMessage(messages.customerId),
      selector: 'customerId',
      sortable: true,
    },
    {
      name: formatMessage(messages.currentStatus),
      selector: 'currentStatusId',
      sortable: true,
      cell: renderEnum.bind({}, orderStatuses, 'currentStatusId'),
    },
    {
      cell: renderButtons.bind({}, buttons),
      right: true,
    },
  ];
});

const renderEnum = function (listEnum, stringProp, event) {
  const element = listEnum.find((x) => x.id === event[stringProp]);
  return element && element.name;
};

const renderButtons = function (buttons, order) {
  return buttons.map(function ({ label, action, icon }) {
    return (
      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        style={{ marginLeft: '1rem' }}
        onClick={action.bind({}, order)}
      >
        {label}
        {icon && <em className={`fas fa-fw fa-pencil-alt`} />}
      </Button>
    );
  });
};

export default function List() {
  const { formatMessage } = useIntl();
  const [orderSelected, setOrderSelected] = useState({});
  const {
    orders,
    loading,
    refresh,
    goToCreate,
    goToEdit,
    updateIsVisible,
    metadata,
  } = useOrderList();

  const columns = generateColumns({
    formatMessage,
    updateIsVisible,
    goToEdit,
    metadata,
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
    },
  ];

  function showModalChangeStatus(eventId) {
    setOrderSelected(eventId);
  }

  function changeStatusHandler(newStatus) {
    return orderHttp
      .updateOrderStatus(`${orderSelected.id}/${newStatus}`)
      .then(function () {
        refresh();
      });
  }

  function changeStatusCancelHandler() {
    setOrderSelected({});
  }

  const isModalOpen = !!orderSelected.currentStatusId;
  return (
    <ContentWrapper>
      {isModalOpen && (
        <ChangeStatusModal
          onChangeStatus={changeStatusHandler}
          currentStatus={orderSelected.currentStatusId}
          onChangeStatusCancel={changeStatusCancelHandler}
          metadata={metadata}
        />
      )}
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
      <Card className="card-default">
        <Spinner show={loading} />
        <CardBody>
          <DataTable
            isLoading={loading}
            striped={true}
            className="stripped-data-table"
            columns={columns}
            data={orders}
            pagination
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
}
