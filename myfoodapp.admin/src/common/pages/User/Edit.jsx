import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import { PageHeader, ContentWrapper } from '../../components';
import { Col, Row, Jumbotron, Input, Form } from 'reactstrap';
import { useFormik } from 'formik';
import formConstants from '../../Forms/constants';
import { userHttp } from '../../../services/http';
import { TranslationContext } from '../../contexts/TranslationContext';
import { useContext } from 'react';
const initialValues = {
  email: '',
  firstName: '',
  password: '',
  lastName: '',
};
export default function Edit() {
  const { formatMessage } = useIntl();
  const { yup } = useContext(TranslationContext);
  const isEdit = false;

  const onSubmit = (user) => {
    userHttp
      .register(user)
      // .then((token) => {
      //     localStorage.setItem('token', token);
      //     return userHttp.getCurrentUser();
      // })
      // .then((user) => {
      //     updateUser(user);
      //     history.push('/admin');
      // })
      .catch(() => {
        //history.push('/500');
      });
  };
  const buildSchema = (yup) =>
    yup.object().shape({
      firstName: yup.string().max(formConstants.MAX_INPUT_CHARS).required(),
      lastName: yup.string().max(formConstants.MAX_INPUT_CHARS).required(),
      email: yup.string().max(formConstants.MAX_INPUT_CHARS).email().required(),
      password: yup.string().max(formConstants.MAX_INPUT_CHARS).required(),
    });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues,
    validationSchema: buildSchema(yup),
    onSubmit,
  });

  const buttons = [
    {
      label: formatMessage(messages.createTitle),
      icon: 'fa-save',
      style: 'btn-primary',
      onClick: handleSubmit,
    },
  ];

  return (
    <ContentWrapper>
      <PageHeader
        title={formatMessage(
          isEdit ? messages.editTitle : messages.createTitle
        )}
        buttons={buttons}
      />
      <Row>
        <Col xs={{ size: 10, offset: 1 }}>
          <Jumbotron>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={{ size: 5 }}>
                  <Input
                    type="firstName"
                    name="firstName"
                    className="border-right-0"
                    placeholder={formatMessage(messages.user.firstName)}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={{ size: 5, offset: 2 }}>
                  <Input
                    type="lastName"
                    name="lastName"
                    className="border-right-0"
                    placeholder={formatMessage(messages.user.lastName)}
                    onChange={handleChange}
                    value={values.lastName}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={{ size: 5 }}>
                  <Input
                    type="email"
                    name="email"
                    className="border-right-0"
                    placeholder={formatMessage(messages.user.email)}
                    onChange={handleChange}
                    value={values.email}
                    invalid={Boolean(errors.email)}
                  />
                </Col>
                <Col xs={{ size: 5, offset: 2 }}>
                  <Input
                    type="password"
                    name="password"
                    className="border-right-0"
                    placeholder={formatMessage(messages.user.password)}
                    onChange={handleChange}
                    value={values.password}
                  />
                </Col>
              </Row>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </ContentWrapper>
  );
}
