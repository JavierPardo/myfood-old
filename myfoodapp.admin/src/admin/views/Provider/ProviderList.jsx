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
import { Search } from '../../../common/components';
import { useSearchFilter } from '../../../common/hooks/useSearchFilter';
import { fieldsName } from './ProviderHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const renderSwitch = (
  { toggleActive, isReadOnly },
  { [fieldsName.ACTIVE]: active, id }
) => {
  if (isReadOnly) {
    return <Switch name={`swt${id}`} checked={active} disabled={isReadOnly} />;
  }
  return <AsyncSwitch checked={active} updateFn={toggleActive.bind({}, id)} />;
};

const renderIsDefaultSwitch = function (
  { toggleDefault },
  provider
) {
  let {branchLogisticProviders}=provider;
  
  if(!branchLogisticProviders){
    branchLogisticProviders=[{}]
  }
  
  const [branchLogisticProvider] = branchLogisticProviders;
  const callbackData={ ...branchLogisticProvider, [fieldsName.IS_DEFAULT]: !branchLogisticProvider[fieldsName.IS_DEFAULT] };
  
  return <AsyncSwitch checked={branchLogisticProvider[fieldsName.IS_DEFAULT]}
    updateFn={toggleDefault.bind({}, callbackData)} />;
};

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

const generateColumns = memoize(
  (formatMessage, editAction, deleteAction, isReadOnly, toggleActive, toggleDefault) => [
    {
      name: formatMessage(messages.nameFieldLabel),
      selector: fieldsName.NAME,
      sortable: true,
    },
    {
      name: formatMessage(messages.contactFieldLabel),
      selector: fieldsName.CONTACT,
    },
    {
      name: formatMessage(messages.emailFieldLabel),
      selector: fieldsName.EMAIL,
    },
    {
      name: formatMessage(messages.phoneFieldLabel),
      selector: fieldsName.PHONE,
    },
    {
      name: formatMessage(messages.whatsappFieldLabel),
      selector: fieldsName.WHATSAPP,
    },
    {
      name: formatMessage(messages.websiteFieldLabel),
      selector: fieldsName.WEBSITE,
    },
    {
      name: formatMessage(messages.activeLabel),
      cell: renderSwitch.bind({}, { toggleActive, isReadOnly }),
      sortable: false,
      center: true,
      grow: 0.5,
    },
    {
      name: formatMessage(messages.defaultLabel),
      cell: renderIsDefaultSwitch.bind({}, { toggleDefault }),
      sortable: false,
      center: true,
      grow: 0.5,
    },
    {
      cell: renderButtons.bind(null, {
        editAction,
        deleteAction,
        isReadOnly,
      }),
      right: true,
      grow: 0.5,
    },
  ]
);

const columnsToFilter = [fieldsName.NAME];

export const ProviderList = ({
  loading,
  providers,
  refresh,
  goToCreate,
  goToEdit,
  deleteProvider,
  toggleActive,
  isReadOnly,
  toggleDefault
}) => {
  const { formatMessage } = useIntl();
  const { applyFilter, itemsFiltered } = useSearchFilter(
    providers,
    columnsToFilter
  );

  const columns = generateColumns(
    formatMessage,
    goToEdit,
    deleteProvider,
    isReadOnly,
    toggleActive,
    toggleDefault
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
          <div className="row mb-2">
            <div className="col-md-4">
              <Search
                placeholder={formatMessage(messages.searchPlaceholder)}
                onSearch={applyFilter}
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={itemsFiltered}
            pagination
            noHeader
            isLoading={loading}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

ProviderList.propTypes = {
  loading: PropTypes.bool.isRequired,
  providers: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func,
  toggleActive: PropTypes.func,
  isReadOnly: PropTypes.bool,
};

export default ProviderList;
