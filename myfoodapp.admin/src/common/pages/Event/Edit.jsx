import React from 'react';
import useEventEdit from './useEventEdit';
import messages from './messages';
import { ContentWrapper, PageHeader } from '../../components';
import globalMessages from '../../globalMessages';
import {
  Card,
  CardBody,
  Form,
  Nav,
  NavItem,
  Jumbotron,
  TabContent,
  TabPane,
  NavLink,
} from 'reactstrap';
import { useState } from 'react';

import classnames from 'classnames';
import EventProvider from '../../contexts/EventContext/EventProvider';
import General from './General';
import OrderDetail from './OrderDetail';

function Edit({ isReadOnly }) {
  const {
    title,
    event,
    formatMessage,
    handleSubmit,
    goToList,
    isEdit,
    refresh,
  } = useEventEdit();

  const [activeStep, setActiveStep] = useState('general');

  // const { formatMessage } = useIntl();

  const canSave = checkSaveRequirements();
  const buttons = [
    {
      label: formatMessage(globalMessages.backButton),
      icon: 'fa-arrow-left',
      style: 'btn-secondary',
      onClick: goToList,
    },
    {
      label: formatMessage(
        isEdit ? globalMessages.updateButton : globalMessages.saveButton
      ),
      icon: 'fa-save',
      style: 'btn-primary',
      disabled: !canSave,
      onClick: handleSubmit,
      isHidden: isReadOnly,
    },
  ];

  const stepNavitemStyle = {
    backgroundColor: '#fcfcfc',
  };

  const toggleStep = (currentStep) => () => {
    setActiveStep(currentStep);
  };

  function checkSaveRequirements() {
    return !!event && !!event.typeId;
  }

  return (
    <ContentWrapper>
      <Form name="formWizard" onSubmit={handleSubmit}>
        <PageHeader title={title} buttons={buttons} />
        <Card className="">
          <CardBody>
            <Nav pills justified={true}>
              <NavItem style={stepNavitemStyle}>
                <NavLink
                  tag="div"
                  className={classnames({
                    active: activeStep === 'general',
                  })}
                  onClick={toggleStep('general')}
                >
                  <h4 className="text-left my-3">
                    <em className="fa fa-list" /> &nbsp;
                    {formatMessage(messages.general)}
                    <br />
                  </h4>
                </NavLink>
              </NavItem>
              <NavItem style={stepNavitemStyle}>
                <NavLink
                  tag="div"
                  className={classnames({
                    active: activeStep === 'eventDetail',
                  })}
                  onClick={toggleStep('eventDetail')}
                >
                  <h4 className="text-left my-3">
                    <em className="fa fa-list" /> &nbsp;
                    {formatMessage(messages.orderDetail)}
                    <br />
                  </h4>
                </NavLink>
              </NavItem>
            </Nav>
            <Jumbotron>
              <TabContent
                activeTab={activeStep}
                style={{ borderStyle: 'none' }}
              >
                <TabPane id="general" tabId={'general'}>
                  <General isReadOnly={isReadOnly} />
                </TabPane>
                <TabPane id="eventDetail" tabId={'eventDetail'}>
                  {isEdit && <OrderDetail isReadOnly={isReadOnly} />}
                </TabPane>
              </TabContent>
            </Jumbotron>
          </CardBody>
        </Card>
      </Form>
    </ContentWrapper>
  );
}
export default function ({ isReadOnly }) {
  return (
    <EventProvider>
      <Edit isReadOnly={isReadOnly} />
    </EventProvider>
  );
}
