import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import * as moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/es';

const DatePicker = ({
  value,
  format,
  time,
  placeholder,
  minDate,
  disabled,
  onChange,
  maxDate,
  invalid,
}) => {
  const handleChange = (date) => {
    const momentDate = time
      ? moment(date).utc()
      : moment(date).startOf('day').utc();
    onChange(momentDate);
  };
  const valueInLocal = value ? moment(value).local() : undefined;
  const style = disabled ? {} : { backgroundColor: '#fff' };
  const inputClassName = `form-control ${invalid ? 'is-invalid' : ''}`;
  const applyRestrictions = (current) =>
    !minDate || current.isAfter(moment(minDate).subtract(1, 'day'));
  return (
    <Datetime
      locale="es"
      closeOnSelect={!time}
      dateFormat={format}
      timeFormat={time ? time : false}
      value={valueInLocal}
      isValidDate={applyRestrictions}
      inputProps={{
        className: inputClassName,
        readOnly: true,
        disabled,
        placeholder,
        style,
      }}
      onChange={handleChange}
    />
  );
};

DatePicker.propTypes = {
  value: PropTypes.object, //moment object
  format: PropTypes.string,
  time: PropTypes.string,
  minDate: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
};

export default DatePicker;
