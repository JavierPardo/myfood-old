import React from 'react';
import EventContext from '../../contexts/EventContext/EventContext';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import {
  Label,
  Col,
  Button,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
} from 'reactstrap';
import { parseFloat } from 'core-js/fn/number';
import DataTable from 'react-data-table-component';
import { memoize } from 'lodash';
import { renderEnum, dateToString } from '../../utils';
import { useHistory } from 'react-router';
import { ROUTES } from '../../globalConstants';
import globalMessages from '../../globalMessages';
import { useState } from 'react';
import { Spinner } from '../../components';
import { useEffect } from 'react';
import { orderHttp, couponHttp } from '../../../services/http';
import { InlineField } from '../../Forms';
import { toast } from 'react-toastify';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { useDispatch } from 'react-redux';
import ModalStatusHistory from './ModalStatusHistory';

function LineOrderItem({
  orderItem: {
    item: { name, description },
    selectedOptions: [option],
    notes,
    price,
    quantity,
  },
}) {
  const { formatMessage } = useIntl();
  return (
    <>
      <h5>{name}:</h5>
      {description}
      <br />
      <Label>{formatMessage(messages.quantity)}:</Label>&nbsp;
      <span>{quantity}</span>
      <br />
      {option && (
        <>
          <Label>{formatMessage(messages.option)}:</Label>&nbsp;
          <span>{option}</span>
          <br />
        </>
      )}
      <Label>{formatMessage(messages.price)}:</Label>&nbsp;<span>{price}</span>
      <br />
      {notes && (
        <>
          <Label>{formatMessage(messages.notes)}:</Label>&nbsp;
          <span>{notes}</span>
          <br />
        </>
      )}
      <Label>{formatMessage(messages.subTotal)}:</Label>&nbsp;
      <span>{parseFloat(price) * parseFloat(quantity)}</span>
      <br />
    </>
  );
}

function LineOrderExtra({
  orderExtra: {
    side: { name, description },
    quantity,
    price,
  },
}) {
  const { formatMessage } = useIntl();
  return (
    <>
      <h5>{name}:</h5>
      {description}
      <br />
      <Label>{formatMessage(messages.quantity)}:</Label>&nbsp;
      <span>{quantity}</span>
      <br />
      <Label>{formatMessage(messages.price)}:</Label>&nbsp;<span>{price}</span>
      <br />
      <Label>{formatMessage(messages.subTotal)}:</Label>&nbsp;
      <span>{parseFloat(price) * parseFloat(quantity)}</span>
      <br />
    </>
  );
}

function LineOrder({ data: { orderItems, orderExtras } }) {
  return (
    <>
      {orderItems.map(function (orderItem) {
        return <LineOrderItem orderItem={orderItem} />;
      })}
      <hr />
      {orderExtras.map(function (orderExtra) {
        return <LineOrderExtra orderExtra={orderExtra} />;
      })}
    </>
  );
}

function calculateDetailSubtotal(subtotal, orderDetail) {
  orderDetail.subTotal =
    parseFloat(orderDetail.price) * parseFloat(orderDetail.quantity);
  return subtotal + orderDetail.subTotal;
}

const renderButtons = function ({ buttons }, order) {
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

const generateOrderColumns = memoize(function ({
  formatMessage,
  metadata,
  showModalChangeStatus,
  showModalHistoryStatus,
}) {
  return [
    { name: formatMessage(messages.orderId), selector: 'id', sortable: true },
    {
      name: formatMessage(messages.createdDate),
      selector: 'createOrderDateTime',
      cell: dateToString.bind(
        {},
        {
          formatDate: formatMessage(globalMessages.formatDate),
          propertyName: 'createOrderDateTime',
        }
      ),
      sortable: true,
    },
    {
      name: formatMessage(messages.orderStatus),
      selector: 'currentStatusId',
      cell: renderEnum.bind({}, metadata.orderStatuses, 'currentStatusId'),
      sortable: true,
    },
    {
      name: formatMessage(messages.subTotal),
      selector: 'subTotal',
      cell: function ({ subTotal }) {
        return `${formatMessage(globalMessages.currency)} ${subTotal}`;
      },
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
            },
            {
              label: formatMessage(messages.viewStatusHistory),
              action: showModalHistoryStatus,
            },
          ],
        }
      ),
      right: false,
    },
  ];
});

