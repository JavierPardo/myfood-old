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

  const reportData = reports != undefined ? reports.operationalsTimesByDateReport : [];

  const columns = [
    { id: 'id', key: 'id', numeric: false, disablePadding: false, label: formatMessage(messages.operationalId) },
    { id: 'dateTimeDone', key: 'dateTimeDone',numeric: false, disablePadding: false, label: formatMessage(messages.dateTimeDone) },
    { id: 'eventTypeName', key: 'eventTypeName', numeric: false, disablePadding: false, label: formatMessage(messages.eventTypeName) },
    { id: 'dateTimeRejected', key: 'dateTimeRejected', numeric: false, disablePadding: false, label: formatMessage(messages.dateTimeRejected) },
    { id: 'responseTime', key: 'responseTime', numeric: false, disablePadding: false, label: formatMessage(messages.responseTime) },
    { id: 'processOrderTime', key: 'processOrderTime', numeric: false, disablePadding: false, label: formatMessage(messages.processOrderTime) },
    { id: 'timeEvent', key: 'timeEvent', numeric: false, disablePadding: false, label: formatMessage(messages.timeEvent) },
    { id: 'dispatchTime', key: 'dispatchTime', numeric: false, disablePadding: false, label: formatMessage(messages.dispatchTime) },
    { id: 'orderStatus', key: 'orderStatus', numeric: false, disablePadding: false, label: formatMessage(messages.orderStatus) },
  ];

  const footerData = reports != undefined ? [
    {
      "placeholder01": null,
      "placeholder02": null,
      "placeholder03": null,
      "placeholder04": null,
      "avgResponseTimeBs": reports.avgResponseTimeBs != null ? reports.avgResponseTimeBs.toFixed(2) : "-",
      "avgProcessOrderTimeBs": reports.avgProcessOrderTimeBs != null ? reports.avgProcessOrderTimeBs.toFixed(2) : "-",
      "placeholder05": null,
      "placeholder06": null,
      "placeholder07": null,
    }
  ] : [];

  const footerColumns = [
    [
      { id: 'placeholder01', label: "" },
      { id: 'placeholder02', label: "" },
      { id: 'placeholder03', label: "" },
      { id: 'placeholder04', label: "" },
      { id: 'avgResponseTimeBs', label: formatMessage(messages.avgResponseTimeBs) },
      { id: 'avgProcessOrderTimeBs', label: formatMessage(messages.avgProcessOrderTimeBs) },
      { id: 'placeholder05', label: "" },
      { id: 'placeholder06', label: "" },
      { id: 'placeholder07', label: "" },
    ]
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
              footerData={footerData}
              footerColumns={footerColumns}
              isLoading={loading}
              minWidth={1000}
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
