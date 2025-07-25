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
import Select from '../../../common/components/Select';
import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import {
  constants as formConstants,
  InlineField,
  UploadImage,
  Switch,
} from '../../../common/Forms';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import globalMessages from '../../../common/globalMessages';
import messages from './messages';
import { fieldsName } from './ItemHandler';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.NAME]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.nameFieldLabel)),
    [fieldsName.DESCRIPTION]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.descriptionFieldLabel)),
    [fieldsName.TIME]: yup
      .number()
      .required()
      .label(formatMessage(messages.timeFieldLabel)),
    [fieldsName.REQUIRED_SIDES]: yup
      .number()
      .label(formatMessage(messages.requiredSidesFieldLabel)),
    [fieldsName.IS_OPTION_REQUIRED]: yup
      .bool()
      .label(formatMessage(messages.isOptionRequiredFieldLabel)),
    [fieldsName.VISIBLE]: yup
      .bool()
      .label(formatMessage(messages.visibleFieldLabel)),
    [fieldsName.ACTIVE]: yup
      .bool()
      .label(formatMessage(messages.activeFieldLabel)),
    [fieldsName.PRICE]: yup
      .number()
      .required()
      .positive()
      .label(formatMessage(messages.priceFieldLabel)),
  })
);

const buildActionButtons = memoize(
  (formatMessage, goBack, handleSubmit, deleteItem, isEdit, isReadOnly) => {
    const deleteBtn = {
      label: formatMessage(globalMessages.deleteButton),
      icon: 'fa-trash-alt',
      style: 'btn-danger',
      onClick: deleteItem,
    };

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
    if (isReadOnly) {
      return [backBtn];
    }

    return isEdit ? [backBtn, deleteBtn, saveBtn] : [backBtn, saveBtn];
  }
);

const Item = ({
  loading,
  initValues,
  isEdit,
  saveItem,
  goBack,
  isReadOnly,
  deleteItem,
  availableOptions,
  availableCategories,
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
    onSubmit: saveItem,
    enableReinitialize: true,
  });

  const buttons = buildActionButtons(
    formatMessage,
    goBack,
    handleSubmit,
    deleteItem,
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
        <div className="col-lg-7">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <div className="form-horizontal">
                <InlineField
                  labelText={formatMessage(messages.nameFieldLabel)}
                  error={touched[fieldsName.NAME] && errors[fieldsName.NAME]}
                  labelRequired
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
                  labelText={formatMessage(messages.descriptionFieldLabel)}
                  error={errors[fieldsName.DESCRIPTION]}
                >
                  <Input
                    type="textarea"
                    name={fieldsName.DESCRIPTION}
                    onChange={handleChange}
                    value={values[fieldsName.DESCRIPTION]}
                    invalid={Boolean(errors[fieldsName.DESCRIPTION])}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.timeFieldLabel)}
                  error={touched[fieldsName.TIME] && errors[fieldsName.TIME]}
                  wrapInGroup
                  labelRequired
                >
                  <Input
                    type="text"
                    name={fieldsName.TIME}
                    onChange={handleChange}
                    value={values[fieldsName.TIME]}
                    onBlur={handleBlur}
                    invalid={Boolean(
                      touched[fieldsName.TIME] && errors[fieldsName.TIME]
                    )}
                    disabled={isReadOnly}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Min</InputGroupText>
                  </InputGroupAddon>
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.requiredSidesFieldLabel)}
                  error={
                    touched[fieldsName.REQUIRED_SIDES] &&
                    errors[fieldsName.REQUIRED_SIDES]
                  }
                >
                  <Input
                    type="number"
                    name={fieldsName.REQUIRED_SIDES}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.REQUIRED_SIDES]}
                    invalid={Boolean(
                      touched[fieldsName.REQUIRED_SIDES] &&
                        errors[fieldsName.REQUIRED_SIDES]
                    )}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.visibleFieldLabel)}
                >
                  <Switch
                    name={fieldsName.VISIBLE}
                    checked={values[fieldsName.VISIBLE]}
                    onChange={handleChange}
                    style={{ marginTop: '7px' }}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.activeFieldLabel)}
                >
                  <Switch
                    name={fieldsName.ACTIVE}
                    checked={values[fieldsName.ACTIVE]}
                    onChange={handleChange}
                    style={{ marginTop: '7px' }}
                    disabled={isReadOnly}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.isOptionRequiredFieldLabel)}
                >
                  <Switch
                    name={fieldsName.IS_OPTION_REQUIRED}
                    checked={values[fieldsName.IS_OPTION_REQUIRED]}
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
                uploadMessage={formatMessage(messages.imageFieldLabel)}
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
      <div className="row">
        <div className="col-lg-7">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <Spinner show={loading} />
              <InlineField
                labelText={formatMessage(messages.categoriesFieldLabel)}
              >
                <Select
                  isMulti={true}
                  name={fieldsName.CATEGORIES}
                  placeholder="Seleccione Categorias"
                  value={values[fieldsName.CATEGORIES]}
                  onChange={(selected) =>
                    setFieldValue(fieldsName.CATEGORIES, selected, false)
                  }
                  options={availableCategories}
                  isDisabled={isReadOnly}
                />
              </InlineField>
              <InlineField
                labelText={formatMessage(messages.optionsFieldLabel)}
              >
                <Select
                  isMulti
                  isDisabled={
                    !values[fieldsName.IS_OPTION_REQUIRED] || isReadOnly
                  }
                  placeholder="Seleccione Opciones"
                  name={fieldsName.OPTIONS}
                  value={values[fieldsName.OPTIONS]}
                  onChange={(selected) =>
                    setFieldValue(fieldsName.OPTIONS, selected, false)
                  }
                  options={availableOptions}
                />
              </InlineField>
              <InlineField
                labelText={formatMessage(messages.priceFieldLabel)}
                error={touched[fieldsName.PRICE] && errors[fieldsName.PRICE]}
                wrapInGroup
              >
                <Input
                  type="text"
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
            </CardBody>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
};

Item.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveItem: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  availableCategories: PropTypes.array,
  availableOptions: PropTypes.array,
  isReadOnly: PropTypes.bool,
};

export default Item;
