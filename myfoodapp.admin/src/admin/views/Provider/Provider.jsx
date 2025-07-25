import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import { Card, CardBody, Input } from 'reactstrap';
import { Select, Switch } from '../../../common/Forms';
import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName } from './ProviderHandler';
import { constants as formConstants, InlineField } from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import BranchSelector from './BranchSelector';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.NAME]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.nameFieldLabel)),
    [fieldsName.CONTACT]: yup
      .string()
      .required()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.contactFieldLabel)),
    [fieldsName.EMAIL]: yup
      .string()
      .email()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.emailFieldLabel)),
    [fieldsName.PHONE]: yup
      .string()
      .max(formConstants.MAX_NUMBER_PHONE)
      .label(formatMessage(messages.phoneFieldLabel)),
    [fieldsName.WHATSAPP]: yup
      .string()
      .required()
      .max(formConstants.MAX_NUMBER_PHONE)
      .label(formatMessage(messages.whatsappFieldLabel)),
    [fieldsName.ADDRESS]: yup
      .string()
      .nullable()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.addressFieldLabel)),
    [fieldsName.WEBSITE]: yup
      .string()
      .nullable()
      .url()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.websiteFieldLabel)),
    [fieldsName.CITY_ID]: yup
      .number()
      .required()
      .label(formatMessage(messages.cityFieldLabel)),
    [fieldsName.BRANCHES]: yup
      .array()
      .required()
      .label(formatMessage(messages.branchFieldLabel)),
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

const Provider = ({
  loading,
  initValues,
  isEdit,
  saveProvider,
  goBack,
  availableCities,
  countries,
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
    onSubmit: saveProvider,
    enableReinitialize: true,
  });

  const buttons = buildActionButtons(
    formatMessage,
    goBack,
    handleSubmit,
    isEdit,
    isReadOnly
  );

  const handleBranchProviderChange = function (branchId, val) {

    const { [fieldsName.BRANCHES]: branches } = values;
    const branchSelected = branches.find(function (branch) {
      return branchId === branch.branchId
    });
    branchSelected[fieldsName.IS_DEFAULT] = val.target.checked
    setFieldValue([fieldsName.BRANCHES], branches);
  }

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
                  labelText={formatMessage(messages.contactFieldLabel)}
                  labelRequired
                  error={
                    touched[fieldsName.CONTACT] && errors[fieldsName.CONTACT]
                  }
                >
                  <Input
                    type="text"
                    name={fieldsName.CONTACT}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.CONTACT]}
                    invalid={Boolean(
                      touched[fieldsName.CONTACT] && errors[fieldsName.CONTACT]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.emailFieldLabel)}
                  labelRequired
                  error={touched[fieldsName.EMAIL] && errors[fieldsName.EMAIL]}
                >
                  <Input
                    type="email"
                    name={fieldsName.EMAIL}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.EMAIL]}
                    invalid={Boolean(
                      touched[fieldsName.EMAIL] && errors[fieldsName.EMAIL]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.phoneFieldLabel)}
                  error={touched[fieldsName.PHONE] && errors[fieldsName.PHONE]}
                >
                  <Input
                    type="text"
                    name={fieldsName.PHONE}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.PHONE]}
                    invalid={Boolean(
                      touched[fieldsName.PHONE] && errors[fieldsName.PHONE]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.whatsappFieldLabel)}
                  labelRequired
                  error={
                    touched[fieldsName.WHATSAPP] && errors[fieldsName.WHATSAPP]
                  }
                >
                  <Input
                    type="text"
                    name={fieldsName.WHATSAPP}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.WHATSAPP]}
                    invalid={Boolean(
                      touched[fieldsName.WHATSAPP] &&
                      errors[fieldsName.WHATSAPP]
                    )}
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
        <div className="col-lg-6">
          <BranchSelector
            isEdit={isEdit}
            branchesByProvider={values[fieldsName.BRANCHES]}
            onBranchesSeleted={function (selected) {
              setFieldValue(fieldsName.BRANCHES, selected, false)
            }}
            loading={loading}
            invalid={
              touched[fieldsName.BRANCHES] && errors[fieldsName.BRANCHES]
            }
          />


          {values[fieldsName.BRANCHES] &&
            <Card className="card-default">
              <Spinner show={loading} />
              <CardBody>{values[fieldsName.BRANCHES].map(function (branchProvider) {

                return <InlineField key={branchProvider.branchId}
                  labelText={`${formatMessage(messages.defaultLabel)}:`}>
                  {branchProvider.label}
                  <Switch
                    name={fieldsName.IS_DEFAULT}
                    checked={branchProvider[fieldsName.IS_DEFAULT]}
                    onChange={handleBranchProviderChange.bind(null, branchProvider.branchId)}
                    style={{ marginTop: '7px' }}
                    disabled={isReadOnly}
                  />
                </InlineField>
              })}
              </CardBody>
            </Card>}
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <InlineField
                labelText={formatMessage(messages.websiteFieldLabel)}
                error={
                  touched[fieldsName.WEBSITE] && errors[fieldsName.WEBSITE]
                }
              >
                <Input
                  type="text"
                  name={fieldsName.WEBSITE}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[fieldsName.WEBSITE]}
                  invalid={Boolean(
                    touched[fieldsName.WEBSITE] && errors[fieldsName.WEBSITE]
                  )}
                  disabled={isReadOnly}
                />
              </InlineField>
              <InlineField
                labelText={formatMessage(messages.cityFieldLabel)}
                labelRequired
                error={
                  touched[fieldsName.CITY_ID] && errors[fieldsName.CITY_ID]
                }
              >
                <Select
                  name={fieldsName.CITY_ID}
                  placeholder={formatMessage(messages.selectCity)}
                  value={values[fieldsName.CITY_ID]}
                  onChange={handleChange}
                  options={availableCities}
                  disabled={isReadOnly}
                  invalid={
                    touched[fieldsName.CITY_ID] && errors[fieldsName.CITY_ID]
                  }
                />
              </InlineField>
              <InlineField
                labelText={formatMessage(messages.addressFieldLabel)}
                error={errors[fieldsName.ADDRESS]}
              >
                <Input
                  type="textarea"
                  name={fieldsName.ADDRESS}
                  onChange={handleChange}
                  value={values[fieldsName.ADDRESS]}
                  invalid={Boolean(
                    touched[fieldsName.ADDRESS] && errors[fieldsName.ADDRESS]
                  )}
                  disabled={isReadOnly}
                />
              </InlineField>
            </CardBody>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
};

Provider.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveProvider: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  countries: PropTypes.array,
  isReadOnly: PropTypes.bool,
};

export default Provider;
