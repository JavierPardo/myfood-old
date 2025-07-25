import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import globalMessages from '../../../globalMessages';
import {
  Spinner,
  ContentWrapper,
  PageHeader,
} from '../../../components';
import useReportList from './useReportList';
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { useState } from 'react';
import DateRangeWithSelect from '../../../components/DateRangeWithSelect';
import * as moment from 'moment';
import ReportTable from '../../../components/ReportTable';

const initialFilter = {
  datePrefixed: 0,
  calendarDisable: true,
  fromDate: moment(Date.now()),
  toDate: moment(Date.now()),
};
function FilterReports({ onChangeFilter, formatMessage }) {
  const [filter, setFilter] = useState({ ...initialFilter });
  function clickChangeFilterHandler() {
    onChangeFilter(filter);
  }

  function clickClearFilterHandler() {
    setFilter({ ...initialFilter });
    onChangeFilter({ ...initialFilter });
  }

  function changeFilterHandler(value) {
    if(value.target.length != undefined){
      value.target.forEach(element => {
        setFilter(filter => ({ ...filter, [element.name]: element.value }));  
      });
    }else{
      setFilter({ ...filter, [value.target.name]: value.target.value });
    }
  }

  return (
    <>
      <h3>Filtrar por:</h3>
      <Row>
        <Col lg="8">
          {formatMessage(messages.rangeDate)}:<br />
          <DateRangeWithSelect
            nameComponent="Date"
            onDateRangeChange={changeFilterHandler}
            calendarDisable={filter.calendarDisable}
            datePrefixed={filter.datePrefixed}
            fromDate={filter.fromDate}
            toDate={filter.toDate}
          />
        </Col>
        <Col className="d-flex flex-lg-row justify-content-center" lg="3">
          <Button
            color={'primary'}
            outline
            onClick={clickClearFilterHandler}
            className="btn-sm mt-4"
            style={{ flexGrow: 1 }}
          >
            <em className="fas fa-trash-alt"></em>&nbsp;
            {formatMessage(globalMessages.clearFilter)}
          </Button>
          <Button
            color={'primary'}
            onClick={clickChangeFilterHandler}
            className="ml-1 btn-sm mt-4"
            style={{ flexGrow: 1 }}
          >
            <em className="fas fa-search"></em>&nbsp;
            {formatMessage(globalMessages.searchLabel)}
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default function List({ isReadOnly }) {
  const {
    reports,
    loading,
    updateFilters,
    refresh,
  } = useReportList(initialFilter);

  const { formatMessage } = useIntl();

  const buttons = [
    {
      label: formatMessage(globalMessages.refreshButton),
      icon: 'fa-sync-alt',
      style: 'btn-secondary',
      onClick: refresh,
    },
  ];

  function filterChangedHandler(filters) {
    updateFilters(filters);
  }

  const reportData = reports != undefined ? reports : [];

  const columns = [
    { id: 'id', key: 'id', numeric: false, disablePadding: false, label: formatMessage(messages.reservationId) },
    { id: 'reservationDate', key: 'reservationDate',numeric: false, disablePadding: false, label: formatMessage(messages.reservationDate) },
    { id: 'reservationTime', key: 'reservationTime', numeric: false, disablePadding: false, label: formatMessage(messages.reservationTime) },
    { id: 'requestedDate', key: 'requestedDate', numeric: false, disablePadding: false, label: formatMessage(messages.requestedDate) },
    { id: 'requestedTime', key: 'requestedTime', numeric: false, disablePadding: false, label: formatMessage(messages.requestedTime) },
    { id: 'eventTypeName', key: 'eventTypeName', numeric: false, disablePadding: false, label: formatMessage(messages.eventTypeName) },
    { id: 'prepaid', key: 'prepaid', numeric: false, disablePadding: false, label: formatMessage(messages.prepaid) },
    { id: 'numberOfGuests', key: 'numberOfGuests', numeric: false, disablePadding: false, label: formatMessage(messages.numberOfGuests) },
  ];

  return (
    <>
      <ContentWrapper>
        <PageHeader
          title={formatMessage(messages.listTitle)}
          buttons={buttons}
        />

        <Card className="card-default">
          <Spinner show={loading} />
          <CardBody>
            <FilterReports
              formatMessage={formatMessage}
              onChangeFilter={filterChangedHandler}
            />
            <ReportTable
              title={formatMessage(messages.listTitle)}
              columns={columns}
              data={reportData}
              isLoading={loading}
              minWidth={1300}
              pdfCellWidth={65}
              pdfFontSize={8}
              pagination
              className="stripped-data-table"
            />
          </CardBody>
        </Card>
      </ContentWrapper>
    </>
  );
}
