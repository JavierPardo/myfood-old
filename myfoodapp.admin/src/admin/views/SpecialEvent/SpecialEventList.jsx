import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';
import memoize from 'memoize-one';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
  DataTable,
  ToggleButtons,
} from '../../../common/components';
import { AsyncSwitch } from '../../../common/Forms';
import { sortByDate, formatDate } from '../../../common/utils';
import { renderPriceFormatted } from '../../../common/cmptUtils';
import { DATE_FORMAT } from '../../../common/globalConstants';
import { fieldsName } from './SpecialEventHandler';
import { ROUTES } from '../../../common/globalConstants';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import { FILTER_VALUES } from './SpecialEventListHandler';

const buildFilterButtons = (formatMessage) => [
  {
    label: formatMessage(messages.allFilterLabel),
    value: FILTER_VALUES.all,
  },
  {
    label: formatMessage(messages.futureFilterLabel),
    value: FILTER_VALUES.future,
  },
];

const renderButtons = ({ editAction, deleteAction }, { id }) => {
  return (
    <>
      <Button
        outline
        size="xs"
        color="danger"
        type="button"
        onClick={deleteAction.bind(null, id)}
        className="mr-2"
      >
        <em className={`fas fa-fw fa-trash-alt`} />
      </Button>
      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        onClick={editAction.bind(null, id)}
      >
        <em className={`fas fa-fw fa-pencil-alt`} />
      </Button>
    </>
  );
};

const renderLinkToShow = ({ id }) => (
  <Link to={ROUTES.specialEvent.preview.replace(':id', id)}>{id}</Link>
);

const renderSwitch = (
  { toggleActive },
  { [fieldsName.ACTIVE]: active, id }
) => {
  return <AsyncSwitch checked={active} updateFn={toggleActive.bind({}, id)} />;
};

const generateColumns = memoize(
  (formatMessage, editAction, deleteAction, toggleActive) => [
    {
      name: formatMessage(messages.idFieldLabel),
      cell: renderLinkToShow,
    },
    {
      name: formatMessage(messages.nameFieldLabel),
      selector: fieldsName.NAME,
      sortable: true,
    },
    {
      name: formatMessage(messages.descriptionLabel),
      selector: fieldsName.DESCRIPTION,
      grow: 2,
    },
    {
      name: formatMessage(messages.startDateLabel),
      selector: fieldsName.START_DATE,
      format: formatDate(fieldsName.START_DATE, DATE_FORMAT),
      sortable: true,
      sortFunction: sortByDate(fieldsName.START_DATE),
      center: true,
    },
    {
      name: formatMessage(messages.endDateLabel),
      selector: fieldsName.END_DATE,
      format: formatDate(fieldsName.END_DATE, DATE_FORMAT),
      sortable: true,
      sortFunction: sortByDate(fieldsName.END_DATE),
      center: true,
    },

    {
      name: formatMessage(messages.priceLabel),
      selector: fieldsName.PRICE,
      format: renderPriceFormatted(fieldsName.PRICE),
      sortable: true,
      center: true,
    },
    {
      name: formatMessage(messages.activeLabel),
      cell: renderSwitch.bind({}, { toggleActive }),
      center: true,
    },
    {
      cell: renderButtons.bind(null, { editAction, deleteAction }),
      right: true,
      grow: 0.5,
    },
  ]
);

const SpecialEventList = ({
  loading,
  events,
  goToCreate,
  goToEdit,
  refresh,
  onDateFilter,
  selectedFilter,
  deleteSpecialEvent,
  toggleActive,
}) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(
    formatMessage,
    goToEdit,
    deleteSpecialEvent,
    toggleActive
  );
  const buttons = [
    {
      label: formatMessage(globalMessages.refreshButton),
      icon: 'fa-sync-alt',
      style: 'btn-secondary',
      onClick: refresh,
    },
    {
      label: formatMessage(globalMessages.addButton),
      icon: 'fa-plus',
      style: 'btn-primary',
      onClick: goToCreate,
    },
  ];
  const filterButtons = buildFilterButtons(formatMessage);
  return (
    <ContentWrapper>
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
      <Card className="card-default">
        <Spinner show={loading} />
        <CardBody>
          <DataTable
            columns={columns}
            data={events}
            pagination
            noHeader
            subHeader
            isLoading={loading}
            subHeaderAlign="left"
            subHeaderComponent={
              <ToggleButtons
                buttons={filterButtons}
                selectedValue={selectedFilter}
                onChange={onDateFilter}
                size="sm"
              />
            }
            defaultSortField={fieldsName.END_DATE}
            defaultSortAsc={false}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

SpecialEventList.propTypes = {
  loading: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  onDateFilter: PropTypes.func,
  selectedFilter: PropTypes.string,
  deleteSpecialEvent: PropTypes.func,
  toggleActive: PropTypes.func,
};

export default SpecialEventList;
