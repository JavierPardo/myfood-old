import React from 'react';
// import PropTypes from 'prop-types';
import globalMessages from '../globalMessages';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from 'reactstrap';
import { CSVLink, CSVDownload } from "react-csv";

export default function ReportCSV({ ...props }) {
  const { title, data, columns } = props;
  const { formatMessage } = useIntl();
  const dt = new Date();

  return (
      <Button
        color="link"
        color={'link'}
      >
        <CSVLink
          data={data}
          headers={columns} 
          style={{textDecoration: 'inherit', color: 'inherit'}}
          filename={
            `${title.replaceAll(" ","-").toLowerCase()}-${
              dt.getFullYear().toString().padStart(4, '0')}${
              (dt.getMonth()+1).toString().padStart(2, '0')}${
              dt.getDate().toString().padStart(2, '0')}.csv`
          }>
          {formatMessage(globalMessages.downloadCsv)}
        </CSVLink>
      </Button>
  );
}
