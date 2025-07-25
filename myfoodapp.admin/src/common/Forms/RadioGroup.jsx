import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const RadioGroup = ({ name, checkedValue, options, onChange }) => {
  const handleChange = ({ target: { id, name, value } }) => {
    if (typeof checkedValue === 'number') {
      onChange({ target: { name, id, value: +value } });
      return;
    }
    onChange({ target: { id, name, value } });
  };
  return options.map(({ id, value, label }) => (
    <label className="c-radio mt-2 mr-2" key={id}>
      <Input
        id={id}
        type="radio"
        name={name}
        onChange={handleChange}
        value={value}
        checked={checkedValue === value}
      />
      <span className="fa fa-circle"></span>
      {label}
    </label>
  ));
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  checkedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};

export default RadioGroup;
