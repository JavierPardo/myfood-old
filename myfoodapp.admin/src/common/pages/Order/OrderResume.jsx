import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import { useContext } from 'react';
import OrderContext from '../../contexts/OrderContext/OrderContext';
import ItemsDetail from './ItemsDetail';
import { Jumbotron } from 'reactstrap';
import { FrameImage } from '../../Forms/UploadImage';
import { imageToFile } from '../../utils';

export default function OrderResume() {
  const { formatMessage } = useIntl();
  const {
    order: { data: order }, //, update: updateOrder },
    //metadata: { data: metadata },
  } = useContext(OrderContext);
  const { customer } = order;
  return (
    <div>
      <h4>
        <b>{formatMessage(messages.customer.identificator)}</b>:&nbsp;
        {customer.id}
      </h4>
      <h4>
        <b>{formatMessage(messages.customer.name)}</b>:&nbsp;
        {customer.name}
      </h4>
      <Jumbotron>
        <ItemsDetail />
      </Jumbotron>
      <hr />
      <h2 className="h3">{formatMessage(messages.address.main)}</h2>
      <Jumbotron>
        <label>{formatMessage(messages.address.street)}:</label>&nbsp;
        <span>{order.customer && order.customer.address.street}</span>
        <br />
        <label>{formatMessage(messages.address.houseNumber)}:</label>&nbsp;
        <span>{order.customer && order.customer.address.street}</span>
        <br />
        <label>{formatMessage(messages.address.departament)}:</label>&nbsp;
        <span>{order.customer && order.customer.address.depto}</span>
        <br />
        <label>{formatMessage(messages.address.reference)}:</label>&nbsp;
        <span>{order.customer && order.customer.address.reference}</span>
        <br />
      </Jumbotron>
      <hr />
      <h2 className="h3">{formatMessage(messages.payment.main)}</h2>
      <Jumbotron>
        {order.payment &&
          Object.entries(order.payment).map(function (element) {
            if (element[0].toLocaleLowerCase().includes('image')) return null;
            if (element[1] && element[0] !== 'transactionConfirmed')
              return (
                <>
                  <label>{formatMessage(messages.payment[element[0]])}:</label>
                  &nbsp;
                  {element[1]}
                  <br />
                </>
              );
            return null;
          })}
        {order.payment && order.payment.transactionImage && (
          <FrameImage
            file={imageToFile(order.payment.transactionImage)}
            size={10}
          />
        )}
        {order.payment && order.payment.transactionConfirmed ? (
          <span className="text-success">
            <em className="fa fa-check-circle" />
          </span>
        ) : (
          <span className="text-danger">
            <em className="fa fa-times-circle" />
          </span>
        )}
        &nbsp;
        {formatMessage(messages.payment.transactionConfirmed)}
      </Jumbotron>
    </div>
  );
}
