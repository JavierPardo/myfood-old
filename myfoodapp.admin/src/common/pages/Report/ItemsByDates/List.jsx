import React from 'react';
import { useIntl } from 'react-intl';
import messages from './messages';
import globalMessages from '../../../globalMessages';
import {
  Spinner,
  ContentWrapper,
  PageHeader,
  DataTable,
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
import { memoize } from 'lodash';
import DateRangeWithSelect from '../../../components/DateRangeWithSelect';
import * as moment from 'moment';

const generateColumns = memoize(function ({
  formatMessage,
}) {
  return [
    { name: formatMessage(messages.position), selector: 'position', sortable: true },
    { name: formatMessage(messages.itemName), selector: 'itemName', sortable: true },
    { name: formatMessage(messages.totalAmount), selector: 'totalAmount', sortable: true },
    { name: formatMessage(messages.eventTypeName), selector: 'eventTypeName', sortable: true },
  ];
});

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

  const columns = generateColumns({
    formatMessage,
    isReadOnly,
  });

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
            <DataTable
              columns={columns}
              data={reports}
              isLoading={loading}
              pagination
              className="stripped-data-table"
            />
          </CardBody>
        </Card>
      </ContentWrapper>
    </>
  );
}
