import React from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import messages from './messages';
import { useIntl } from 'react-intl';
import OrderContext from '../../contexts/OrderContext/OrderContext';
import { useContext } from 'react';

export default function Customer() {
  const {
    order: { data: order, update: updateOrder },
  } = useContext(OrderContext);
  const { customer = {} } = order;

  const { formatMessage } = useIntl();

  const customerChangedHandler = function ({ target: { name, value, type } }) {
    if (type === 'number' && !/^[0-9]/.test(value)) return;
    if (name === 'name' && !/[a-zA-Z,.\- ]/g.test(value)) return;
    customer[name] = value;
    updateOrder({ ...order });
  };

  return (
    <Container>
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <label htmlFor="id">
            {formatMessage(messages.customer.identificator)}
          </label>
          <Input
            type="number"
            name="id"
            value={customer.id}
            onChange={customerChangedHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <label htmlFor="name">{formatMessage(messages.customer.name)}</label>
          <Input
            type="text"
            name="name"
            value={customer.name}
            onChange={customerChangedHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <label htmlFor="email">
            {formatMessage(messages.customer.email)}
          </label>
          <Input
            type="email"
            name="email"
            value={customer.email}
            onChange={customerChangedHandler}
          />
        </Col>
      </Row>
    </Container>
  );
}
