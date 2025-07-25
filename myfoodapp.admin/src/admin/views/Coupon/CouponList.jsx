import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Card, CardBody, Button } from 'reactstrap';
import memoize from 'memoize-one';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
  DataTable,
} from '../../../common/components';
import { AsyncSwitch, Switch } from '../../../common/Forms';
import { fieldsName, COUPON_TYPES } from './CouponHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import FilterBar from './FilterBar';
import { useFilterBar } from './useFilterBar';

const renderCouponType = (fieldName, formatMessage) => ({
  [fieldName]: type,
}) =>
  formatMessage(
    type === COUPON_TYPES.percentage
      ? messages.percentageFieldLabel
      : messages.amountFieldLabel
  );

const renderButtons = ({ editAction, deleteAction, isReadOnly }, { id }) => {
  return (
    <>
      {!isReadOnly && (
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
      )}

      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        onClick={editAction.bind(null, id)}
      >
        <em
          className={`fas fa-fw ${isReadOnly ? 'fa-eye' : 'fa-pencil-alt'}`}
        />
      </Button>
    </>
  );
};

const renderSwitch = (
  { toggleActive, isReadOnly },
  { [fieldsName.ACTIVE]: active, id }
) => {
  if (isReadOnly) {
    return <Switch name={`swt${id}`} checked={active} disabled={isReadOnly} />;
  }
  return <AsyncSwitch checked={active} updateFn={toggleActive.bind({}, id)} />;
};

const generateColumns = memoize(
  (formatMessage, editAction, deleteAction, toggleActive, isReadOnly) => [
    {
      name: formatMessage(messages.nameFieldLabel),
      selector: fieldsName.NAME,
      sortable: true,
    },
    {
      name: formatMessage(messages.codeFieldLabel),
      selector: fieldsName.CODE,
      sortable: true,
    },

    {
      name: formatMessage(messages.typeFieldLabel),
      cell: renderCouponType(fieldsName.TYPE, formatMessage),
    },
    {
      name: formatMessage(messages.activeLabel),
      cell: renderSwitch.bind({}, { toggleActive, isReadOnly }),
      sortable: false,
      center: true,
    },
    {
      cell: renderButtons.bind(null, { editAction, deleteAction, isReadOnly }),
      right: true,
    },
  ]
);

const ItemList = ({
  loading,
  coupons,
  refresh,
  goToCreate,
  goToEdit,
  deleteCoupon,
  toggleActive,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();
  const { applyFilter, itemsFiltered } = useFilterBar(coupons);
  const columns = generateColumns(
    formatMessage,
    goToEdit,
    deleteCoupon,
    toggleActive,
    isReadOnly
  );

  const refreshBtn = {
    label: formatMessage(globalMessages.refreshButton),
    icon: 'fa-sync-alt',
    style: 'btn-secondary',
    onClick: refresh,
  };

  const addBtn = {
    label: formatMessage(globalMessages.addButton),
    icon: 'fa-plus',
    style: 'btn-primary',
    onClick: goToCreate,
  };

  const buttons = isReadOnly ? [refreshBtn] : [refreshBtn, addBtn];
  return (
    <ContentWrapper>
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
      <Card className="card-default">
        <Spinner show={loading} />
        <CardBody>
          <FilterBar onFiltersApplied={applyFilter} />
          <DataTable
            isLoading={loading}
            columns={columns}
            data={itemsFiltered}
            pagination
            noHeader
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

ItemList.propTypes = {
  loading: PropTypes.bool.isRequired,
  coupons: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  deleteCoupon: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default ItemList;
