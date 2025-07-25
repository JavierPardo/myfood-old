import React from 'react';
import { Row, Col } from 'reactstrap';
import { useIntl } from 'react-intl';
import { useContext } from 'react';
import OrderContext from '../../contexts/OrderContext/OrderContext';
import messages from './messages';
import globalMessages from '../../globalMessages';

export default function ItemsDetail() {
  const {
    order: { data: order }, //, update: updateOrder },
    //metadata: { data: metadata },
  } = useContext(OrderContext);
  const { orderDetail } = order;
  const { formatMessage } = useIntl();

  const renderDetail = function ({
    name,
    quantity,
    description,
    currentPrice,
  }) {
    return (
      <Row>
        <Col>{name || description}</Col>
        <Col>{quantity}</Col>
        <Col>{currentPrice}</Col>
        <Col>{quantity * currentPrice}</Col>
      </Row>
    );
  };

  const calculateTotalPrice = function () {
    const total = orderDetail.reduce(function (pv, cv) {
      return pv + cv.quantity * cv.currentPrice;
    }, 0);

    return total;
  };

  return (
    <>
      <Row>
        <Col>{formatMessage(messages.orderDetail.description)}</Col>
        <Col>{formatMessage(messages.orderDetail.quantity)}</Col>
        <Col>{formatMessage(messages.orderDetail.unitPrice)}</Col>
        <Col>{formatMessage(messages.orderDetail.subtotal)}</Col>
      </Row>
      <hr />
      {orderDetail.map(renderDetail)}
      <hr />
      <Row>
        <Col>{formatMessage(messages.total)}</Col>
        <Col></Col>
        <Col></Col>
        <Col>
          {formatMessage(globalMessages.currency)}&nbsp;
          {calculateTotalPrice()}
        </Col>
      </Row>
    </>
  );
}
