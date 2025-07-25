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
import { renderEnum, dateToString } from '../../../utils';
import DateRangeWithSelect from '../../../components/DateRangeWithSelect';
import * as moment from 'moment';

const generateColumns = memoize(function ({
  formatMessage,
  metadata,
}) {
  return [
    { name: formatMessage(messages.reportId), selector: 'id', sortable: true },
    {
      name: formatMessage(messages.user),
      selector: 'appUserId',
      cell: function (report) {
        return report.user.email;
      },
      sortable: true,
    },
    {
      name: formatMessage(messages.startDate),
      selector: 'startDateTime',
      cell: dateToString.bind(
        {},
        {
          formatDate: formatMessage(globalMessages.completeFormatDate),
          propertyName: 'startDateTime',
        }
      ),
      sortable: true,
    },
    {
      name: formatMessage(messages.eventStatus),
      selector: 'currentStatusId',
      cell: renderEnum.bind({}, metadata.eventStatus, 'currentStatusId'),
      sortable: true,
    },
    {
      name: formatMessage(messages.eventType),
      selector: 'typeId',
      cell: renderEnum.bind({}, metadata.eventTypes, 'typeId'),
      sortable: true,
    },
    {
      name: formatMessage(messages.amount),
      selector: 'totalAmount',
      sortable: true,
    },
  ];
});

const initialFilter = {
  userName: '',
  id: '',
  datePrefixed: 0,
  calendarDisable: true,
  fromDate: moment(Date.now()),
  toDate: moment(Date.now()),
  status: 'all',
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
  const [filters, setFilters] = useState(initialFilter);
  const {
    reports,
    loading,
    refresh,
    metadata,
  } = useReportList();

  const { formatMessage } = useIntl();

  const columns = generateColumns({
    formatMessage,
    metadata,
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

  const reportsFiltered = reports.filter(function (report) {
    return (
      (!filters.id || report.id.toString().includes(filters.id)) &&
      (filters.status === 'all' ||
        report.currentStatusId.toString() === filters.status) &&
      (!filters.userName || report.user.email.includes(filters.userName)) &&
      (!filters.fromDate ||
        filters.fromDate
          .startOf('day')
          .isSameOrBefore(report.startDateTime, 'day')) &&
      (!filters.toDate ||
        filters.toDate.endOf('day').isSameOrAfter(report.startDateTime, 'day'))
    );
  });
  function filterChangedHandler(filters) {
    setFilters({ ...filters });
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
            {reports && !!reports.length && (
              <FilterReports
                formatMessage={formatMessage}
                onChangeFilter={filterChangedHandler}
                statuses={metadata.eventStatus.map(function (status) {
                  return { ...status, value: status.id, label: status.name };
                })}
              />
            )}
            {/* <DataTable
              columns={columns}
              data={reportsFiltered}
              isLoading={loading}
              pagination
              className="stripped-data-table"
            /> */}
          </CardBody>
        </Card>
      </ContentWrapper>
    </>
  );
}
