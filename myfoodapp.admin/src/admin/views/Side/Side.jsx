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
import { fieldsName } from './SideHandler';
import {
  constants as formConstants,
  InlineField,
  UploadImage,
  Switch,
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
    [fieldsName.DESCRIPTION]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.descriptionFieldLabel)),
    [fieldsName.PRICE]: yup
      .number()
      .required()
      .positive()
      .label(formatMessage(messages.priceFieldLabel)),
  })
);

const buildActionButtons = memoize(
  (formatMessage, goBack, handleSubmit, deleteSide, isEdit, isReadOnly) => {
    const deleteBtn = {
      label: formatMessage(globalMessages.deleteButton),
      icon: 'fa-trash-alt',
      style: 'btn-danger',
      onClick: deleteSide,
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

const Side = ({
  loading,
  initValues,
  isEdit,
  saveSide,
  goBack,
  deleteSide,
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
    onSubmit: saveSide,
    enableReinitialize: true,
  });

  const buttons = buildActionButtons(
    formatMessage,
    goBack,
    handleSubmit,
    deleteSide,
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
    </ContentWrapper>
  );
};

Side.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveSide: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  deleteSide: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default Side;
