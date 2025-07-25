import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup } from 'reactstrap';

import styles from './InLineField.module.css';

const GroupWrapper = ({ wrapInGroup, children }) => {
  return wrapInGroup ? <InputGroup>{children}</InputGroup> : children;
};

export const InLineField = ({
  labelText,
  labelRequired,
  error,
  children,
  wrapInGroup,
}) => {
  return (
    <FormGroup row>
      <label
        className={`col-xl-3 col-lg-4 col-12 col-form-label ${styles.inLineFormLabel}`}
      >
        {labelText}
        {labelRequired ? ' *' : ''}
      </label>
      <div className="col-xl-9 col-lg-8 col-12">
        <GroupWrapper wrapInGroup={wrapInGroup}>
          {children}
          {error && <span className="invalid-feedback d-block">{error}</span>}
        </GroupWrapper>
      </div>
    </FormGroup>
  );
};

InLineField.defaultProps = {
  labelText: '',
  labeRequired: false,
  wrapInGroup: false,
  error: '',
};

InLineField.propTypes = {
  labelText: PropTypes.node,
  labelRequired: PropTypes.bool,
  wrapInGroup: PropTypes.bool,
  error: PropTypes.string,
};

export default InLineField;
