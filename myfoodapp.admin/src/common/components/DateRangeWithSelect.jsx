import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import globalMessages from '../globalMessages';
import DateRange from './DateRange';
import Select from '../Forms/Select';
import { Col, Row } from 'reactstrap';
import * as moment from 'moment';

const DateRangeWithSelect = ({ onDateRangeChange, nameComponent, fromDate, toDate, datePrefixed, calendarDisable }) => {
  const { formatMessage } = useIntl();
  const TODAY = 0;
  const THIS_MONTH = 1;
  const LAST_MONTH = 2;
  const THIS_YEAR = 3;
  const DATES_RANGES = 4;

  const statusList = [
    { value: TODAY, label: formatMessage(globalMessages.today) },
    { value: THIS_MONTH, label: formatMessage(globalMessages.thisMonth) },
    { value: LAST_MONTH, label: formatMessage(globalMessages.lastMonth) },
    { value: THIS_YEAR, label: formatMessage(globalMessages.thisYear) },
    { value: DATES_RANGES, label: formatMessage(globalMessages.datesRanges) },
  ];

  function changeDropdownHandler({ target: { value, name } }){
    if(name == "datePrefixed"){
      var today = new Date();
      var fromDate;
      var toDate;
      var customDateDisable;
      switch (value) {
        case TODAY:
          fromDate = moment(today);
          toDate = moment(today);
          customDateDisable = true;
          break;
        case THIS_MONTH:
          fromDate = moment(new Date(today.getFullYear(), today.getMonth(), 1));
          // toDate = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0));
          toDate = moment(today);
          customDateDisable = true;
          break;
        case LAST_MONTH:
          today.setMonth(today.getMonth() - 1);
          fromDate = moment(new Date(today.getFullYear(), today.getMonth(), 1));
          toDate = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0));
          customDateDisable = true;
          break;
        case THIS_YEAR:
          fromDate = moment(new Date(today.getFullYear(), 0, 1));
          // toDate = moment(new Date(today.getFullYear() + 1, 0, 0));
          toDate = moment(today);
          customDateDisable = true;
          break;
        case DATES_RANGES:
          fromDate = moment(today);
          toDate = moment(today);
          customDateDisable = false;
          break;
        default:
          customDateDisable = true;
      }

      onDateRangeChange({
        target: [
          {
            value: fromDate,
            name: `from${nameComponent}`,
          },
          {
            value: toDate,
            name: `to${nameComponent}`,
          },
          {
            value: value,
            name: `datePrefixed`,
          },
          {
            value: customDateDisable,
            name: `calendarDisable`,
          },
        ]
      });
    }
  }

  return (
    <>
      <Row>
        <Col lg="6">
          <Select
            name="datePrefixed"
            value={datePrefixed}
            onChange={changeDropdownHandler}
            options={statusList}
          />
        </Col>
        <Col>
          <DateRange
              name={nameComponent}
              onDateRangeChange={onDateRangeChange}
              disabled={calendarDisable}
              fromDate={fromDate}
              toDate={toDate}
            />
        </Col>
      </Row>
    </>
  );
};

DateRangeWithSelect.propTypes = {
  fromDate: PropTypes.object, //moment object
  toDate: PropTypes.object, //moment object
  name: PropTypes.string,
  onDateRangeChange: PropTypes.func,
};

export default DateRangeWithSelect;
