import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const AsyncSwitch = ({ checked, updateFn, errorMessage }) => {
  const [shouldBeChecked, setShouldBeChecked] = useState(checked);

  const toggle = () => {
    setShouldBeChecked(!shouldBeChecked);
    updateFn(!shouldBeChecked).catch(() => {
      toast.error(errorMessage);
      setShouldBeChecked(shouldBeChecked);
    });
  };
  return (
    <label className="switch switch-sm">
      <input type="checkbox" checked={shouldBeChecked} onChange={toggle} />
      <span></span>
    </label>
  );
};

AsyncSwitch.defaultProps = {
  checked: false,
  errorMessage: 'unknown error',
};

AsyncSwitch.propTypes = {
  checked: PropTypes.bool,
  updateFn: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default AsyncSwitch;
