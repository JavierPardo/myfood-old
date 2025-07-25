import React from 'react';
import ReactSelect from 'react-select';

const styles = {
  placeholder: (base) => ({
    ...base,
    fontSize: '1rem',
    color: '#DFC9C9',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '1rem',
    color: '#495057',
    lineHeight: '1.52857',
  }),
  menuList: (base) => ({
    ...base,
    fontSize: '1rem',
    color: '#495057',
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: 'none',
    borderWidth: '1px',
    borderColor: state.isFocused ? '#66afe9' : '#dde6e9',
    '&:hover': {
      borderColor: state.isFocused ? '#66afe9' : '#dde6e9',
    },
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    minHeight: '2.1875rem',
    height: '2.1875rem',
  }),
  container: (base) => ({
    ...base,
    padding: '0',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '2px 12px',
  }),
};

export default function Select(props) {
  return <ReactSelect styles={styles} {...props} />;
}
