import React from 'react';
import PropTypes from 'prop-types';

const sizes = ['', 'sm', 'lg'];

const Switch = ({ name, checked, onChange, size, style, disabled }) => {
  if (disabled) {
    return <div style={style}>{checked ? 'Si' : 'No'}</div>;
  }
  const sizeClass = size ? `switch-${size}` : '';
  return (
    <label className={`switch ${sizeClass}`} style={style}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <span></span>
    </label>
  );
};

Switch.defaultProps = {
  checked: false,
  onChange: () => {},
  size: '',
};

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(sizes),
  style: PropTypes.object,
};

export default Switch;
