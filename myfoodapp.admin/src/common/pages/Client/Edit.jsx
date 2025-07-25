import React from 'react';
import { ContentWrapper, PageHeader, Spinner } from '../../components';
import useEdit from './useEdit';
import { TranslationContext } from '../../contexts/TranslationContext';
import { fieldsName } from './useList';
import {
  constants as formConstants,
  InlineField,
  UploadImage,
  Switch,
} from '../../../common/Forms';
import messages from './messages';
import { Button, Card, Row, Col, Input, CardBody } from 'reactstrap';
import { useFormik } from 'formik';
import { useContext } from 'react';
import globalMessages from '../../globalMessages';

const buildSchema = function (yup, formatMessage) {
  return yup.object().shape({
    [fieldsName.NAME]: yup
      .string()
      .max(formConstants.MAX_INPUT_CHARS)
      .required()
      .label(formatMessage(messages.nameFieldLabel)),
    [fieldsName.IS_ACTIVE]: yup
      .bool()
      .label(formatMessage(messages.isActiveFieldLabel)),
  });
};
const initValues = {
  [fieldsName.IS_ACTIVE]: true,
  [fieldsName.NAME]: '',
};

export default function Edit() {
  const {
    goBack,
    formatMessage,
    saveClient,
    loading,
    client,
    isEdit,
    title,
  } = useEdit();
  const { yup } = useContext(TranslationContext);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: client,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: saveClient,
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
    },
  ];
  return (
    <ContentWrapper>
      <PageHeader buttons={buttons} title={title} loading={loading} />
      <Row>
        <Col xs={7}>
          <Card className="card-default">
            <CardBody>
              <Spinner show={loading} />
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
                    value={values[fieldsName.NAME]}
                    invalid={Boolean(
                      touched[fieldsName.NAME] && errors[fieldsName.NAME]
                    )}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.isActiveFieldLabel)}
                >
                  <Switch
                    name={fieldsName.IS_ACTIVE}
                    checked={values[fieldsName.IS_ACTIVE]}
                    onChange={handleChange}
                    style={{ marginTop: '7px' }}
                  />
                </InlineField>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={{ size: 5 }}>
          <Row>
            <Card className="card-default">
              <Spinner show={loading} />
              <CardBody>
                <UploadImage
                  base64
                  uploadMessage={formatMessage(messages.logoUrl)}
                  onSelect={function (files) {
                    setFieldValue(fieldsName.LOGO_URL, files[0]);
                  }}
                  values={
                    values[fieldsName.LOGO_URL]
                      ? [values[fieldsName.LOGO_URL]]
                      : []
                  }
                />
                <UploadImage
                  base64
                  uploadMessage={formatMessage(messages.bannerUrl)}
                  onSelect={function (files) {
                    setFieldValue(fieldsName.BANNER_URL, files[0]);
                  }}
                  values={
                    values[fieldsName.BANNER_URL]
                      ? [values[fieldsName.BANNER_URL]]
                      : []
                  }
                />
              </CardBody>
            </Card>
          </Row>
        </Col>
      </Row>
    </ContentWrapper>
  );
}
