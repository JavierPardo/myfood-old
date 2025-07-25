import React from 'react';

import {
  TabPane,
  CardBody,
  Card,
  Form,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardFooter,
  Jumbotron,
} from 'reactstrap';

import { useState } from 'react';

import classnames from 'classnames';

import { useParams } from 'react-router';

import { useIntl } from 'react-intl';

import { PageHeader } from '../../components';
import { ROUTES } from '../../globalConstants';
import globalMessages from '../../globalMessages';
import ContentWrapper from '../../../examples/components/Layout/ContentWrapper';

import Address from './Address';
import ChoseFood from './ChoseFood';
import Customer from './Customer';
import Payment from './Payment';
import { useHistory } from 'react-router';
import messages from './messages';
import OrderProvider from '../../contexts/OrderContext/OrderProvider';
import OrderResume from './OrderResume';
import { orderHttp } from '../../../services/http/orderHttp';
import OrderContext from '../../contexts/OrderContext/OrderContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';

const stepNavitemStyle = {
  backgroundColor: '#fcfcfc',
};

function Edit() {
  const { orderId = '' } = useParams();
  const {
    order: { data: order }, //, update: updateOrder },
    metadata: { data: metadata }, //, update: updateMetadata },
  } = useContext(OrderContext);
  const isEdit = !!orderId;
  const [activeStep, setActiveStep] = useState(1);

  const { formatMessage } = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleStep = (currentStep) => () => {
    setActiveStep(currentStep);
  };

  const goBack = function () {
    history.push(ROUTES.order.list);
  };

  const saveOrder = function (orderData) {
    const savePromise = isEdit
      ? orderHttp.save(orderId, orderData)
      : orderHttp.create(orderData);

    savePromise
      .then(function () {
        goBack();
      })
      .finally(function () {
        dispatch(removeSpinner('save_editOrder'));
      });
  };
  const handleSubmit = function () {
    dispatch(addSpinner('save_editOrder'));
    saveOrder(order);
  };

  const buttons = [
    {
      label: formatMessage(globalMessages.backButton),
      icon: 'fa-arrow-left',
      style: 'btn-secondary',
      onClick: goBack,
    },
    {
      label: formatMessage(
        isEdit ? messages.editButton : messages.createButton
      ),
      icon: 'fa-save',
      style: 'btn-primary',
      onClick: handleSubmit,
    },
  ];

  return (
    <ContentWrapper>
      <Form name="formWizard" onSubmit={handleSubmit}>
        <PageHeader
          title={`${formatMessage(
            isEdit ? messages.editTitle : messages.createTitle
          )}${order.id && `:${order.id}`}`}
          buttons={buttons}
        />
        <Card className="">
          <CardBody>
            <Nav pills justified={true}>
              <NavItem style={stepNavitemStyle}>
                <NavLink
                  tag="div"
                  className={classnames({
                    active: activeStep === 1,
                  })}
                  onClick={toggleStep(1)}
                >
                  <h4 className="text-left my-3">
                    <em className="fa fa-list" /> &nbsp;
                    {formatMessage(messages.orderDetail.main)}
                    <br />
                    <small>Nam egestas, leo eu gravida tincidunt</small>
                  </h4>
                </NavLink>
              </NavItem>
              <NavItem style={stepNavitemStyle}>
                <NavLink
                  tag="div"
                  className={classnames({
                    active: activeStep === 2,
                  })}
                  onClick={toggleStep(2)}
                >
                  <h4 className="text-left my-3">
                    <em className="fa fa-car" /> &nbsp;
                    {formatMessage(messages.address.main)}
                    <br />
                    <small>Nam egestas, leo eu gravida tincidunt</small>
                  </h4>
                </NavLink>
              </NavItem>
              <NavItem style={stepNavitemStyle}>
                <NavLink
                  tag="div"
                  className={classnames({
                    active: activeStep === 3,
                  })}
                  onClick={toggleStep(3)}
                >
                  <h4 className="text-left my-3">
                    <em className="fa fa-address-card" /> &nbsp;
                    {formatMessage(messages.bill.main)}
                    <br />
                    <small>Nam egestas, leo eu gravida tincidunt</small>
                  </h4>
                </NavLink>
              </NavItem>
              <NavItem style={stepNavitemStyle}>
                <NavLink
                  tag="div"
                  className={classnames({
                    active: activeStep === 4,
                  })}
                  onClick={toggleStep(4)}
                >
                  <h4 className="text-left my-3">
                    <em className="fa fa-money-bill" /> &nbsp;
                    {formatMessage(messages.payment.main)}
                    <br />
                    <small>Nam egestas, leo eu gravida tincidunt</small>
                  </h4>
                </NavLink>
              </NavItem>
              <NavItem style={stepNavitemStyle}>
                <NavLink
                  tag="div"
                  className={classnames({
                    active: activeStep === 5,
                  })}
                  onClick={toggleStep(5)}
                >
                  <h4 className="text-left my-3">
                    <em className="fa fa-file-alt" /> &nbsp;
                    {formatMessage(messages.resume.main)}
                    <br />
                    <small>Nam egestas, leo eu gravida tincidunt</small>
                  </h4>
                </NavLink>
              </NavItem>
            </Nav>
            <Jumbotron>
              <TabContent
                activeTab={activeStep}
                style={{ borderStyle: 'none' }}
              >
                <TabPane id="tabPane1" tabId={1}>
                  <ChoseFood metadata={metadata} />
                </TabPane>
                <TabPane id="tabPane1" tabId={2}>
                  <Address />
                </TabPane>
                <TabPane id="tabPane1" tabId={3}>
                  <Customer />
                </TabPane>
                <TabPane id="tabPane1" tabId={4}>
                  <Payment />
                </TabPane>
                <TabPane id="tabPane1" tabId={5}>
                  <OrderResume />
                </TabPane>
              </TabContent>
            </Jumbotron>
          </CardBody>
          <CardFooter>
            <div className="content-heading">
              {activeStep !== 1 ? (
                <Button
                  color="primary"
                  type="button"
                  onClick={toggleStep(activeStep - 1)}
                >
                  <em className="fas fa-arrow-left" />
                  &nbsp;
                  {formatMessage(globalMessages.backButton)}
                </Button>
              ) : null}
              <div className="ml-auto">
                {activeStep !== 5 ? (
                  <Button
                    color="primary"
                    type="button"
                    onClick={toggleStep(activeStep + 1)}
                  >
                    {formatMessage(globalMessages.nextButton)}&nbsp;
                    <em className="fas fa-arrow-right" />
                  </Button>
                ) : null}
              </div>
            </div>
          </CardFooter>
        </Card>
      </Form>
    </ContentWrapper>
  );
}
export default function EditOrder() {
  return (
    <OrderProvider>
      <Edit />
    </OrderProvider>
  );
}
