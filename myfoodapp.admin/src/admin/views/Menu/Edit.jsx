import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import { Card, CardBody, Input, InputGroupAddon } from 'reactstrap';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import {
  constants as formConstants,
  InlineField,
  UploadImage,
} from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import { useMenu, fieldsName } from './useMenu';

const buildSchema = (yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.NAME_FIELD]: yup
      .string()
      .max(formConstants.MAX_INPUT_CHARS)
      .required()
      .label(formatMessage(messages.name)),
    [fieldsName.IS_ACTIVE]: yup.bool().label(formatMessage(messages.isActive)),
  });

const Edit = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const { yup } = useContext(TranslationContext);
  const { goBack, save, loading, initValues, isEdit, title } = useMenu();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initValues,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: save,
    enableReinitialize: true,
  });
  const buttons = [
    {
      label: formatMessage(globalMessages.backButton),
      icon: 'fa-arrow-left',
      style: 'btn-secondary',
      onClick: goBack,
    },
    {
      label: formatMessage(
        isEdit ? globalMessages.editButton : globalMessages.createButton
      ),
      icon: 'fa-save',
      style: 'btn-primary',
      onClick: handleSubmit,
      isHidden: isReadOnly,
    },
  ];

  return (
    <ContentWrapper>
      <PageHeader title={title} buttons={buttons} />
      <div className="row">
        <div className="col-lg-7">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <div className="form-horizontal">
                <InlineField
                  labelText={formatMessage(messages.name)}
                  labelRequired={true}
                  error={errors[fieldsName.NAME_FIELD]}
                >
                  <Input
                    type="text"
                    name="name"
                    disabled={isReadOnly}
                    onChange={handleChange}
                    value={values[fieldsName.NAME_FIELD]}
                    invalid={Boolean(errors[fieldsName.NAME_FIELD])}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.isActive)}
                  error={errors[fieldsName.IS_ACTIVE]}
                >
                  <div className="checkbox c-checkbox">
                    <label className="mt-2">
                      <Input
                        type="checkbox"
                        name="isActive"
                        disabled={isReadOnly}
                        onChange={handleChange}
                        checked={values[fieldsName.IS_ACTIVE]}
                        invalid={Boolean(errors[fieldsName.IS_ACTIVE])}
                      />
                      <span className="fa fa-check"></span>
                      {formatMessage(messages.isActive)}
                    </label>
                  </div>
                </InlineField>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-5"></div>
      </div>
    </ContentWrapper>
  );
};

export default Edit;