function ChangeStatusModal({
  onChangeStatus,
  order,
  onChangeStatusCancel,
  statuses,
}) {
  const [actualStatus, setActualStatus] = useState(
    order && order.currentStatusId
  );
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

  useEffect(() => {
    setActualStatus(order && order.currentStatusId);
    return () => {};
  }, [order]);

  if (!order) return null;

  return (
    <Modal isOpen={true} centered={true}>
      <ModalHeader>{formatMessage(messages.changeStatus)}</ModalHeader>
      <ModalBody>
        <Spinner show={loading} />
        {statuses.map(function (status) {
          return (
            <>
              <Button
                onClick={changeStatusHandler}
                color={status.id === actualStatus ? 'primary' : 'secondary'}
                value={status.id}
              >
                {status.name}
              </Button>
              <br />
            </>
          );
        })}
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

export function StateButtons({
  onOptionChanged,
  list,
  currentOptions,
  label,
  propertyName,
  name,
  inGroup,
}) {
  if (!list || !currentOptions) {
    return null;
  }
  return list.map(function (option) {
    const isSelected = !!currentOptions.find(function (opt) {
      return opt === option[propertyName];
    });
    const button = (
      <Button
        key={Math.random()}
        onClick={
          name
            ? onOptionChanged.bind(
                {},
                { target: { name, value: option[propertyName] } }
              )
            : onOptionChanged.bind({}, option)
        }
        color={isSelected ? 'primary' : 'secondary'}
      >
        {option[label]}
      </Button>
    );
    return inGroup ? (
      button
    ) : (
      <span key={Math.random()}>{button}&nbsp;&nbsp;</span>
    );
  });
}

export default function OrderDetail({ isReadOnly }) {
  const {
    event: {
      data: {
        orders: completeOrders,
        id: eventId,
        transaction: { currentStatusId },
        deliveryCost,
        coupon,
      },
      data,
      update: updateEvent,
      refresh: refreshEvent,
    },
    metadata: { data: metadata },
  } = useContext(EventContext);

  const { orderStatuses } = metadata;
  const [couponCode, setCouponCode] = useState('');

  const { formatMessage } = useIntl();
  const [orderSelected, setOrderSelected] = useState(null);
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [statusHistoryOrderId, setStatusHistoryOrderId] = useState(null);
  const [orderStatusFilters, setOrderStatusFilters] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const statusFilters = orderStatuses || [];
    setOrderStatusFilters(
      statusFilters.map(function (s) {
        return s.id;
      })
    );
    return () => {};
  }, [orderStatuses]);
  useEffect(() => {
    setOrders(completeOrders || []);
    return () => {};
  }, [completeOrders]);

  function goToCreateOrder() {
    history.push(ROUTES.event.newOrder.replace(':eventId', eventId));
  }

  function showModalChangeStatus(eventId) {
    setOrderSelected(eventId);
  }

  function changeStatusCancelHandler() {
    setOrderSelected(null);
  }
  function changeStatusHandler(newStatus) {
    return orderHttp.orderHttp
      .updateOrderStatus(`${orderSelected.id}/${newStatus}`)
      .then(function () {
        refreshEvent();
      });
  }
  function orderStatusChangedHandler({ id }) {
    const status = orderStatusFilters.find(function (status) {
      return status === id;
    });
    if (status) {
      setOrderStatusFilters([
        ...orderStatusFilters.filter(function (s) {
          return s !== id;
        }),
      ]);
    } else {
      setOrderStatusFilters([...orderStatusFilters, id]);
    }
  }

  function filteredOrders() {
    if (!orderStatusFilters || !orderStatusFilters.length) {
      return [...orders];
    }
    return [
      ...orders.filter(function (order) {
        return orderStatusFilters.includes(order.currentStatusId);
      }),
    ];
  }

  function couponCodeSearch() {
    dispatch(addSpinner('Load_Coupon'));
    couponHttp.getByCode(couponCode).then(function (coupon) {
      if (!coupon) {
        toast.error(formatMessage(messages.couponNotFound));
      } else {
        updateEvent({
          ...data,
          couponId: coupon.id,
          coupon,
          couponDiscountAmount: calculateDiscount(data.totalAmount, coupon),
        });
      }
      dispatch(removeSpinner('Load_Coupon'));
    });
  }

  function couponCodeChangeHandler({ target: { value } }) {
    setCouponCode(value);
  }

  const orderList = filteredOrders();

  function calculateTotalOrder() {
    orderList.forEach(function (order) {
      const currentSubtotal =
      (order.orderExtras||[]).reduce(calculateDetailSubtotal, 0) +
        order.orderItems.reduce(calculateDetailSubtotal, 0);
      order.subTotal = currentSubtotal;
    });

    return data.totalAmount - data.couponDiscountAmount + data.deliveryCost;
  }

  function calculateDiscount(total, coupon) {
    if (!coupon || coupon.minAmount > data.total) return 0;
    if (coupon.discountType === 2) return coupon.amount;
    return (total * coupon.amount) / 100;
  }
  const total = calculateTotalOrder() + deliveryCost;

  function showModalHistoryStatus(order) {
    setStatusHistoryOrderId(order);
  }

  function clearModalStatusHistory() {
    setStatusHistoryOrderId(null);
  }

  return (
    <>
      <ChangeStatusModal
        onChangeStatus={changeStatusHandler}
        order={orderSelected}
        onChangeStatusCancel={changeStatusCancelHandler}
        statuses={orderStatuses}
      />
      <ModalStatusHistory
        order={statusHistoryOrderId}
        onCloseClick={clearModalStatusHistory}
      />
      <Row>
        <Col>
          <h3>{formatMessage(messages.orders)}</h3>
        </Col>
        <Col>
          {eventId && !isReadOnly && !currentStatusId && (
            <Button
              onClick={goToCreateOrder}
              color="primary"
              className="float-right"
            >
              {formatMessage(messages.addOrder)}
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>{formatMessage(globalMessages.filter)}</h3>
          <br />
          <StateButtons
            list={orderStatuses}
            currentOptions={orderStatusFilters}
            label={'name'}
            propertyName={'id'}
            onOptionChanged={orderStatusChangedHandler}
          />
        </Col>
      </Row>
      <DataTable
        columns={generateOrderColumns({
          formatMessage,
          metadata,
          showModalChangeStatus,
          showModalHistoryStatus,
        })}
        data={orderList}
        className="stripped-data-table"
        pagination
        expandableRows
        expandableRowsComponent={<LineOrder />}
      />
      <Label>{formatMessage(messages.deliveryCost)}:</Label>
      <span>
        {formatMessage(globalMessages.currency)}&nbsp;{deliveryCost}
      </span>
      <hr />
      <Row>
        <Col xs={{ size: 4, offset: 6 }}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              {formatMessage(messages.couponCode)}
            </InputGroupAddon>
            <Input value={couponCode} onChange={couponCodeChangeHandler} />
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                onClick={couponCodeSearch}
                color={'primary'}
              >
                {formatMessage(messages.searchLabel)}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        {coupon && (
          <Col xs={{ size: 2 }}>
            <span>
              Descuento:{coupon.amount}
              {coupon.type === 2 ? formatMessage(globalMessages.currency) : '%'}
            </span>
            <br />
            <span>
              Consumo Minimo:&nbsp;{coupon.minAmount}
              {formatMessage(globalMessages.currency)}
            </span>
          </Col>
        )}
      </Row>
      <hr />

      <Row>
        <Col xs={{ size: 1, offset: 11 }}>
          <Label>{formatMessage(messages.total)}:</Label>
          {formatMessage(globalMessages.currency)}&nbsp;{total}
        </Col>
      </Row>
    </>
  );
}
