import React from 'react';
import { ContentWrapper, PageHeader, Spinner } from '../../components';
import useEdit from './useEdit';
import { TranslationContext } from '../../contexts/TranslationContext';
import { fieldsName } from './useList';
import {
  constants as formConstants,
  InlineField,
  Switch,
} from '../../../common/Forms';
import messages from './messages';
import { Card, Row, Col, Input, CardBody } from 'reactstrap';
import { useFormik } from 'formik';
import { useContext } from 'react';
import globalMessages from '../../globalMessages';
import Select from '../../../common/components/Select';

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
    [fieldsName.COUNTRY_ID]: yup
      .number()
      .required(formatMessage(messages.countryRequired))
      .label(formatMessage(messages.country)),
    [fieldsName.CITY_ID]: yup
      .number()
      .required(formatMessage(messages.cityRequired))
      .label(formatMessage(messages.city)),
    [fieldsName.ZONE_ID]: yup
      .number()
      .required(formatMessage(messages.zoneRequired))
      .label(formatMessage(messages.zone)),
  });
};

export default function Edit() {
  const {
    goBack,
    formatMessage,
    saveBranch,
    loading,
    metadata,
    branch,
    isEdit,
    title,
  } = useEdit();
  const { yup } = useContext(TranslationContext);
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: branch,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: saveBranch,
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
      onClick: function () {
        handleSubmit(values);
      },
    },
  ];

  //const { countries, cities, zones } = metadata;
  const country = metadata.countries.find(function ({ value }) {
    return value === values[fieldsName.COUNTRY_ID];
  });
  const city = metadata.cities.find(function ({ value } = {}) {
    return value === values[fieldsName.CITY_ID];
  });
  const zone = metadata.zones.find(function ({ value } = {}) {
    return value === values[fieldsName.ZONE_ID];
  });

  const countries = [...metadata.countries];
  const cities = values[fieldsName.COUNTRY_ID]
    ? [
        ...metadata.cities.filter(function (city) {
          return city[fieldsName.COUNTRY_ID] === values[fieldsName.COUNTRY_ID];
        }),
      ]
    : [];
  const zones = values[fieldsName.CITY_ID]
    ? [
        ...metadata.zones.filter(function (zone) {
          return zone[fieldsName.CITY_ID] === values[fieldsName.CITY_ID];
        }),
      ]
    : [];

  return (
    <ContentWrapper>
      <PageHeader buttons={buttons} title={title} loading={loading} />
      <Row>
        <Col lg={7}>
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

                <InlineField
                  labelText={formatMessage(messages.country)}
                  labelRequired={true}
                  error={errors[fieldsName.COUNTRY_ID]}
                >
                  <Select
                    className={
                      errors[fieldsName.COUNTRY_ID] ? 'is-invalid' : ''
                    }
                    name={fieldsName.COUNTRY_ID}
                    key={fieldsName.COUNTRY_ID}
                    id={fieldsName.COUNTRY_ID}
                    placeholder={formatMessage(messages.selectCountry)}
                    value={country}
                    onChange={function ({ value }) {
                      return handleChange({
                        target: {
                          value: value,
                          id: fieldsName.COUNTRY_ID,
                          name: fieldsName.COUNTRY_ID,
                        },
                      });
                    }}
                    options={countries}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.city)}
                  labelRequired={true}
                  error={errors[fieldsName.CITY_ID]}
                >
                  <Select
                    className={errors[fieldsName.CITY_ID] ? 'is-invalid' : ''}
                    name={fieldsName.CITY_ID}
                    key={fieldsName.CITY_ID}
                    id={fieldsName.CITY_ID}
                    placeholder={formatMessage(messages.selectCity)}
                    value={city}
                    onChange={function ({ value }) {
                      return handleChange({
                        target: {
                          value,
                          id: fieldsName.CITY_ID,
                          name: fieldsName.CITY_ID,
                        },
                      });
                    }}
                    options={cities}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.zone)}
                  labelRequired={true}
                  error={errors[fieldsName.ZONE_ID]}
                >
                  <Select
                    className={errors[fieldsName.ZONE_ID] ? 'is-invalid' : ''}
                    name={fieldsName.ZONE_ID}
                    key={fieldsName.ZONE_ID}
                    id={fieldsName.ZONE_ID}
                    placeholder={formatMessage(messages.selectZone)}
                    value={zone}
                    onChange={function ({ value }) {
                      return handleChange({
                        target: {
                          value,
                          id: fieldsName.ZONE_ID,
                          name: fieldsName.ZONE_ID,
                        },
                      });
                    }}
                    options={zones}
                  />
                </InlineField>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ContentWrapper>
  );
}
