import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useIntl } from 'react-intl';
import messages from './messages';
import globalMessages from '../../globalMessages';
import { Spinner, DataTable } from '../../components';
import {
  orderStatusHistoryHttp,
  orderStatusHttp,
  userHttp,
} from '../../../services/http';
import * as moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';

const fieldsName = {
  USER_ID: 'appUserId',
};

function generateColumn({ formatMessage }) {
  return [
    {
      name: formatMessage(messages.user),
      selector: fieldsName.orderStatus,
      sortable: false,
      cell: function (element) {
        return element.orderStatus;
      },
      center: true,
    },
    {
      name: formatMessage(messages.user),
      selector: fieldsName.userName,
      sortable: false,
      cell: function (element) {
        return `${element.userName}`;
      },
      center: true,
    },
    {
      name: formatMessage(messages.changeDateTime),
      selector: fieldsName.changeDateTime,
      sortable: false,
      cell: function (element) {
        return moment(element.changeDateTime).format(
          formatMessage(globalMessages.formatDate)
        );
      },
      center: true,
    },
  ];
}

export default function ModalStatusHistory({ onCloseClick, order }) {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [orderStatusHistories, setOrderStatusHistories] = useState([]);

  useEffect(() => {
    if (!!order) {
      setLoading(true);
      Promise.all([
        orderStatusHistoryHttp.getAllByOrderId(order.id),
        orderStatusHttp.getOrderStatus(),
        userHttp.getAllByOrderId(order.id),
      ]).then(function ([orderStatusHistories, orderStatuses, users]) {
        setOrderStatusHistories([
          ...orderStatusHistories.map(function (orderStatusHistory) {
            return {
              ...orderStatusHistory,
              orderStatus: orderStatuses.find(function (orderStatus) {
                return orderStatus.id === orderStatusHistory.statusId;
              }).name,
              userName: users.find(function (user) {
                return user.id === orderStatusHistory.adminUserId;
              }).userName,
            };
          }),
        ]);
        setLoading(false);
      });
    }
    return () => {};
  }, [order]);

  if (!order) return null;
  const columns = generateColumn({ formatMessage });

  return (
    <Modal isOpen size="lg">
      <ModalHeader>
        {formatMessage(messages.modalStatusHitoryTitle)}
      </ModalHeader>
      <ModalBody>
        <Spinner show={loading} />
        <DataTable
          data={orderStatusHistories}
          columns={columns}
          pagination
          isLoading={loading}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCloseClick}>
          {formatMessage(globalMessages.closeAction)}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
