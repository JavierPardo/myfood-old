import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Col, Input, Row } from 'reactstrap';
import { useFormik } from 'formik';
import { FormattedMessage } from 'react-intl';

import formConstants from '../../Forms/constants';
import useLogin from './useLogin';
import messages from './messages';
import { TranslationContext } from '../../contexts/TranslationContext';
import { userHttp } from '../../../services/http';

import Carousel from './Carousel';

const initialValues = {
  email: '',
  password: '',
};

const buildSchema = (yup) =>
  yup.object().shape({
    email: yup.string().max(formConstants.MAX_INPUT_CHARS).email().required(),
    password: yup.string().max(formConstants.MAX_INPUT_CHARS).required(),
  });

const Login = () => {
  const { onSubmit } = useLogin();
  const { yup } = useContext(TranslationContext);
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema: buildSchema(yup),
    onSubmit,
  });

  function clickExternalLoginHandler(provider) {
    return function () {
      userHttp.externalLogin(provider).then(function (response) {});
    };
  }

  return (
    <Container fluid style={{ backgroundColor: '#F9FAFC' }}>
      <Row>
        <Col
          xs="12"
          xl="4"
          className="min-vh-100 d-flex align-items-center justify-content-center"
        >
          <div style={{ width: '70%' }}>
            <img
              className="img-fluid"
              src="img/text_logo_dark.png"
              alt="App Logo"
            />
            <p className="my-5">
              <FormattedMessage {...messages.loginTitle} />
            </p>
            <form className="mb-3" name="formLogin" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group with-focus">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    className="border-right-0"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={values.email}
                    invalid={Boolean(errors.email)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text text-muted bg-transparent border-left-0">
                      <em className="fa fa-envelope"></em>
                    </span>
                  </div>
                  {errors.email && (
                    <span className="invalid-feedback">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="id-password">Password</label>
                <div className="input-group with-focus">
                  <Input
                    type="password"
                    id="id-password"
                    name="password"
                    className="border-right-0"
                    placeholder="Password"
                    invalid={Boolean(errors.password)}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text text-muted bg-transparent border-left-0">
                      <em className="fa fa-lock"></em>
                    </span>
                  </div>
                  {errors.password && (
                    <span className="invalid-feedback">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="text-center">
                <Link to="recoverpassword" className="text-danger">
                  <FormattedMessage {...messages.forgotPassword} />
                </Link>
              </div>
              <Button color="primary" block className="mt-3" type="submit">
                <FormattedMessage {...messages.loginButtonLabel} />
              </Button>
              <p className="text-muted text-center my-4">or login with</p>
              <Row>
                <Col>
                  <Button
                    color="danger"
                    onClick={clickExternalLoginHandler('google')}
                    block
                  >
                    Google
                  </Button>
                </Col>
                <Col>
                  <Button
                    color="primary"
                    onClick={clickExternalLoginHandler('Facebook')}
                    block
                  >
                    Facebook
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
        <Col
          xs="12"
          xl="8"
          className="min-vh-100 p-0 d-flex align-items-center"
          style={{
            background:
              'linear-gradient(232.72deg, #DA2D2B -22.83%, rgba(255, 255, 255, 0) 100%), #F6991D',
          }}
        >
          <Carousel />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
