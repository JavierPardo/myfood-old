import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';

import { useFormik } from 'formik';
import { Input } from 'reactstrap';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { fieldsName } from './RecoverPasswordHandler';
import { constants as formConstants } from '../../../common/Forms';
import messages from './messages';
import { ContentWrapper, Spinner } from '../../../common/components';
import ErrorPagesLinksFooter from '../../../common/pages/ErrorPagesLinksFooter';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.EMAIL]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.emailFieldLabel)),
  })
);

const RecoverPassword = ({ initValues, sendEmail, loading }) => {
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
    onSubmit: sendEmail,
    enableReinitialize: true,
  });

  return (
    <ContentWrapper>
      <Spinner show={loading} />
      <div className="block-center mt-4 wd-xl">
        <img className="img-fluid" src="img/text_logo_dark.png" alt="App Logo" />
        <div className="card card-flat">
          <div className="card-body">
            <p className="text-center py-2">
              <FormattedMessage {...messages.recoverPasswordTitle} />
            </p>
            <form className="mb-3" name="formLogin" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group with-focus">
                  <Input
                    type="email"
                    className="border-right-0"
                    name={fieldsName.EMAIL}
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[fieldsName.EMAIL]}
                    invalid={Boolean(
                      touched[fieldsName.EMAIL] && errors[fieldsName.EMAIL]
                    )}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text text-muted bg-transparent border-left-0">
                      <em className="fa fa-lock"></em>
                    </span>
                  </div>
                  {errors.email && (
                    <span className="invalid-feedback">
                      {touched[fieldsName.EMAIL] && errors[fieldsName.EMAIL]}
                    </span>
                  )}
                </div>
              </div>
              <button className="btn btn-block btn-primary mt-3" type="submit">
                <FormattedMessage {...messages.sendEmailButtonLabel} />
              </button>
              <ErrorPagesLinksFooter />
            </form>
          </div>
        </div>
        <div className="p-3 text-center">
          <span>My Food App</span>
        </div>
      </div>
    </ContentWrapper>
  );
};

RecoverPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  sendEmail: PropTypes.func.isRequired,
};

export default RecoverPassword;
