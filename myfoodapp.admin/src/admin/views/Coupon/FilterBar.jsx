import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Select } from '../../../common/Forms';
import { Search } from '../../../common/components';
import { COUPON_TYPES } from './CouponHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const FilterBar = ({ onFiltersApplied }) => {
  const { formatMessage } = useIntl();
  const [term, setTerm] = useState('');
  const [typeId, setTypeId] = useState(0);
  const typesList = [
    { value: 0, label: formatMessage(globalMessages.all) },
    ...Object.keys(COUPON_TYPES).map((key) => ({
      value: COUPON_TYPES[key],
      label: formatMessage(messages[`${key}FieldLabel`]),
    })),
  ];

  useEffect(() => {
    onFiltersApplied({ term, typeId });
  }, [term, typeId, onFiltersApplied]);

  const handleSelect = ({ target: { value } }) => setTypeId(value);

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
          value={typeId}
          onChange={handleSelect}
          options={typesList}
        />
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  onFiltersApplied: PropTypes.func,
};

export default FilterBar;
