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

import { TranslationContext } from '../../../common/contexts/TranslationContext';
import {
  constants as formConstants,
  InlineField,
  UploadImage,
  Switch,
  DatePicker,
} from '../../../common/Forms';
import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';

import { fieldsName } from './SpecialEventHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.NAME]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.nameFieldLabel)),
    [fieldsName.START_DATE]: yup
      .date()
      .required()
      .label(formatMessage(messages.startDateLabel)),
    [fieldsName.END_DATE]: yup
      .date()
      .required()
      .min(
        yup.ref(fieldsName.START_DATE),
        formatMessage(globalMessages.endDateBeforeStartDate)
      )
      .label(formatMessage(messages.endDateLabel)),
    [fieldsName.PRICE]: yup
      .number()
      .required()
      .max(formConstants.MAX_PRICE_ALLOWED)
      .label(formatMessage(messages.priceLabel)),
    [fieldsName.DESCRIPTION]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.descriptionLabel)),
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

const SpecialEvent = ({
  loading,
  initValues,
  isEdit,
  goBack,
  saveEvent,
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
    onSubmit: saveEvent,
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
        <div className="col-lg-7">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <div className="form-horizontal">
                <InlineField
                  labelText={formatMessage(messages.nameFieldLabel)}
                  labelRequired
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
                <InlineField
                  labelRequired
                  labelText={formatMessage(messages.startDateLabel)}
                  error={
                    touched[fieldsName.START_DATE] &&
                    errors[fieldsName.START_DATE]
                  }
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    value={values[fieldsName.START_DATE]}
                    minDate={moment()}
                    onChange={(date) =>
                      setFieldValue(fieldsName.START_DATE, date)
                    }
                    invalid={Boolean(
                      touched[fieldsName.START_DATE] &&
                        errors[fieldsName.START_DATE]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelRequired
                  labelText={formatMessage(messages.endDateLabel)}
                  error={
                    touched[fieldsName.END_DATE] && errors[fieldsName.END_DATE]
                  }
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    value={values[fieldsName.END_DATE]}
                    minDate={moment()}
                    onChange={(date) =>
                      setFieldValue(fieldsName.END_DATE, date)
                    }
                    invalid={
                      touched[fieldsName.END_DATE] &&
                      errors[fieldsName.END_DATE]
                    }
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelRequired
                  labelText={formatMessage(messages.priceLabel)}
                  error={touched[fieldsName.PRICE] && errors[fieldsName.PRICE]}
                  wrapInGroup
                >
                  <Input
                    type="number"
                    name={fieldsName.PRICE}
                    onChange={handleChange}
                    value={values[fieldsName.PRICE]}
                    onBlur={handleBlur}
                    invalid={Boolean(
                      touched[fieldsName.PRICE] && errors[fieldsName.PRICE]
                    )}
                    disabled={isReadOnly}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Bs</InputGroupText>
                  </InputGroupAddon>
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.descriptionLabel)}
                  error={
                    touched[fieldsName.DESCRIPTION] &&
                    errors[fieldsName.DESCRIPTION]
                  }
                >
                  <Input
                    type="textarea"
                    name={fieldsName.DESCRIPTION}
                    onChange={handleChange}
                    value={values[fieldsName.DESCRIPTION]}
                    invalid={Boolean(
                      touched[fieldsName.DESCRIPTION] &&
                        errors[fieldsName.DESCRIPTION]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField labelText={formatMessage(messages.prePaidLabel)}>
                  <Switch
                    name={fieldsName.PRE_PAID}
                    checked={values[fieldsName.PRE_PAID]}
                    onChange={handleChange}
                    style={{ marginTop: '7px' }}
                    disabled={isReadOnly}
                  />
                </InlineField>
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
        <div className="col-lg-5">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <UploadImage
                base64
                uploadMessage={formatMessage(globalMessages.imageFieldLabel)}
                onSelect={(files) =>
                  setFieldValue(fieldsName.IMAGE, files[0], false)
                }
                values={
                  values[fieldsName.IMAGE] ? [values[fieldsName.IMAGE]] : []
                }
                disabled={isReadOnly}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
};

SpecialEvent.propTypes = {
  loading: PropTypes.bool,
  initValues: PropTypes.object,
  isEdit: PropTypes.bool,
  goBack: PropTypes.func,
  saveEvent: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

export default SpecialEvent;
