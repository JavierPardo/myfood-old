import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Select } from '../../../common/Forms';
import { Search, DateRange } from '../../../common/components';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const FilterBar = ({ statusDic, onFiltersApplied }) => {
  const { formatMessage } = useIntl();
  const [term, setTerm] = useState('');
  const [statusId, setStatusId] = useState(0);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const statusList = [
    { value: 0, label: formatMessage(globalMessages.all) },
    ...Object.keys(statusDic).map((key) => ({
      value: key,
      label: statusDic[key],
    })),
  ];

  useEffect(() => {
    onFiltersApplied({ term, statusId, dateRange });
  }, [term, statusId, dateRange, onFiltersApplied]);

  const clearFilters = () => {
    setTerm('');
    setStatusId(0);
    setDateRange({ from: null, to: null });
  };

  const handleSelect = ({ target: { value } }) => setStatusId(value);
  const handleDateRangeChange = ({ target: { name, value } }) => {
    const updatedRange = name.includes('from')
      ? { from: value }
      : { to: value };
    setDateRange({ ...dateRange, ...updatedRange });
  };

  return (
    <div className="form-row align-items-center mb-2">
      <div className="col-md-4">
        <Search
          placeholder={formatMessage(messages.searchPlaceholder)}
          onSearch={setTerm}
        />
      </div>
      <div className="col-md-2">
        <Select
          name="statusIdDdl"
          value={statusId}
          onChange={handleSelect}
          options={statusList}
        />
      </div>
      <div className="col-md-6 form-row">
        <div className="col-md-7 offset-md-2">
          <DateRange
            name="reservations"
            fromDate={dateRange.from}
            toDate={dateRange.to}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
        <div className="col-md-3 d-flex justify-content-end">
          <Button
            outline
            size="sm"
            color="info"
            type="button"
            onClick={clearFilters}
          >
            <em className={`fas fa-fw fa-trash-alt`} />
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  statusList: PropTypes.array,
  onFiltersApplied: PropTypes.func,
};

export default FilterBar;
