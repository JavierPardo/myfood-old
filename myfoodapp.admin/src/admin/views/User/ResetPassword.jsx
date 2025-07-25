import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';

import { useFormik } from 'formik';
import { Input } from 'reactstrap';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName } from './ResetPasswordHandler';
import { constants as formConstants } from '../../../common/Forms';
import messages from './messages';
import ErrorPagesLinksFooter from '../../../common/pages/ErrorPagesLinksFooter';
import { Spinner } from '../../../common/components';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.PASSWORD]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.passwordFieldLabel)),
    [fieldsName.CONFIRMPASSWORD]: yup
      .string()
      .required()
      .oneOf([yup.ref(fieldsName.PASSWORD), null], 'Passwords must match')
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.confirmPasswordFieldLabel)),
  })
);

const ResetPassword = ({ loading, initValues, isEdit, savePassword }) => {
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
    onSubmit: savePassword,
    enableReinitialize: true,
  });

  return (
    <div className="block-center mt-4 wd-xl">
      <Spinner show={loading}/>
      <img className="img-fluid" src="img/text_logo_dark.png" alt="App Logo" />
      <div className="card card-flat">
        <div className="card-body">
          <p className="text-center py-2">
            <FormattedMessage {...messages.resetPasswordTitle} />
          </p>
          <form className="mb-3" name="formLogin" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group with-focus">
                <Input
                  type="password"
                  className="border-right-0"
                  name={fieldsName.PASSWORD}
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[fieldsName.PASSWORD]}
                  invalid={Boolean(
                    touched[fieldsName.PASSWORD] && errors[fieldsName.PASSWORD]
                  )}
                />
                <div className="input-group-append">
                  <span className="input-group-text text-muted bg-transparent border-left-0">
                    <em className="fa fa-lock"></em>
                  </span>
                </div>
                {errors.password && (
                  <span className="invalid-feedback">
                    {touched[fieldsName.PASSWORD] &&
                      errors[fieldsName.PASSWORD]}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="input-group with-focus">
                <Input
                  type="password"
                  name={fieldsName.CONFIRMPASSWORD}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-right-0"
                  placeholder="Confirm Password"
                  value={values[fieldsName.CONFIRMPASSWORD]}
                  invalid={Boolean(
                    touched[fieldsName.CONFIRMPASSWORD] &&
                    errors[fieldsName.CONFIRMPASSWORD]
                  )}
                />
                <div className="input-group-append">
                  <span className="input-group-text text-muted bg-transparent border-left-0">
                    <em className="fa fa-lock"></em>
                  </span>
                </div>
                {errors.password && (
                  <span className="invalid-feedback">
                    {touched[fieldsName.CONFIRMPASSWORD] &&
                      errors[fieldsName.CONFIRMPASSWORD]}
                  </span>
                )}
              </div>
            </div>

            <button className="btn btn-block btn-primary mt-3" type="submit">
              <FormattedMessage {...messages.savePasswordButtonLabel} />
            </button>
            <ErrorPagesLinksFooter />
          </form>
        </div>
      </div>
      <div className="p-3 text-center">
        <span>My Food App</span>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  savePassword: PropTypes.func.isRequired,
};

export default ResetPassword;
