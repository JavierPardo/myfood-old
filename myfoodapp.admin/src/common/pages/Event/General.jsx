import React from 'react';
import EventContext from '../../contexts/EventContext/EventContext';
import { useContext } from 'react';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Row,
  ButtonGroup,
  Input,
  Container,
} from 'reactstrap';

import classnames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import { UploadImage } from '../../Forms';

import { GMap2 } from '../../Common/GMap';
import { useEffect } from 'react';
import branchHttp from '../../../services/http/branchHttp';
import globalMessages from '../../globalMessages';
import { ModalContext } from '../../contexts/ModalContext';
import { toast } from 'react-toastify';
import { StateButtons } from './OrderDetail';
import { locationHttp } from '../../../services/http';
import { Spinner } from '../../components';

function Address({ isReadOnly }) {
  const { formatMessage } = useIntl();
  const [location, setLocation] = useState(null);
  const [centeredPosition, setCenteredPosition] = useState({ lat: 1, lng: 1 });
  const [branchLocation, setBranchLocation] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    event: { data: event, update: updateEvent },
    //metadata: { data: metadata },
  } = useContext(EventContext);
  const { customer = {} } = event.details;

  if (!customer.address) {
    customer.address = { street: '', number: '', houseNumber: '', depto: '' };
  }

  useEffect(() => {
    Promise.all([branchHttp.getCurrent()]).then(function ([{ coordinates }]) {
      if (location) setBranchLocation(JSON.parse(coordinates));
    });
    loadLocation();
    return () => {};
  }, []);

  useEffect(
    function () {
      if (event.destinationLocation && event.destinationLocation.coordinates) {
        setLocation({ ...event.destinationLocation.coordinates });
        setDeliveryDetails({
          deliveryDistanceKm: event.deliveryDistanceKm,
          deliveryCost: event.deliveryCost,
        });
        setCenteredPosition({ ...event.destinationLocation.coordinates });
      }
      return function () {};
    },
    [event.destinationLocation]
  );

  const loadLocation = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      setCenteredPosition({ lat, lng });
    });
  };

  const selectedLocationHandler = function (location) {
    setLocation({ ...location });
    setCenteredPosition({ ...location });
  };

  const calculateDistanceClickHandler = function () {
    setLoading(true);
    locationHttp
      .getDeliveryDetails(location)
      .then(function ({ deliveryCost, deliveryDistanceKm }) {
        setDeliveryDetails({ deliveryCost, deliveryDistanceKm });
        updateEvent({
          ...event,
          deliveryCost,
          deliveryDistanceKm,
          destinationLocation: {
            coordinates: { lat: location.lat, lng: location.lng },
          },
        });
      })
      .catch(function ({
        data: {
          ErrorResult: { message },
        },
      }) {
        let messageIntl;
        for (let prop in messages) {
          if (messages[prop].id === message) {
            messageIntl = messages[prop];
            break;
          }
        }
        toast.error(formatMessage(messageIntl));
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const addressChangedHandler = function ({ target: { name, value } }) {
    if (!customer.address) {
      customer.address = {};
    }
    customer.address[name] = value;
    updateEvent({ ...event, customer });
    //updateOrder({ ...order });
  };

  const { lat, lng } = centeredPosition;
  return (
    <Container>
      <Spinner show={loading} />
      <Row>
        <Col xs={{ size: 10, offset: 1 }}>
          <GMap2
            disabled={isReadOnly}
            mapCenter={{ lat, lng }}
            onAddMapPosition={selectedLocationHandler}
            markers={[location]}
          />
          {location && (
            <Button color="primary" onClick={calculateDistanceClickHandler}>
              {formatMessage(messages.address.calculateDistance)}
            </Button>
          )}
          {deliveryDetails && (
            <>
              <br />
              <label>{formatMessage(messages.deliveryDistance)}:</label>
              <span>&nbsp;{deliveryDetails.deliveryDistanceKm} Km</span>
              <br />
              <label>{formatMessage(messages.deliveryCost)}:</label>
              <span>
                {formatMessage(globalMessages.currency)}&nbsp;
                {deliveryDetails.deliveryCost}
              </span>
            </>
          )}
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
            disabled={isReadOnly}
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
            disabled={isReadOnly}
          />
        </Col>
        <Col xs={{ size: 3 }}>
          <label htmlFor="depto">
            {formatMessage(messages.address.department)}
          </label>
          <Input
            type="text"
            name="depto"
            value={customer.address.depto}
            disabled={isReadOnly}
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
            disabled={isReadOnly}
            value={customer.address.reference}
            onChange={addressChangedHandler}
          />
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

const steps = {
  eventType: 'eventType',
  client: 'client',
  payment: 'payment',
  address: 'address',
};

const stepNavitemStyle = {
  backgroundColor: '#fcfcfc',
};
export default function General({ isReadOnly }) {
  const {
    event: { data: event, update: updateEvent } = {},
    metadata: { data: metadata },
  } = useContext(EventContext);

  const { openModal, updateModalProps, closeModal } = useContext(ModalContext);
  const [activeStep, setActiveStep] = useState(steps.eventType);
  const { formatMessage } = useIntl();

  function toggleStep(step) {
    setActiveStep(step);
  }

  function changeEventType({ id: eventTypeId, deliverable }) {
    if (isReadOnly) {
      return;
    }
    updateEvent({ ...event, typeId: eventTypeId, eventType: { deliverable } });
  }

  function customerChangedHandler({ target: { name, value, type } }) {
    if (type === 'number' && !/^[0-9]/.test(value)) return;
    if (name === 'name' && !/[a-zA-Z,.\- ]/g.test(value)) return;
    customer[name] = value;
    updateEvent({ ...event, details: { ...details, customer } });
  }

  function confirmedPaymentChanged({ target: { name, value } }) {
    if (isReadOnly) {
      return;
    }
    updateModalProps({
      title: formatMessage(messages.confimationTransactionTitle),
      content: formatMessage(messages.confimationTransactionMessage),
      acceptLabel: formatMessage(globalMessages.yesButton),
      cancelLabel: formatMessage(globalMessages.noButton),
      onAccept: function () {
        closeModal();
        paymentMethodChangedHandler({ target: { name, value } });
      },
    });
    openModal();
  }

  function paymentMethodChangedHandler({ target: { name, value } }) {
    const { transaction, ...newEvent } = event;
    if (transaction.currentStatusId) {
      toast.error(formatMessage(messages.cannotChangePaymentInformation));
      return;
    }
    updateEvent({
      ...newEvent,
      transaction: { ...transaction, [name]: value },
    });
  }

  const { transaction, details, typeId } = event;
  const { deliverable } =
    metadata.eventTypes.find(function ({ id }) {
      return typeId == id;
    }) || {};
  const { customer = {} } = details;
  return (
    <>
      <Row>
        <Col xs="2">
          <Nav pills vertical={true}>
            <NavItem style={stepNavitemStyle}>
              <NavLink
                tag="div"
                className={classnames({
                  active: activeStep === steps.eventType,
                })}
                onClick={toggleStep.bind({}, steps.eventType)}
              >
                <h4 className="text-left my-3">
                  {formatMessage(messages.eventType)}
                </h4>
              </NavLink>
            </NavItem>
            <NavItem style={stepNavitemStyle}>
              <NavLink
                tag="div"
                className={classnames({
                  active: activeStep === steps.client,
                })}
                onClick={toggleStep.bind({}, steps.client)}
              >
                <h4 className="text-left my-3">
                  {formatMessage(messages.client)}
                </h4>
              </NavLink>
            </NavItem>
            <NavItem style={stepNavitemStyle}>
              <NavLink
                tag="div"
                className={classnames({
                  active: activeStep === steps.payment,
                })}
                onClick={toggleStep.bind({}, steps.payment)}
              >
                <h4 className="text-left my-3">
                  {formatMessage(messages.payment.main)}
                </h4>
              </NavLink>
            </NavItem>
            <NavItem style={stepNavitemStyle}>
              <NavLink
                hidden={!deliverable}
                tag="div"
                className={classnames({
                  active: activeStep === steps.address,
                })}
                onClick={toggleStep.bind({}, steps.address)}
              >
                <h4 className="text-left my-3">
                  {formatMessage(messages.address)}
                </h4>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xs="8">
          <TabContent activeTab={activeStep} className="border-0">
            <TabPane tabId={steps.eventType}>
              <ButtonGroup>
                {metadata.eventTypes.map(function (eventType) {
                  return (
                    <Button
                      key={Math.random()}
                      color={
                        event.typeId === eventType.id ? 'primary' : 'secondary'
                      }
                      onClick={changeEventType.bind({}, eventType)}
                    >
                      {eventType.name}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </TabPane>
            <TabPane tabId={steps.client}>
              <Row>
                <Col xs={{ size: 6, offset: 3 }}>
                  <label htmlFor="id">
                    {formatMessage(messages.customer.identificator)}
                  </label>
                  <Input
                    type="number"
                    name="id"
                    disabled={isReadOnly}
                    value={customer.id}
                    onChange={customerChangedHandler}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={{ size: 6, offset: 3 }}>
                  <label htmlFor="name">
                    {formatMessage(messages.customer.name)}
                  </label>
                  <Input
                    type="text"
                    disabled={isReadOnly}
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
                    disabled={isReadOnly}
                    name="email"
                    value={customer.email}
                    onChange={customerChangedHandler}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId={steps.payment}>
              <Row>
                <Col xs={{ size: 6, offset: 3 }}>
                  <h4>{formatMessage(messages.payment.main)}</h4>
                  {/* <label htmlFor="method">
                    {formatMessage(messages.payment.method)}
                  </label>

                  <Select
                    fluid
                    name="methodType"
                    onChange={function (value, control) {
                      //setMethodType(value);
                      control.value = value.value;
                      paymentMethodChangedHandler({ target: control });
                    }}
                    value={methodType}
                    options={paymentTypes}
                  /> */}
                  <label htmlFor="reference">
                    {formatMessage(messages.payment.reference)}
                  </label>
                  <Input
                    name="notes"
                    disabled={isReadOnly}
                    onChange={paymentMethodChangedHandler}
                    value={transaction.notes}
                  />
                  <label htmlFor="transactionImage">
                    {formatMessage(messages.payment.transactionImage)}
                  </label>

                  <UploadImage
                    base64
                    disabled={isReadOnly}
                    uploadMessage={formatMessage(messages.imageFieldLabel)}
                    onSelect={(files) =>
                      paymentMethodChangedHandler({
                        target: { value: files[0], name: 'imageReference' },
                      })
                    }
                    values={
                      transaction.imageReference
                        ? [transaction.imageReference]
                        : []
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={{ size: 6, offset: 3 }}>
                  <ButtonGroup>
                    <StateButtons
                      name="currentStatusId"
                      label="name"
                      onOptionChanged={confirmedPaymentChanged}
                      list={metadata.transactionStatuses}
                      currentOptions={[transaction.currentStatusId]}
                      inGroup={true}
                      propertyName="id"
                    />
                  </ButtonGroup>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs={{ offset: 5, size: 2 }}></Col>
              </Row>
            </TabPane>
            <TabPane tabId={steps.address}>
              <Address isReadOnly={isReadOnly} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </>
  );
}
