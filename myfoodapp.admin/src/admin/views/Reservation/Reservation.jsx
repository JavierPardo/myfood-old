import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import get from 'lodash/get';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';
import * as moment from 'moment';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName } from './ReservationHandler';
import {
  constants as formConstants,
  InlineField,
  DatePicker,
  Select,
} from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.DATE_TIME]: yup
      .date()
      .required()
      .label(formatMessage(messages.reservationDateFieldLabel)),
    [fieldsName.GUESTS]: yup
      .number()
      .required()
      .label(formatMessage(messages.guestsFieldLabel)),
    [fieldsName.NOTES]: yup
      .string()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.notesFieldLabel)),
  })
);

const buildActionButtons = memoize(
  (formatMessage, goBack, handleSubmit, isEdit, isReadOnly) => {
    const saveBtn = {
      label: formatMessage(
        isEdit ? globalMessages.updateButton : globalMessages.saveButton
      ),
      icon: 'fa-save',
      style: 'btn-primary',
      onClick: handleSubmit,
    };

    const backBtn = {
      label: formatMessage(globalMessages.backButton),
      icon: 'fa-arrow-left',
      style: 'btn-secondary',
      onClick: goBack,
    };

    return isReadOnly ? [backBtn] : [backBtn, saveBtn];
  }
);

const Reservation = ({
  loading,
  isEdit,
  initValues,
  saveReservation,
  goBack,
  statusList,
  specialEvents,
  sendWhatsapp,
  sendEmail,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();
  const { yup } = useContext(TranslationContext);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initValues,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: saveReservation,
    enableReinitialize: true,
  });

  const buttons = buildActionButtons(
    formatMessage,
    goBack,
    handleSubmit,
    isEdit,
    isReadOnly
  );

  return (
    <ContentWrapper>
      <PageHeader
        title={formatMessage(
          isReadOnly
            ? messages.previewTitle
            : isEdit
            ? messages.editTitle
            : messages.createTitle
        )}
        buttons={buttons}
      />
      <div className="row">
        <div className="col-lg-6">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardHeader>
              <CardTitle tag="h3">Datos Reserva</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="form-horizontal">
                {isEdit && (
                  <InlineField
                    labelText={formatMessage(messages.recordDateFieldLabel)}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      value={values[fieldsName.RECORD_DATE]}
                      disabled
                    />
                  </InlineField>
                )}
                <InlineField
                  labelText={formatMessage(messages.reservationDateFieldLabel)}
                  labelRequired
                  error={
                    touched[fieldsName.DATE_TIME] &&
                    errors[fieldsName.DATE_TIME]
                  }
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    time="hh:mm a"
                    value={values[fieldsName.DATE_TIME]}
                    minDate={moment()}
                    onChange={(date) =>
                      setFieldValue(fieldsName.DATE_TIME, date)
                    }
                    invalid={Boolean(
                      touched[fieldsName.DATE_TIME] &&
                        errors[fieldsName.DATE_TIME]
                    )}
                    disabled={isEdit}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.guestsFieldLabel)}
                  error={
                    touched[fieldsName.GUESTS] && errors[fieldsName.GUESTS]
                  }
                  labelRequired
                >
                  <Input
                    type="number"
                    name={fieldsName.GUESTS}
                    onChange={handleChange}
                    value={values[fieldsName.GUESTS]}
                    onBlur={handleBlur}
                    disabled={isEdit}
                    invalid={Boolean(
                      touched[fieldsName.GUESTS] && errors[fieldsName.GUESTS]
                    )}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.specialEventFieldLabel)}
                >
                  <Select
                    name={fieldsName.SPECIAL_EVENT_ID}
                    value={values[fieldsName.SPECIAL_EVENT_ID]}
                    onChange={handleChange}
                    options={specialEvents}
                    disabled={isEdit}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.statusFieldLabel)}
                >
                  <Select
                    name={fieldsName.STATUS_ID}
                    value={values[fieldsName.STATUS_ID]}
                    onChange={handleChange}
                    options={statusList}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.notesFieldLabel)}
                  error={errors[fieldsName.NOTES]}
                >
                  <Input
                    type="textarea"
                    name={fieldsName.NOTES}
                    onChange={handleChange}
                    value={values[fieldsName.NOTES]}
                    invalid={Boolean(errors[fieldsName.NOTES])}
                    disabled={isReadOnly}
                  />
                </InlineField>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6">
          {isEdit && (
            <Card className="card-default">
              <Spinner show={loading} />
              <CardHeader>
                <CardTitle tag="h3">Datos Persona</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="form-horizontal">
                  <InlineField
                    labelText={formatMessage(messages.userFirstNameFieldLabel)}
                  >
                    <Input
                      type="text"
                      name={fieldsName.USER_FIRST_NAME}
                      value={get(values, fieldsName.USER_FIRST_NAME, '')}
                      disabled
                    />
                  </InlineField>
                  <InlineField
                    labelText={formatMessage(messages.userLastNameFieldLabel)}
                  >
                    <Input
                      type="text"
                      name={fieldsName.USER_LAST_NAME}
                      value={get(values, fieldsName.USER_LAST_NAME, '')}
                      disabled
                    />
                  </InlineField>
                  <InlineField
                    labelText={formatMessage(messages.userPhoneFieldLabel)}
                    wrapInGroup
                  >
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button
                          size="xs"
                          color="success"
                          onClick={() =>
                            sendWhatsapp(get(values, fieldsName.USER_PHONE))
                          }
                          disabled={!get(values, fieldsName.USER_PHONE)}
                        >
                          <em className="fa-2x fab fa-whatsapp" />
                        </Button>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name={fieldsName.USER_PHONE}
                        value={get(values, fieldsName.USER_PHONE, '')}
                        disabled
                      />
                    </InputGroup>
                  </InlineField>
                  <InlineField
                    labelText={formatMessage(messages.userEmailFieldLabel)}
                  >
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button
                          size="xs"
                          color="info"
                          onClick={() =>
                            sendEmail(get(values, fieldsName.USER_EMAIL))
                          }
                          disabled={!get(values, fieldsName.USER_EMAIL)}
                        >
                          <em className="fa-2x far fa-envelope" />
                        </Button>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name={fieldsName.USER_EMAIL}
                        value={get(values, fieldsName.USER_EMAIL, '')}
                        disabled
                      />
                    </InputGroup>
                  </InlineField>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

Reservation.propTypes = {
  loading: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  saveReservation: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  statusList: PropTypes.array,
  specialEvents: PropTypes.array,
  sendWhatsapp: PropTypes.func,
  sendEmail: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

export default Reservation;
