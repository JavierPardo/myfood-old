import React from 'react';
import { Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { useState } from 'react';
import { UploadImage } from '../../Forms';
import { useIntl } from 'react-intl';
import messages from './messages';
import { useContext } from 'react';
import OrderContext from '../../contexts/OrderContext/OrderContext';
import { useEffect } from 'react';
import Select from '../../components/Select';
import { imageToFile } from '../../utils';

const paymentMethodInitialState = {
  transactionImage: '',
  reference: '',
  methodType: '',
};

export default function Payment() {
  const [methodType, setMethodType] = useState();
  const { formatMessage } = useIntl();

  const {
    order: { data: order, update: updateOrder },
  } = useContext(OrderContext);
  const [currentMethod, setCurrentMethod] = useState({
    ...paymentMethodInitialState,
  });

  const paymentTypes = [
    {
      key: 'delivery',
      value: 'delivery',
      label: formatMessage(messages.payment.delivery),
    },
    {
      key: 'cash',
      value: 'cash',
      label: formatMessage(messages.payment.cashPayment),
    },
    {
      key: 'transfer',
      value: 'transfer',
      label: formatMessage(messages.payment.transference),
    },
    {
      key: 'todotix',
      value: 'todotix',
      label: formatMessage(messages.payment.todotix),
    },
  ];

  useEffect(() => {
    setCurrentMethod(order.payment || { ...paymentMethodInitialState });
    if (order.payment && order.payment.methodType) {
      const methodTypeSelected = paymentTypes.find(
        (pt) => pt.key === order.payment.methodType
      );
      if (methodTypeSelected) {
        setMethodType(methodTypeSelected);
      }
    }
    return () => {};
  }, [order.payment]);

  const paymentMethodChangedHandler = function ({
    target: { id, name, value, type, checked },
  }) {
    currentMethod[name] = type === 'checkbox' ? checked : value;
    setCurrentMethod({ ...currentMethod });
  };

  const saveMethodPayment = function () {
    order.payment = { ...currentMethod };
    updateOrder({ ...order });
  };
  const { transactionImage, reference, transactionConfirmed } = currentMethod;
  return (
    <>
      <Row>
        <Col xs={{ size: 4, offset: 4 }}>
          <h4>{formatMessage(messages.payment.main)}</h4>
          <label htmlFor="method">
            {formatMessage(messages.payment.method)}
          </label>

          <Select
            fluid
            name="methodType"
            onChange={function (value, control) {
              setMethodType(value);
              control.value = value.value;
              paymentMethodChangedHandler({ target: control });
            }}
            value={methodType}
            options={paymentTypes}
          />
          <label htmlFor="reference">
            {formatMessage(messages.payment.reference)}
          </label>
          <Input
            name="reference"
            onChange={paymentMethodChangedHandler}
            value={reference}
          />
          <label htmlFor="transactionImage">
            {formatMessage(messages.payment.transactionImage)}
          </label>

          <UploadImage
            name="transactionImage"
            uploadMessage={formatMessage(messages.imageFieldLabel)}
            onSelect={(files) => {
              files[0].convertToBase64(function (imageByteArray) {
                const target = {
                  value: imageByteArray,
                  name: 'transactionImage',
                };
                paymentMethodChangedHandler({ target });
              });
            }}
            values={transactionImage ? [imageToFile(transactionImage)] : []}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ offset: 5, size: 2 }}>
          <CustomInput
            type="switch"
            id={'transactionConfirmed'}
            name="transactionConfirmed"
            key={'transactionConfirmed'}
            value={transactionConfirmed}
            checked={transactionConfirmed}
            label={formatMessage(messages.payment.transactionConfirmed)}
            onClick={paymentMethodChangedHandler}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={{ offset: 5, size: 2 }}>
          <Button onClick={saveMethodPayment} color="primary">
            {formatMessage(messages.payment.saveMethod)}
          </Button>
        </Col>
      </Row>
    </>
  );
}
