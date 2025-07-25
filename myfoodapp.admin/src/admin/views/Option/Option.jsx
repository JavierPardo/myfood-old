import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import { Input } from 'reactstrap';

import {
  constants as formConstants,
  InlineField,
  Switch,
} from '../../../common/Forms';
import { TranslationContext } from '../../../common/contexts/TranslationContext';
import { ModalContext } from '../../../common/contexts/ModalContext';
import { AddToList } from '../../../common/components';
import { fieldsName } from './OptionHandler';
import messages from './messages';

const buildSchema = memoize((yup, formatMessage) =>
  yup.object().shape({
    [fieldsName.NAME]: yup
      .string()
      .required()
      .max(formConstants.MAX_INPUT_CHARS)
      .label(formatMessage(messages.nameFieldLabel)),
    [fieldsName.ACTIVE]: yup
      .bool()
      .label(formatMessage(messages.isActiveFieldLabel)),
  })
);

const Option = ({ loading, initValues, saveOption, isReadOnly }) => {
  const { formatMessage } = useIntl();
  const { yup } = useContext(TranslationContext);
  const { updateModalProps } = useContext(ModalContext);

  const addItemToChoices = (item) =>
    setFieldValue(fieldsName.CHOICES, [item, ...values[fieldsName.CHOICES]]);

  const removeItemFromChoices = (item) => {
    const whitoutItem = values[fieldsName.CHOICES].filter((it) => it !== item);
    setFieldValue(fieldsName.CHOICES, whitoutItem);
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initValues,
    validationSchema: buildSchema(yup, formatMessage),
    onSubmit: saveOption,
    enableReinitialize: true,
  });
  useEffect(() => {
    updateModalProps({ onAccept: handleSubmit }, true);
  }, []);

  return (
    <>
      <div className="form-horizontal">
        <InlineField
          labelText={formatMessage(messages.nameFieldLabel)}
          error={touched[fieldsName.NAME] && errors[fieldsName.NAME]}
        >
          <Input
            type="text"
            name={fieldsName.NAME}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[fieldsName.NAME]}
            invalid={Boolean(
              touched[fieldsName.NAME] && errors[fieldsName.NAME]
            )}
            disabled={isReadOnly}
          />
        </InlineField>
        <InlineField
          labelText={formatMessage(messages.isActiveFieldLabel)}
          error={errors[fieldsName.ACTIVE]}
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
      <AddToList
        items={values[fieldsName.CHOICES]}
        onAddHandler={addItemToChoices}
        onRemoveHandler={removeItemFromChoices}
        inputLabel={formatMessage(messages.typeItemToAdd)}
        isReadOnly={isReadOnly}
      />
    </>
  );
};
Option.propTypes = {
  loading: PropTypes.bool.isRequired,
  initValues: PropTypes.object.isRequired,
  saveOption: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default Option;
