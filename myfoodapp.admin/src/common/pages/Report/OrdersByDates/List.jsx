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

  const reportData = reports != undefined ? reports.ordersDetailByDateReport : [];

  const columns = [
    { id: 'id', key: 'id', numeric: false, disablePadding: false, label: formatMessage(messages.orderId) },
    { id: 'date', key: 'date',numeric: false, disablePadding: false, label: formatMessage(messages.date) },
    { id: 'time', key: 'time', numeric: false, disablePadding: false, label: formatMessage(messages.time) },
    { id: 'totalAmount', key: 'totalAmount', numeric: false, disablePadding: false, label: formatMessage(messages.totalAmount) },
    { id: 'fullNameAppUser', key: 'fullNameAppUser', numeric: false, disablePadding: false, label: formatMessage(messages.fullNameAppUser) },
    { id: 'eventTypeName', key: 'eventTypeName', numeric: false, disablePadding: false, label: formatMessage(messages.eventTypeName) },
    { id: 'deliveryCost', key: 'deliveryCost', numeric: false, disablePadding: false, label: formatMessage(messages.deliveryCost) },
    { id: 'totalOrderPlusDeliveryCost', key: 'totalOrderPlusDeliveryCost', numeric: false, disablePadding: false, label: formatMessage(messages.totalOrderPlusDeliveryCost) },
    { id: 'totalPaidMinusTransaction', key: 'totalPaidMinusTransaction', numeric: false, disablePadding: false, label: formatMessage(messages.totalPaidMinusTransaction) },
    { id: 'transactionId', key: 'transactionId', numeric: false, disablePadding: false, label: formatMessage(messages.transactionId) },
    { id: 'amountItems', key: 'amountItems', numeric: false, disablePadding: false, label: formatMessage(messages.amountItems) },
  ];

  const footerData = reports != undefined ? [
    {
      "amountOrders": reports.amountOrders,
      "placeholder01": null,
      "placeholder02": null,
      "totalAmountTotalBs": reports.totalAmountTotalBs.toFixed(2),
      "placeholder03": null,
      "placeholder04": null,
      "deliveryCostTotalBs": reports.deliveryCostTotalBs.toFixed(2),
      "placeholder05": null,
      "placeholder06": null,
      "placeholder07": null,
      "amountItemsTotalBs": reports.amountItemsTotalBs.toFixed(2),
    },
    {
      "placeholder00": null,
      "placeholder01": null,
      "placeholder02": null,
      "totalAmountAvgBs": reports.totalAmountAvgBs.toFixed(2),
      "placeholder03": null,
      "placeholder04": null,
      "deliveryCostAvgBs": reports.deliveryCostAvgBs.toFixed(2),
      "placeholder05": null,
      "placeholder06": null,
      "placeholder07": null,
      "amountItemsAvgBs": reports.amountItemsAvgBs.toFixed(2),
    }
  ] : [];

  const footerColumns = [
    [
      { id: 'amountOrders', label: formatMessage(messages.amountOrders) },
      { id: 'placeholder01', label: "" },
      { id: 'placeholder02', label: "" },
      { id: 'totalAmountTotalBs', label: formatMessage(messages.totalAmountTotalBs) },
      { id: 'placeholder03', label: "" },
      { id: 'placeholder04', label: "" },
      { id: 'deliveryCostTotalBs', label: formatMessage(messages.deliveryCostTotalBs) },
      { id: 'placeholder05', label: "" },
      { id: 'placeholder06', label: "" },
      { id: 'placeholder07', label: "" },
      { id: 'amountItemsTotalBs', label: formatMessage(messages.amountItemsTotalBs) },
    ],
    [
      { id: 'placeholder00', label: "" },
      { id: 'placeholder01', label: "" },
      { id: 'placeholder02', label: "" },
      { id: 'totalAmountAvgBs', label: formatMessage(messages.totalAmountAvgBs) },
      { id: 'placeholder03', label: "" },
      { id: 'placeholder04', label: "" },
      { id: 'deliveryCostAvgBs', label: formatMessage(messages.deliveryCostAvgBs) },
      { id: 'placeholder05', label: "" },
      { id: 'placeholder06', label: "" },
      { id: 'placeholder07', label: "" },
      { id: 'amountItemsAvgBs', label: formatMessage(messages.amountItemsAvgBs) },
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
              minWidth={1350}
              pdfCellWidth={47}
              pdfFontSize={6}
              pagination
              className="stripped-data-table"
            />
          </CardBody>
        </Card>
      </ContentWrapper>
    </>
  );
}
