import React from 'react';
import Table from 'react-data-table-component';
import { FormattedMessage, useIntl } from 'react-intl';
import globalMessages from '../globalMessages';
import Spinner from './Spinner';

const angleStyles = {
  table: {
    style: {
      color: '#656565',
      backgroundColor: '#fff',
    },
  },

  subHeader: {
    style: {
      padding: '4px 0px',
    },
  },

  headRow: {
    style: {
      borderBottomWidth: '2px',
      borderBottomColor: '#eee',
      borderBottomStyle: 'solid',
    },
  },

  headCells: {
    style: {
      fontSize: '.875rem',
      fontWeight: '500',
      color: '#888',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '14px',
      paddingBottom: '14px',
    },
    activeSortStyle: {
      color: '#888',
      '&:focus': {
        outline: 'none',
      },
      '&:hover:not(:focus)': {
        color: '#888',
      },
    },
  },

  rows: {
    style: {
      fontSize: '.875rem',
      color: '#656565',
      fontFamily: 'Source Sans Pro,sans-serif;',
      fontWeight: '400',
      lineHeight: '1.52857',
      wordWrap: 'break-word',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#eee',
      },
    },
    stripedStyle: {
      '&:nth-of-type(odd)': {
        color: '#656565',
        backgroundColor: '#fafbfc',
      },
    },
  },
  pagination: {
    style: {
      color: '#656565',
      fontSize: '.875rem',
      fontFamily: 'Source Sans Pro,sans-serif;',
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      borderTopColor: '#eee',
    },
  },
};

const DataTable = ({ isLoading, ...props }) => {
  const { formatMessage } = useIntl();
  const paginationLabels = {
    rowsPerPageText: formatMessage(globalMessages.rowsPerPageLabel),
    rangeSeparatorText: formatMessage(globalMessages.ofConector),
  };
  const message = <FormattedMessage {...globalMessages.emptyTable} />;
  return (
    <>
      <Spinner show={isLoading} />
      <Table
        striped
        responsive
        customStyles={angleStyles}
        noDataComponent={isLoading ? '' : message}
        paginationComponentOptions={paginationLabels}
        {...props}
      />
    </>
  );
};

export default DataTable;
