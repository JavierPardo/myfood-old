import React from 'react';
import ReactSelect from '../components/Select';
import PropTypes from 'prop-types';

export const findInSelectList = (id, options) =>
  options.find(({ value }) => value === id);

const Select = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  invalid,
}) => {
  const selectedOption = options.find(
    ({ value: optValue }) => optValue === value
  );

  const handleChage = ({ value }) => onChange({ target: { value, name } });
  return (
    <ReactSelect
      className={invalid ? 'is-invalid' : ''}
      name={name}
      value={selectedOption}
      onChange={handleChage}
      options={options}
      placeholder={placeholder}
      isDisabled={disabled}
    />
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })
  ).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
};

Select.defaultProps = {
  value: '',
  placeholder: 'Seleccionar...',
  disabled: false,
  invalid: false,
};

export default Select;
