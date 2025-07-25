import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Card,
  CardHeader,
} from 'reactstrap';
import memoize from 'memoize-one';

import { constants as formConstants } from '../Forms';
import { TranslationContext } from '../contexts/TranslationContext';

const TO_ADD = 'itemToAdd';
const initAddField = { [TO_ADD]: '' };

const buildSchema = memoize((yup, inputLabel) =>
  yup.object().shape({
    [TO_ADD]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(inputLabel),
  })
);

const ItemCard = ({ title, onRemove, isReadOnly }) => (
  <Card className="card-default mb-1 mt-1" style={{ borderTopWidth: '1px' }}>
    <CardHeader>
      {title}
      <div className="float-right">
        {!isReadOnly && (
          <em
            onClick={onRemove.bind(null, title)}
            className="danger fa fa-times"
            style={{ cursor: 'pointer' }}
          ></em>
        )}
      </div>
    </CardHeader>
  </Card>
);

const AddToList = ({
  items,
  inputLabel,
  onAddHandler,
  onRemoveHandler,
  isReadOnly,
}) => {
  const { yup } = useContext(TranslationContext);

  const onAddClicked = (values) => {
    onAddHandler(values[TO_ADD]);
    resetForm();
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initAddField,
    validationSchema: buildSchema(yup, inputLabel),
    onSubmit: onAddClicked,
    enableReinitialize: true,
  });

  if (isReadOnly) {
    return (
      <>
        {items.map((item) => (
          <ItemCard key={item} title={item} isReadOnly={isReadOnly} />
        ))}
      </>
    );
  }

  return (
    <>
      <InputGroup className="mb-4">
        <Input
          placeholder={inputLabel}
          type="text"
          name={TO_ADD}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[TO_ADD]}
          invalid={Boolean(touched[TO_ADD] && errors[TO_ADD])}
        />
        <InputGroupAddon addonType="append">
          <Button color="info" onClick={handleSubmit}>
            <em className="fas fa-fw fa-plus" />
          </Button>
        </InputGroupAddon>
        {touched[TO_ADD] && errors[TO_ADD] && (
          <span className="invalid-feedback">{errors[TO_ADD]}</span>
        )}
      </InputGroup>
      {items.map((item) => (
        <ItemCard key={item} title={item} onRemove={onRemoveHandler} />
      ))}
    </>
  );
};

AddToList.defaultProps = {
  onAddHandler: () => {},
  onRemoveHandler: () => {},
  inputLabel: 'type an item to add',
  items: [],
  isReadOnly: false,
};

AddToList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  inputLabel: PropTypes.string,
  onAddHandler: PropTypes.func,
  onRemoveHandler: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

export default AddToList;
