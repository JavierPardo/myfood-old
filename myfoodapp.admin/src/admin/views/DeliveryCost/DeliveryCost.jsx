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
import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName } from './DeliveryCostHandler';
import {
  constants as formConstants,
  InlineField,
  Select,
} from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.PROVIDER_ID]: yup
      .number()
      .required()
      .label(formatMessage(messages.providerFieldLabel)),
    [fieldsName.RATE_ID]: yup
      .number()
      .required()
      .label(formatMessage(messages.rateFieldLabel)),
    [fieldsName.START_RANGE]: yup
      .number()
      .min(0)
      .max(formConstants.MAX_NUMBER_ALLOWED)
      .label(formatMessage(messages.startFieldLabel)),
    [fieldsName.END_RANGE]: yup
      .number()
      .min(0)
      .max(formConstants.MAX_NUMBER_ALLOWED)
      .label(formatMessage(messages.endFieldLabel)),
    [fieldsName.FEE]: yup
      .number()
      .required()
      .max(formConstants.MAX_PRICE_ALLOWED)
      .label(formatMessage(messages.feeFieldLabel)),
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

const DeliveryCost = ({
  loading,
  initValues,
  isEdit,
  saveDeliveryCost,
  goBack,
  isReadOnly,
  availableProviders,
  availableRateTypes,
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
  } = useFormik({
    initialValues: initValues,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: saveDeliveryCost,
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
          isEdit ? messages.editTitle : messages.createTitle
        )}
        buttons={buttons}
      />
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <div className="form-horizontal">
                <InlineField
                  labelRequired
                  labelText={formatMessage(messages.providerFieldLabel)}
                  error={
                    touched[fieldsName.PROVIDER_ID] &&
                    errors[fieldsName.PROVIDER_ID]
                  }
                >
                  <Select
                    name={fieldsName.PROVIDER_ID}
                    placeholder={formatMessage(
                      messages.providerSelectPlaceholder
                    )}
                    value={values[fieldsName.PROVIDER_ID]}
                    onChange={handleChange}
                    options={availableProviders}
                    invalid={Boolean(
                      touched[fieldsName.PROVIDER_ID] &&
                        errors[fieldsName.PROVIDER_ID]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.rateFieldLabel)}
                  labelRequired
                  error={
                    touched[fieldsName.RATE_ID] && errors[fieldsName.RATE_ID]
                  }
                >
                  <Select
                    name={fieldsName.RATE_ID}
                    placeholder={formatMessage(messages.rateSelectPlaceholder)}
                    value={values[fieldsName.RATE_ID]}
                    onChange={handleChange}
                    options={availableRateTypes}
                    invalid={Boolean(
                      touched[fieldsName.RATE_ID] && errors[fieldsName.RATE_ID]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                {values[fieldsName.RATE_ID] === 1 && (
                  <>
                    <InlineField
                      wrapInGroup
                      labelText={formatMessage(messages.startFieldLabel)}
                      error={
                        touched[fieldsName.START_RANGE] &&
                        errors[fieldsName.START_RANGE]
                      }
                    >
                      <Input
                        type="number"
                        name={fieldsName.START_RANGE}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[fieldsName.START_RANGE]}
                        invalid={Boolean(
                          touched[fieldsName.START_RANGE] &&
                            errors[fieldsName.START_RANGE]
                        )}
                        disabled={isReadOnly}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>Km</InputGroupText>
                      </InputGroupAddon>
                    </InlineField>
                    <InlineField
                      wrapInGroup
                      labelText={formatMessage(messages.endFieldLabel)}
                      error={
                        touched[fieldsName.END_RANGE] &&
                        errors[fieldsName.END_RANGE]
                      }
                    >
                      <Input
                        type="number"
                        name={fieldsName.END_RANGE}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[fieldsName.END_RANGE]}
                        invalid={Boolean(
                          touched[fieldsName.END_RANGE] &&
                            errors[fieldsName.END_RANGE]
                        )}
                        disabled={isReadOnly}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>Km</InputGroupText>
                      </InputGroupAddon>
                    </InlineField>
                  </>
                )}
                <InlineField
                  labelRequired
                  wrapInGroup
                  labelText={formatMessage(messages.feeFieldLabel)}
                  error={touched[fieldsName.FEE] && errors[fieldsName.FEE]}
                >
                  <Input
                    type="number"
                    name={fieldsName.FEE}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.FEE]}
                    invalid={Boolean(
                      touched[fieldsName.FEE] && errors[fieldsName.FEE]
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
      </div>
    </ContentWrapper>
  );
};

DeliveryCost.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveDeliveryCost: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  isReadOnly: PropTypes.func,
};

export default DeliveryCost;
