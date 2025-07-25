import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import { Card, CardBody, Input } from 'reactstrap';
import Select from '../../../common/components/Select';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName } from './CategoryHandler';
import {
  constants as formConstants,
  InlineField,
  UploadImage,
  Switch,
} from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const buildSchema = function (yup, formatMessage) {
  return yup.object().shape({
    [fieldsName.NAME_FIELD]: yup
      .string()
      .max(formConstants.MAX_INPUT_CHARS)
      .required()
      .label(formatMessage(messages.nameFieldLabel)),
    [fieldsName.IS_VISIBLE]: yup
      .bool()
      .label(formatMessage(messages.visibleFieldLabel)),
    [fieldsName.MENUCATEGORY]: yup
      .array()
      .min(1, formatMessage(messages.menusRequired))
      .nullable()
      .required(formatMessage(messages.menusRequired)),
  });
};

const Category = ({
  goBack,
  saveCategory,
  loading,
  initValues,
  isEdit,
  metadata,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();
  const { yup } = useContext(TranslationContext);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initValues,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: saveCategory,
    enableReinitialize: true,
  });
  const buttons = isReadOnly
    ? [
        {
          label: formatMessage(globalMessages.backButton),
          icon: 'fa-arrow-left',
          style: 'btn-secondary',
          onClick: goBack,
        },
      ]
    : [
        {
          label: formatMessage(globalMessages.backButton),
          icon: 'fa-arrow-left',
          style: 'btn-secondary',
          onClick: goBack,
        },
        {
          label: formatMessage(
            isEdit ? messages.editButton : messages.createButton
          ),
          icon: 'fa-save',
          style: 'btn-primary',
          onClick: handleSubmit,
        },
      ];

  const { menus } = metadata;
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
                  error={
                    touched[fieldsName.NAME_FIELD] &&
                    errors[fieldsName.NAME_FIELD]
                  }
                >
                  <Input
                    type="text"
                    name="name"
                    disabled={isReadOnly}
                    onChange={handleChange}
                    value={values[fieldsName.NAME_FIELD]}
                    invalid={Boolean(
                      touched[fieldsName.NAME_FIELD] &&
                        errors[fieldsName.NAME_FIELD]
                    )}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.visibleFieldLabel)}
                >
                  <Switch
                    disabled={isReadOnly}
                    name={fieldsName.IS_VISIBLE}
                    checked={values[fieldsName.IS_VISIBLE]}
                    onChange={handleChange}
                    style={{ marginTop: '7px' }}
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
              </div>
            </CardBody>
            <CardBody>
              <Spinner show={loading} />
              <InlineField
                labelText={formatMessage(messages.menus)}
                labelRequired={true}
                error={errors[fieldsName.MENUCATEGORY]}
              >
                <Select
                  isMulti
                  className={
                    errors[fieldsName.MENUCATEGORY] ? 'is-invalid' : ''
                  }
                  name={fieldsName.MENUCATEGORY}
                  key={fieldsName.MENUCATEGORY}
                  id={fieldsName.MENUCATEGORY}
                  placeholder={formatMessage(messages.selectMenu)}
                  value={values[fieldsName.MENUCATEGORY]}
                  onChange={function (select) {
                    return handleChange({
                      target: {
                        value: select,
                        id: fieldsName.MENUCATEGORY,
                        name: fieldsName.MENUCATEGORY,
                      },
                    });
                  }}
                  options={menus}
                  isDisabled={isReadOnly}
                />
              </InlineField>
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

Category.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveCategory: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default Category;
