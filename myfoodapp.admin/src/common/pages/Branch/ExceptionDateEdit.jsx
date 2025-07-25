import React from 'react';
import { ContentWrapper, PageHeader, Spinner } from '../../components';
import useExceptionDateEdit from './useExceptionDateEdit';
import globalMessages from '../../globalMessages';
import { useIntl } from 'react-intl';
import { Row, Col, CustomInput, Label, Button } from 'reactstrap';
import {
  constants as formConstants,
  InlineField,
  DatePicker,
} from '../../Forms';
import Select from '../../../common/components/Select';
import messages from './messages';
import { useContext } from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';
import { memoize } from 'lodash';
import { useFormik } from 'formik';
import * as moment from 'moment';
import Datetime from 'react-datetime';
import { useState } from 'react';
import index from '../Event/Index';

const services = [
  {
    label: 'Pedido',
    value: 'Pedido',
    id: 'Pedido',
  },
  {
    label: 'Reserva',
    value: 'Reserva',
    id: 'Reserva',
  },
];

const fieldsName = {
  SERVICE: 'service',
  IS_CLOSED: 'isClosed',
  EXCEPTION_DATE: 'exceptionDate',
  DEFINE_DATE: 'defineDate',
  TIME_START: 'timeStart',
  TIME_END: 'timeEnd',
  TIME_EXCEPTIONS: 'dateExceptions',
};
const exceptionTimeSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.TIME_START]: yup
      .date()
      .required()
      .label(formatMessage(messages.exceptionDate)),
    [fieldsName.TIME_END]: yup
      .date()
      .required()
      .when(
        [fieldsName.TIME_START],
        (startDate, schema) => startDate && schema.min(startDate)
      )
      .label(formatMessage(messages.exceptionDate)),
  })
);

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.EXCEPTION_DATE]: yup
      .date()
      .nullable()
      .when(fieldsName.DEFINE_DATE, {
        is: true,
        then: yup.date().required(),
        otherwise: yup.date().nullable(),
      })
      .label(formatMessage(messages.exceptionDate)),
    [fieldsName.DEFINE_DATE]: yup
      .bool()
      .label(formatMessage(messages.isClosedFieldName)),
    [fieldsName.IS_CLOSED]: yup
      .bool()
      .label(formatMessage(messages.isClosedFieldName)),
    [fieldsName.SERVICE]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.serviceFieldName)),
    [fieldsName.TIME_EXCEPTIONS]: yup.array().of(
      yup.object().shape({
        [fieldsName.TIME_START]: yup
          .date()
          .required()
          .label(formatMessage(messages.exceptionDate)),
        [fieldsName.TIME_END]: yup
          .date()
          .required()
          .when(
            [fieldsName.TIME_START],
            (startDate, schema) =>
              startDate &&
              schema.min(
                startDate,
                formatMessage(messages.timeBeginCannotBeLessThanEndDate)
              )
          )
          .label(formatMessage(messages.exceptionDate)),
      })
    ),
  })
);

