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
import { renderPriceFormatted } from '../../../common/cmptUtils';
import { formatFromDic } from '../../../common/utils';
import { fieldsName } from './DeliveryCostHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import { AsyncSwitch, Switch } from '../../../common/Forms';

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

const renderRange = ({
  [fieldsName.START_RANGE]: start,
  [fieldsName.END_RANGE]: end,
  [fieldsName.RATE_ID]: typeId,
}) => {
  if (typeId !== 1) {
    return '';
  }
  return `${start} - ${end}`;
};

const renderSwitch = function ({ toggleIsActive }, { [fieldsName.IS_ACTIVE]: active, id }) {

  return (
    <AsyncSwitch checked={active} updateFn={toggleIsActive.bind({}, id)} />
  );
};

const generateColumns = memoize(
  (
    formatMessage,
    editAction,
    deleteAction,
    isReadOnly,
    rateTypes,
    providers,
    toggleIsActive
  ) => [
      {
        name: formatMessage(messages.providerFieldLabel),
        selector: fieldsName.PROVIDER_ID,
        format: formatFromDic(fieldsName.PROVIDER_ID, providers),
        sortable: true,
        grow: 1.5,
      },
      {
        name: formatMessage(messages.rateFieldLabel),
        format: formatFromDic(fieldsName.RATE_ID, rateTypes),
        selector: fieldsName.RATE_ID,
        sortable: true,
      },
      {
        name: formatMessage(messages.rangeFieldLabel),
        cell: renderRange,
        center: true,
      },
      {
        name: formatMessage(messages.feeFieldLabel),
        selector: fieldsName.FEE,
        sortable: true,
        format: renderPriceFormatted(fieldsName.FEE),
        center: true,
      },
      {
        name: formatMessage(messages.isActive),
        cell: renderSwitch.bind(null, { toggleIsActive }),
        center: true,
      },
      {
        cell: renderButtons.bind(null, { editAction, deleteAction, isReadOnly }),
        right: true,
        grow: 0.5,
      },
    ]
);

export const DeliveryCostList = ({
  loading,
  deliveryCosts,
  refresh,
  goToCreate,
  goToEdit,
  isReadOnly,
  deleteDeliveryCost,
  rateTypes,
  providers,
  toggleIsActive
}) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(
    formatMessage,
    goToEdit,
    deleteDeliveryCost,
    isReadOnly,
    rateTypes,
    providers,
    toggleIsActive
  );

  const addBtn = {
    label: formatMessage(globalMessages.addButton),
    icon: 'fa-plus',
    style: 'btn-primary',
    onClick: goToCreate,
  };

  const refreshBtn = {
    label: formatMessage(globalMessages.refreshButton),
    icon: 'fa-sync-alt',
    style: 'btn-secondary',
    onClick: refresh,
  };

  const buttons = isReadOnly ? [refreshBtn] : [refreshBtn, addBtn];
  return (
    <ContentWrapper>
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
      <Card className="card-default">
        <Spinner show={loading} />
        <CardBody>
          <DataTable
            columns={columns}
            data={deliveryCosts}
            pagination
            isLoading={loading}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

DeliveryCostList.propTypes = {
  loading: PropTypes.bool.isRequired,
  deliveryCosts: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  deleteDeliveryCost: PropTypes.func,
  isReadOnly: PropTypes.bool,
  rateTypes: PropTypes.object,
  providers: PropTypes.object,
};

export default DeliveryCostList;
