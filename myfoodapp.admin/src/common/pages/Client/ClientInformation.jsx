import React from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  FormGroup,
} from 'reactstrap';
import ContentWrapper from '../../../examples/components/Layout/ContentWrapper';
import { withRouter } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import branchHttp from '../../../services/http/branchHttp';
import { GMap2 } from '../../Common/GMap';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { UploadImage } from '../../Forms';
import { StateButtons } from '../Event/OrderDetail';
import { eventTypeHttp, logisticProviderHttp } from '../../../services/http';
import Select from '../../../common/components/Select';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { useDispatch } from 'react-redux';

function ClientInformation() {
  const [information, setInformation] = useState({
    clientName: '',
    branchName: '',
    nit: '',
    phone: '',
    coordinates: {},
  });
  const dispatch = useDispatch();
  const [metadata, setMetadata] = useState({
    eventTypes: [],
    logisticProviders: [],
  });
  const [location, setLocation] = useState(null);
  const [formChanged, setFormChanged] = useState(false);
  const { formatMessage } = useIntl();

  useEffect(() => {
    reloadData();
    return () => {};
  }, []);

  const informationChangeHandler = function ({ target: { name, value } }) {
    information[name] = value;
    const newInformation = { ...information };
    setInformation(newInformation);
    setFormChanged(true);
  };

  const submitHandler = function (e) {
    e.preventDefault();
    dispatch(addSpinner('SUBMIT_CLIENT_DATA'));
    information.coordinates = JSON.stringify(location);
    branchHttp
      .saveInformation(information)
      .then(function () {
        toast.success(formatMessage(messages.updateSuccess));
        setFormChanged(false);
      })
      .then(function () {
        dispatch(removeSpinner('SUBMIT_CLIENT_DATA'));
      });
  };

  function loadLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      const _location = { lat, lng };
      setLocation({ ..._location });
    });
  }

  const selectedLocationHandler = function (location) {
    setFormChanged(true);
    setLocation({ ...location });
  };

  const reloadData = function () {
    dispatch(
      addSpinner('LOAD_CLIENT_DATA', formatMessage(messages.loadProfileCompany))
    );
    Promise.all([
      branchHttp.getCurrent(),
      eventTypeHttp.getEventTypes(),
      logisticProviderHttp.getAllByBranch(),
    ])
      .then(function ([clientInformation, eventTypes, logisticProviders]) {
        setMetadata({
          eventTypes,
          logisticProviders: logisticProviders.map(function (lp) {
            return { value: lp.id, label: lp.name };
          }),
        });
        if (
          clientInformation.coordinates &&
          clientInformation.coordinates !== 'null'
        ) {
          setLocation(JSON.parse(clientInformation.coordinates));
        } else {
          loadLocation();
        }
        setInformation(clientInformation);
        setFormChanged(false);
      })
      .then(function () {
        dispatch(removeSpinner('LOAD_CLIENT_DATA'));
      });
  };

  const branchEventTypesChanged = function ({ target }) {
    let eventTypes = information[target.name] || [];
    if (
      eventTypes.find(function (e) {
        return e.eventTypeId === target.value;
      })
    ) {
      eventTypes = eventTypes.filter(function (e) {
        return e.eventTypeId !== target.value;
      });
    } else {
      eventTypes = [...eventTypes, { eventTypeId: target.value }];
    }
    setFormChanged(true);
    setInformation({ ...information, [target.name]: eventTypes });
  };

  const selectedEventTypes = (information.branchesEventTypes || []).map(
    function (eventType) {
      return eventType.eventTypeId;
    }
  );

  const logisticProviderSelected = metadata.logisticProviders.find(function (
    lp
  ) {
    return (
      information.logisticProviderDefault &&
      information.logisticProviderDefault.id === lp.value
    );
  });

  return (
    <ContentWrapper>
      <Form onSubmit={submitHandler}>
        <div className="content-heading">
          {formatMessage(messages.informationClient)}
          <div className="ml-auto">
            {formChanged && (
              <>
                <Button color="primary" type="submit">
                  <em className="fas fa-save"></em>&nbsp;
                  {formatMessage(globalMessages.saveButton)}
                </Button>
                <Button color="primary" type="button" onClick={reloadData}>
                  {formatMessage(globalMessages.cancelAction)}
                </Button>
              </>
            )}
          </div>
        </div>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col xs={{ size: 3 }}>
                    <UploadImage
                      base64
                      uploadMessage={formatMessage(messages.logoUrl)}
                      onSelect={function (files) {
                        informationChangeHandler({
                          target: { name: 'logoUrl', value: files[0] },
                        });
                      }}
                      values={information.logoUrl ? [information.logoUrl] : []}
                    ></UploadImage>
                  </Col>
                  <Col xs={{ size: 9 }}>
                    <FormGroup>
                      <label htmlFor="name">
                        {formatMessage(messages.legalName)}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        className="no-spin-button"
                        value={information.clientName}
                        name="clientName"
                        onChange={informationChangeHandler}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="branchName">
                        {formatMessage(messages.branchName)}
                      </label>
                      <Input
                        type="text"
                        className="no-spin-button"
                        value={information.branchName}
                        name="branchName"
                        id="branchName"
                        onChange={informationChangeHandler}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="nit">
                        {formatMessage(messages.idBussiness)}
                      </label>
                      <Input
                        type="number"
                        className="no-spin-button"
                        value={information.nit}
                        name="nit"
                        id="nit"
                        onChange={informationChangeHandler}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardBody>
                <FormGroup>
                  <label htmlFor="phone">
                    {formatMessage(messages.telephone)}
                  </label>
                  <Input
                    type="number"
                    className="no-spin-button"
                    value={information.phone}
                    name="phone"
                    id="phone"
                    onChange={informationChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="whatsapp">
                    {formatMessage(messages.whatsapp)}
                  </label>
                  <Input
                    type="number"
                    className="no-spin-button"
                    value={information.whatsapp}
                    name="whatsapp"
                    id="whatsapp"
                    onChange={informationChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="mobilePhone">
                    {formatMessage(messages.cellphone)}
                  </label>
                  <Input
                    type="number"
                    className="no-spin-button"
                    value={information.mobilePhone}
                    name="mobilePhone"
                    id="mobilePhone"
                    onChange={informationChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="email">{formatMessage(messages.email)}</label>
                  <Input
                    type="email"
                    className="no-spin-button"
                    value={information.email}
                    name="email"
                    id="email"
                    onChange={informationChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="website">{formatMessage(messages.web)}</label>
                  <Input
                    type="url"
                    className="no-spin-button"
                    value={information.website}
                    name="website"
                    id="website"
                    onChange={informationChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="branchesEventTypes">
                    {formatMessage(messages.eventTypes)}
                  </label>
                  <br />
                  <StateButtons
                    name="branchesEventTypes"
                    label="name"
                    onOptionChanged={branchEventTypesChanged}
                    list={metadata.eventTypes}
                    currentOptions={selectedEventTypes}
                    inGroup={true}
                    propertyName="id"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="logisticProviderDefault">
                    {formatMessage(messages.logisticProviderDefault)}
                  </label>
                  <Select
                    isClearable
                    options={metadata.logisticProviders}
                    onChange={function (selected) {
                      setFormChanged(true);
                      if (!selected) {
                        setInformation({
                          ...information,
                          logisticProviderDefault: null,
                        });
                        return;
                      }
                      const { value } = selected;
                      setInformation({
                        ...information,
                        logisticProviderDefault: { id: value },
                      });
                    }}
                    value={logisticProviderSelected}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <CardBody>
                      <UploadImage
                        base64
                        uploadMessage={formatMessage(messages.bannerUrl)}
                        onSelect={function (files) {
                          informationChangeHandler({
                            target: { name: 'bannerUrl', value: files[0] },
                          });
                        }}
                        values={
                          information.bannerUrl ? [information.bannerUrl] : []
                        }
                      />
                      <FormGroup>
                        <label htmlFor="address">
                          {formatMessage(messages.address)}
                        </label>
                        <Input
                          type="textarea"
                          className="no-spin-button"
                          value={information.address}
                          name="address"
                          id="address"
                          onChange={informationChangeHandler}
                        />
                      </FormGroup>
                      {location && (
                        <FormGroup>
                          <label>{formatMessage(messages.location)}</label>
                          <GMap2
                            mapCenter={location}
                            onAddMapPosition={selectedLocationHandler}
                            markers={[location]}
                          ></GMap2>
                        </FormGroup>
                      )}
                    </CardBody>
                  </Col>
                </Row>
                <Row></Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </ContentWrapper>
  );
}

export default withRouter(ClientInformation);
