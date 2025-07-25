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
import { RenderImage, renderPriceFormatted } from '../../../common/cmptUtils';
import { fieldsName } from './ItemHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

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
  { toggleVisible, isReadOnly },
  { [fieldsName.VISIBLE]: visible, id }
) => {
  if (isReadOnly) {
    return <Switch name={`swt${id}`} checked={visible} disabled={isReadOnly} />;
  }
  return (
    <AsyncSwitch checked={visible} updateFn={toggleVisible.bind({}, id)} />
  );
};

const generateColumns = memoize(
  (formatMessage, editAction, deleteAction, toggleVisible, isReadOnly) => [
    {
      name: formatMessage(messages.imageFieldLabel),
      selector: fieldsName.IMAGE,
      sortable: false,
      cell: RenderImage,
      center: true,
    },
    {
      name: formatMessage(messages.nameFieldLabel),
      selector: fieldsName.NAME,
      sortable: true,
    },
    {
      name: formatMessage(messages.positionFieldLabel),
      selector: fieldsName.POSITION,
      cell: ({ [fieldsName.POSITION]: position }) => position + 1,
      sortable: true,
      center: true,
    },
    {
      name: `Tiempo (min)`,
      selector: fieldsName.TIME,
      sortable: true,
      center: true,
    },

    {
      name: formatMessage(messages.priceFieldLabel),
      cell: renderPriceFormatted(fieldsName.PRICE),
      center: true,
    },
    {
      name: formatMessage(messages.visibleFieldLabel),
      cell: renderSwitch.bind({}, { toggleVisible, isReadOnly }),
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
  items,
  refresh,
  goToCreate,
  goToEdit,
  deleteItem,
  toggleVisible,
  openSortModal,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(
    formatMessage,
    goToEdit,
    deleteItem,
    toggleVisible,
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
          {!isReadOnly && (
            <div className="d-flex">
              <Button
                className="ml-auto"
                onClick={openSortModal}
                size="sm"
                color="primary"
                type="button"
              >
                <em className={`fas fa-fw fa-random`}></em>
                {` ${formatMessage(globalMessages.organizeButton)}`}
              </Button>
            </div>
          )}
          <DataTable
            columns={columns}
            data={items}
            pagination
            noHeader
            isLoading={loading}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

ItemList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleVisible: PropTypes.func.isRequired,
  openSortModal: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default ItemList;
