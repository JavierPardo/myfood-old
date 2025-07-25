import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col, Button, Container, NavLink, Input } from 'reactstrap';
import branchHttp from '../../../services/http/branchHttp';
import { useIntl } from 'react-intl';
import messages from './messages';
import { useContext } from 'react';
import OrderContext from '../../contexts/OrderContext/OrderContext';
import { GMap2 } from '../../Common/GMap';

export default function Address() {
  const { formatMessage } = useIntl();
  const [location, setLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [branchLocation, setBranchLocation] = useState(null);
  const {
    order: { data: order, update: updateOrder },
  } = useContext(OrderContext);
  const { customer } = order;

  if (!customer.address) {
    customer.address = { street: '', number: '', houseNumber: '', depto: '' };
  }

  useEffect(() => {
    Promise.all([branchHttp.getCurrent()]).then(function ([{ coordinates }]) {
      setBranchLocation(JSON.parse(coordinates));
    });
    loadLocation();
    return () => {};
  }, []);

  const loadLocation = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      const _location = { lat, lng };
      setLocation(_location);
    });
  };

  const selectedLocationHandler = function (location) {
    setCurrentLocation({ ...location });
  };

  const calculateDistanceClickHandler = function () {};

  const addressChangedHandler = function ({ target: { name, value } }) {
    if (!customer.address) {
      customer.address = {};
    }
    customer.address[name] = value;
    updateOrder({ ...order });
  };

  const linkLocation =
    currentLocation &&
    `http://maps.google.com/maps?&z=10&q=${currentLocation.lat}+${currentLocation.lng}&ll=${currentLocation.lat}+${currentLocation.lng}`;

  return (
    <Container>
      <Row>
        <Col xs={{ size: 10, offset: 1 }}>
          {currentLocation && (
            <Button color="primary" onClick={calculateDistanceClickHandler}>
              {formatMessage(messages.address.calculateDistance)}
            </Button>
          )}
          <h4>{formatMessage(messages.address.from)}:</h4>
          {JSON.stringify(branchLocation)}
          <h4>{formatMessage(messages.address.to)}:</h4>
          {JSON.stringify(currentLocation)}
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 6 }}>
          <label htmlFor="street">
            {formatMessage(messages.address.street)}
          </label>
          <Input
            type="text"
            name="street"
            value={customer.address.street}
            onChange={addressChangedHandler}
          />
        </Col>
        <Col xs={{ size: 3 }}>
          <label htmlFor="number">
            {formatMessage(messages.address.houseNumber)}
          </label>
          <Input
            type="text"
            name="number"
            value={customer.address.number}
            onChange={addressChangedHandler}
          />
        </Col>
        <Col xs={{ size: 3 }}>
          <label htmlFor="depto">
            {formatMessage(messages.address.departament)}
          </label>
          <Input
            type="text"
            name="depto"
            value={customer.address.depto}
            onChange={addressChangedHandler}
          />
        </Col>
        <Col xs={{ size: 12 }}>
          <label htmlFor="reference">
            {formatMessage(messages.address.reference)}
          </label>
          <Input
            type="textarea"
            name="reference"
            value={customer.address.reference}
            onChange={addressChangedHandler}
          />
        </Col>
      </Row>
      <Row>
        {currentLocation && (
          <Col xs={{ size: 2, offset: 5 }}>
            <h4>{formatMessage(messages.address.distance)}:</h4>

            <h4>{formatMessage(messages.address.link)}:</h4>

            <NavLink href={linkLocation}>
              {formatMessage(messages.address.calculateDistance)}
            </NavLink>
          </Col>
        )}
      </Row>
    </Container>
  );
}
