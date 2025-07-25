import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import globalMessages from '../globalMessages';
import { DatePicker } from '../Forms';
import { Col, Row } from 'reactstrap';
import * as moment from 'moment';

const DateRange = ({ onDateRangeChange, name, fromDate, toDate, disabled }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Row>
        <Col>
          <DatePicker
            noRestriction
            disabled={disabled}
            placeholder={formatMessage(globalMessages.fromDate)}
            value={fromDate}
            onChange={function (value) {
              onDateRangeChange({
                target: {
                  value: moment(value.toDate()).startOf('day'),
                  name: `from${name}`,
                },
              });
            }}
          ></DatePicker>
        </Col>
        <Col>
          <DatePicker
            noRestriction
            disabled={disabled}
            value={toDate}
            placeholder={formatMessage(globalMessages.toDate)}
            onChange={function (value) {
              onDateRangeChange({
                target: {
                  value: moment(value.toDate()).endOf('day'),
                  name: `to${name}`,
                },
              });
            }}
          ></DatePicker>
        </Col>
      </Row>
    </>
  );
};

DateRange.propTypes = {
  fromDate: PropTypes.object, //moment object
  toDate: PropTypes.object, //moment object
  name: PropTypes.string,
  onDateRangeChange: PropTypes.func,
};

export default DateRange;
