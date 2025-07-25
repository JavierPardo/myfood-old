import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';

const ToggleButtons = ({ buttons, selectedValue, onChange, size }) => {
  const handleChange = ({ target: { value } }) => onChange(value);

  return (
    <ButtonGroup size={size}>
      {buttons.map(({ label, value }) => (
        <Button
          value={value}
          color={selectedValue === value ? 'primary' : 'secondary'}
          onClick={handleChange}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

ToggleButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ),
  selectedValue: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
};

ToggleButtons.defaultProps = {
  size: '',
};

export default ToggleButtons;
