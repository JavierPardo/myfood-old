import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import {
  Card,
  CardBody,
  Input,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import * as moment from 'moment';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName, EXPIRATION_TYPES, COUPON_TYPES } from './CouponHandler';
import {
  constants as formConstants,
  InlineField,
  RadioGroup,
  Switch,
  DatePicker,
} from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.NAME]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.nameFieldLabel)),
    [fieldsName.TYPE]: yup
      .number()
      .label(formatMessage(messages.typeFieldLabel)),
    [fieldsName.AMOUNT]: yup
      .number()
      .required()
      .positive()
      .label('Monto o Porcentaje'),
    [fieldsName.MIN_AMOUNT]: yup
      .number()
      .label(formatMessage(messages.minAmountFieldLabel)),
    [fieldsName.CODE]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .min(8)
      .label(formatMessage(messages.codeFieldLabel)),
    [fieldsName.EXPIRATION_TYPE]: yup
      .number()
      .label(formatMessage(messages.expirationTypeLabel)),
    [fieldsName.END_DATE]: yup
      .date()
      .label(formatMessage(messages.endDateLabel)),
    [fieldsName.LIMIT]: yup.number().label(formatMessage(messages.limitLabel)),
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

const Coupon = ({
  loading,
  initValues,
  isEdit,
  saveCoupon,
  goBack,
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
    onSubmit: saveCoupon,
    enableReinitialize: true,
  });

  const buttons = buildActionButtons(
    formatMessage,
    goBack,
    handleSubmit,
    isEdit,
    isReadOnly
  );

  const couponTypes = [
    {
      id: 'percentage',
      value: COUPON_TYPES.percentage,
      label: formatMessage(messages.percentageFieldLabel),
    },
    {
      id: 'amount',
      value: COUPON_TYPES.amount,
      label: formatMessage(messages.amountFieldLabel),
    },
  ];

  const expirationTypes = [
    {
      id: 'date',
      value: EXPIRATION_TYPES.date,
      label: formatMessage(messages.endDateLabel),
    },
    {
      id: 'limit',
      value: EXPIRATION_TYPES.limit,
      label: formatMessage(messages.limitLabel),
    },
  ];
  return (
    <ContentWrapper>
      <PageHeader
        title={formatMessage(
          isEdit ? messages.editTitle : messages.createTitle
        )}
        buttons={buttons}
      />
      <div className="row">
        <div className="col-lg-6">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <div className="form-horizontal">
                <InlineField
                  labelText={formatMessage(messages.nameFieldLabel)}
                  labelRequired={true}
                  error={touched[fieldsName.NAME] && errors[fieldsName.NAME]}
                >
                  <Input
                    type="text"
                    name={fieldsName.NAME}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.NAME]}
                    invalid={Boolean(
                      touched[fieldsName.NAME] && errors[fieldsName.NAME]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                {!isReadOnly && (
                  <InlineField
                    labelText={formatMessage(messages.typeFieldLabel)}
                  >
                    <RadioGroup
                      name={fieldsName.TYPE}
                      checkedValue={values[fieldsName.TYPE]}
                      onChange={handleChange}
                      options={couponTypes}
                    />
                  </InlineField>
                )}

                <InlineField
                  labelText={formatMessage(
                    values[fieldsName.TYPE] === COUPON_TYPES.percentage
                      ? messages.percentageFieldLabel
                      : messages.amountFieldLabel
                  )}
                  error={
                    touched[fieldsName.AMOUNT] && errors[fieldsName.AMOUNT]
                  }
                  wrapInGroup
                  labelRequired
                >
                  <Input
                    type="number"
                    name={fieldsName.AMOUNT}
                    onChange={handleChange}
                    value={values[fieldsName.AMOUNT]}
                    onBlur={handleBlur}
                    invalid={Boolean(
                      touched[fieldsName.AMOUNT] && errors[fieldsName.AMOUNT]
                    )}
                    disabled={isReadOnly}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      {values[fieldsName.TYPE] === COUPON_TYPES.percentage
                        ? '%'
                        : 'Bs'}
                    </InputGroupText>
                  </InputGroupAddon>
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.minAmountFieldLabel)}
                  error={
                    touched[fieldsName.MIN_AMOUNT] &&
                    errors[fieldsName.MIN_AMOUNT]
                  }
                  wrapInGroup
                >
                  <Input
                    type="number"
                    name={fieldsName.MIN_AMOUNT}
                    onChange={handleChange}
                    value={values[fieldsName.MIN_AMOUNT]}
                    onBlur={handleBlur}
                    invalid={Boolean(
                      touched[fieldsName.MIN_AMOUNT] &&
                        errors[fieldsName.MIN_AMOUNT]
                    )}
                    disabled={isReadOnly}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Bs</InputGroupText>
                  </InputGroupAddon>
                </InlineField>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <div className="form-horizontal">
                <InlineField
                  labelText={formatMessage(messages.codeFieldLabel)}
                  labelRequired
                  error={touched[fieldsName.CODE] && errors[fieldsName.CODE]}
                >
                  <Input
                    type="text"
                    name={fieldsName.CODE}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.CODE]}
                    invalid={Boolean(
                      touched[fieldsName.CODE] && errors[fieldsName.CODE]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                {!isReadOnly && (
                  <InlineField
                    labelText={formatMessage(messages.expirationTypeLabel)}
                  >
                    <RadioGroup
                      name={fieldsName.EXPIRATION_TYPE}
                      checkedValue={values[fieldsName.EXPIRATION_TYPE]}
                      onChange={handleChange}
                      options={expirationTypes}
                    />
                  </InlineField>
                )}

                {values[fieldsName.EXPIRATION_TYPE] ===
                  EXPIRATION_TYPES.date && (
                  <InlineField
                    labelText={formatMessage(messages.endDateLabel)}
                    error={
                      touched[fieldsName.END_DATE] &&
                      errors[fieldsName.END_DATE]
                    }
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      value={values[fieldsName.END_DATE]}
                      minDate={moment()}
                      onChange={(date) =>
                        setFieldValue(fieldsName.END_DATE, date)
                      }
                      disabled={isReadOnly}
                    />
                  </InlineField>
                )}
                {values[fieldsName.EXPIRATION_TYPE] ===
                  EXPIRATION_TYPES.limit && (
                  <InlineField
                    labelText={formatMessage(messages.limitLabel)}
                    error={
                      touched[fieldsName.LIMIT] && errors[fieldsName.LIMIT]
                    }
                  >
                    <Input
                      type="number"
                      name={fieldsName.LIMIT}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[fieldsName.LIMIT]}
                      invalid={Boolean(
                        touched[fieldsName.LIMIT] && errors[fieldsName.LIMIT]
                      )}
                      disabled={isReadOnly}
                    />
                  </InlineField>
                )}
                <InlineField labelText={formatMessage(messages.activeLabel)}>
                  <Switch
                    name={fieldsName.ACTIVE}
                    checked={values[fieldsName.ACTIVE]}
                    onChange={handleChange}
                    style={{ marginTop: '7px' }}
                    disabled={isReadOnly}
                  />
                </InlineField>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
};

Coupon.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveCoupon: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default Coupon;