export default function ExceptionDateEdit() {
  const {
    goToList,
    submit,
    isEdit,
    title,
    loading,
    exceptionDate,
  } = useExceptionDateEdit();
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
    initialValues: exceptionDate,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: submit,
    enableReinitialize: true,
  });

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
      onClick: handleSubmit,
    },
  ];
  const service = services.find(function (service) {
    return service.id === values[fieldsName.SERVICE];
  });

  // function defineChangeHandler({ target: { value } }) {
  //   onPreferenceValueChanged({ preferenceName, preferenceValue: value });
  // }

  function addTimeClickHandler() {
    values[fieldsName.TIME_EXCEPTIONS].push({
      [fieldsName.TIME_START]: moment(),
      [fieldsName.TIME_END]: moment(),
    });
    setFieldValue(fieldsName.TIME_EXCEPTIONS, [
      ...values[fieldsName.TIME_EXCEPTIONS],
    ]);
  }

  function removeTimeClickHandler(index) {
    values[fieldsName.TIME_EXCEPTIONS].splice(index, 1);
    setFieldValue(fieldsName.TIME_EXCEPTIONS, [
      ...values[fieldsName.TIME_EXCEPTIONS],
    ]);
  }

  function timeChangedHandler(index, timeException) {
    values[fieldsName.TIME_EXCEPTIONS][index] = { ...timeException };
    setFieldValue(fieldsName.TIME_EXCEPTIONS, [
      ...values[fieldsName.TIME_EXCEPTIONS],
    ]);
  }

  const canAdd = values[fieldsName.TIME_EXCEPTIONS].length < 3;
  const canRemove = values[fieldsName.TIME_EXCEPTIONS].length != 1;
  const { dateExceptions = [] } = errors;
  return (
    <ContentWrapper>
      <Spinner show={loading} />
      <PageHeader buttons={buttons} title={title} />
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <InlineField
            labelText={formatMessage(messages.serviceFieldName)}
            labelRequired={true}
            error={touched[fieldsName.SERVICE] && errors[fieldsName.SERVICE]}
          >
            <Select
              options={services}
              className={
                touched[fieldsName.SERVICE] && errors[fieldsName.SERVICE]
                  ? 'is-invalid'
                  : ''
              }
              value={service}
              onChange={function (select) {
                return setFieldValue(fieldsName.SERVICE, select.value);
              }}
            />
          </InlineField>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <InlineField
            labelText={formatMessage(messages.defineDate)}
            labelRequired={false}
          >
            <CustomInput
              type="switch"
              checked={values[fieldsName.DEFINE_DATE]}
              onClick={function () {
                setFieldValue(
                  fieldsName.DEFINE_DATE,
                  !values[fieldsName.DEFINE_DATE]
                );
              }}
              id="defineDate"
              name="defineDate"
            ></CustomInput>
          </InlineField>
        </Col>
      </Row>
      <Row hidden={!values[fieldsName.DEFINE_DATE]}>
        <Col xs={{ size: 6, offset: 3 }}>
          <InlineField
            labelText={formatMessage(messages.exceptionDate)}
            labelRequired={true}
            error={
              touched[fieldsName.EXCEPTION_DATE] &&
              errors[fieldsName.EXCEPTION_DATE]
            }
          >
            <DatePicker
              format={formatMessage(globalMessages.formatDateShort)}
              className={
                touched[fieldsName.EXCEPTION_DATE] &&
                errors[fieldsName.EXCEPTION_DATE]
                  ? 'is-invalid'
                  : ''
              }
              value={values[fieldsName.EXCEPTION_DATE]}
              onChange={function (date) {
                setFieldValue(fieldsName.EXCEPTION_DATE, date);
              }}
              invalid={
                touched[fieldsName.EXCEPTION_DATE] &&
                errors[fieldsName.EXCEPTION_DATE]
              }
            />
          </InlineField>
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <InlineField labelText={formatMessage(messages.isClosedFieldName)}>
            <CustomInput
              type={'switch'}
              onClick={function () {
                setFieldValue(
                  fieldsName.IS_CLOSED,
                  !values[fieldsName.IS_CLOSED],
                  false
                );
              }}
              name={fieldsName.IS_CLOSED}
              id={fieldsName.IS_CLOSED}
              checked={values[fieldsName.IS_CLOSED]}
            />
          </InlineField>
        </Col>
      </Row>
      {values[fieldsName.TIME_EXCEPTIONS].map(function (timeExceptions, index) {
        return (
          <ExceptionDateTime
            value={timeExceptions}
            error={dateExceptions[index]}
            canAdd={canAdd}
            canDelete={canRemove}
            index={index}
            onTimeChanged={timeChangedHandler.bind({}, index)}
            onRemoveTimeClick={removeTimeClickHandler.bind({}, index)}
            onAddTimeClick={addTimeClickHandler}
          />
        );
      })}
    </ContentWrapper>
  );
}

function ExceptionDateTime({
  value,
  onRemoveTimeClick,
  onTimeChanged,
  error,
  onAddTimeClick,
  canAdd,
  canDelete,
  index,
}) {
  const { formatMessage } = useIntl();
  const [startTime, setStartTime] = useState(value[fieldsName.TIME_START]);
  const [endTime, setEndTime] = useState(value[fieldsName.TIME_END]);
  const timeFormats = ['HH:mm', 'h:mm'];
  return (
    <Row>
      <Col xs={{ size: 3, offset: 3 }}>
        <InlineField
          labelText={`${formatMessage(messages.exceptionDateStartTime)}${
            index + 1
          }`}
        >
          <Datetime
            name={`${formatMessage(messages.exceptionDateStartTime)}${
              index + 1
            }`}
            dateFormat={false}
            value={startTime}
            onBlur={function (date) {
              const current = { ...value };

              if (moment(date, timeFormats, true).isValid()) {
                current[fieldsName.TIME_START] = date;
                onTimeChanged({ ...current });
              } else {
                setStartTime(current[fieldsName.TIME_START]);
              }
            }}
            onChange={function (date) {
              setStartTime(date);
            }}
          />
        </InlineField>
      </Col>
      <Col xs={{ size: 3 }}>
        <InlineField
          labelText={`${formatMessage(messages.exceptionDateEndTime)}${
            index + 1
          }`}
          error={error && error[fieldsName.TIME_END]}
        >
          <Datetime
            className={error && error[fieldsName.TIME_END] ? 'is-invalid' : ''}
            dateFormat={false}
            name={`${formatMessage(messages.exceptionDateEndTime)}${index + 1}`}
            value={endTime}
            onBlur={function (date) {
              const current = { ...value };

              if (moment(date, timeFormats, true).isValid()) {
                current[fieldsName.TIME_END] = date;
                onTimeChanged({ ...current });
              } else {
                setEndTime(current[fieldsName.TIME_END]);
              }
            }}
            onChange={function (date) {
              setEndTime(date);
            }}
          />
        </InlineField>
      </Col>
      <Col xs={{ size: 1 }}>
        {canAdd && (
          <Button color="primary" outline onClick={onAddTimeClick}>
            <em className="fas fa-plus"></em>{' '}
          </Button>
        )}
        {canDelete && (
          <Button color="danger" outline onClick={onRemoveTimeClick}>
            <em className="far fa-trash-alt"></em>{' '}
          </Button>
        )}
      </Col>
    </Row>
  );
}
