import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import { Card, CardBody, Input } from 'reactstrap';
import {
  ContentWrapper,
  PageHeader,
  Spinner,
} from '../../../common/components';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName } from './UserHandler';
import { constants as formConstants, InlineField } from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import Select from '../../../common/components/Select';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.FIRSTNAME]: yup
      .string()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.firstNameFieldLabel))
      .required(),
    [fieldsName.LASTNAME]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.lastNameFieldLabel))
      .required(),
    [fieldsName.EMAIL]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .email()
      .label(formatMessage(messages.emailFieldLabel))
      .required(),
    [fieldsName.PASSWORD]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.passwordFieldLabel))
      .when('isEdit', {
        is: false,
        then: yup.string().required(),
      })
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character'
      ),
    [fieldsName.PHONENUMBER]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .nullable()
      .label(formatMessage(messages.phoneNumberFieldLabel)),
    [fieldsName.ROLEID]: yup
      .string()
      .max(formConstants.MAX_TEXT_AREA_CHARS)
      .label(formatMessage(messages.phoneNumberFieldLabel))
      .required(),
  })
);

const buildActionButtons = memoize(
  (
    formatMessage,
    goBack,
    handleSubmit,
    deleteUser,
    isEdit,
    isReadOnly,
    _,
    userData
  ) => {
    const deleteBtn = {
      label: formatMessage(globalMessages.deleteButton),
      icon: 'fa-trash-alt',
      style: 'btn-danger',
      onClick: deleteUser,
      isHidden: !userData.canDelete,
    };

    const saveBtn = {
      label: formatMessage(
        isEdit ? globalMessages.updateButton : globalMessages.saveButton
      ),
      icon: 'fa-save',
      style: 'btn-primary',
      onClick: handleSubmit,
      isHidden: !userData.canEdit,
    };

    const backBtn = {
      label: formatMessage(globalMessages.backButton),
      icon: 'fa-arrow-left',
      style: 'btn-secondary',
      onClick: goBack,
    };

    return isEdit && !isReadOnly
      ? [backBtn, deleteBtn, saveBtn]
      : [backBtn, saveBtn];
  }
);

const User = ({
  loading,
  initValues,
  isEdit,
  saveUser,
  goBack,
  deleteUser,
  availableRoles,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();
  const { yup } = useContext(TranslationContext);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: { ...initValues, isEdit },
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: saveUser,
    enableReinitialize: true,
  });

  const isSelectedUserAdmin =
    values.role === 'Admin' || values.role === 'Super Admin';

  const buttons = function (user) {
    return buildActionButtons(
      formatMessage,
      goBack,
      handleSubmit,
      deleteUser,
      isEdit,
      isReadOnly,
      isSelectedUserAdmin,
      user
    );
  };

  const role = availableRoles.find(function ({ value }) {
    return value === values[fieldsName.ROLEID];
  });

  const roles = [...availableRoles];
  const buts = buttons(values);
  return (
    <ContentWrapper>
      <PageHeader
        title={formatMessage(
          isEdit ? messages.editTitle : messages.createTitle
        )}
        buttons={buts}
      />
      <div className="row">
        <div className="col-lg-7">
          <Card className="card-default">
            <Spinner show={loading} />
            <CardBody>
              <div className="form-horizontal">
                <InlineField
                  labelText={formatMessage(messages.firstNameFieldLabel)}
                  labelRequired={true}
                  error={
                    touched[fieldsName.FIRSTNAME] &&
                    errors[fieldsName.FIRSTNAME]
                  }
                >
                  <Input
                    type="text"
                    name={fieldsName.FIRSTNAME}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.FIRSTNAME]}
                    invalid={Boolean(
                      touched[fieldsName.FIRSTNAME] &&
                        errors[fieldsName.FIRSTNAME]
                    )}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.lastNameFieldLabel)}
                  labelRequired={true}
                  error={
                    touched[fieldsName.LASTNAME] && errors[fieldsName.LASTNAME]
                  }
                >
                  <Input
                    type="text"
                    name={fieldsName.LASTNAME}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.LASTNAME]}
                    invalid={Boolean(
                      touched[fieldsName.LASTNAME] &&
                        errors[fieldsName.LASTNAME]
                    )}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.emailFieldLabel)}
                  labelRequired={true}
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
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.phoneNumberFieldLabel)}
                  error={
                    touched[fieldsName.PHONENUMBER] &&
                    errors[fieldsName.PHONENUMBER]
                  }
                >
                  <Input
                    type="text"
                    name={fieldsName.PHONENUMBER}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.PHONENUMBER]}
                    invalid={Boolean(
                      touched[fieldsName.PHONENUMBER] &&
                        errors[fieldsName.PHONENUMBER]
                    )}
                  />
                </InlineField>
                <InlineField
                  labelText={formatMessage(messages.passwordFieldLabel)}
                  labelRequired={!isEdit}
                  error={
                    touched[fieldsName.PASSWORD] && errors[fieldsName.PASSWORD]
                  }
                >
                  <Input
                    type="password"
                    name={fieldsName.PASSWORD}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.PASSWORD]}
                    invalid={Boolean(
                      touched[fieldsName.PASSWORD] &&
                        errors[fieldsName.PASSWORD]
                    )}
                  />
                </InlineField>
              </div>
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
              <InlineField labelText={formatMessage(messages.roleFieldLabel)}>
                <Select
                  className={errors[fieldsName.ROLEID] ? 'is-invalid' : ''}
                  name={fieldsName.ROLEID}
                  key={fieldsName.ROLEID}
                  id={fieldsName.ROLEID}
                  placeholder={formatMessage(messages.selectRole)}
                  value={role}
                  onChange={function ({ value }) {
                    return setFieldValue(fieldsName.ROLEID, value);
                  }}
                  options={roles}
                  isDisabled={isReadOnly && isEdit}
                />
              </InlineField>
            </CardBody>
          </Card>
        </div>
      </div>
    </ContentWrapper>
  );
};

User.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default User;
