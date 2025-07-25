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
import { fieldsName } from './SideHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const renderEditButton = ({ goToEdit, isReadOnly }, { id }) => {
  return (
    <Button
      outline
      size="xs"
      color="primary"
      type="button"
      onClick={goToEdit.bind(null, id)}
    >
      <em className={`fas fa-fw ${isReadOnly ? 'fa-eye' : 'fa-pencil-alt'}`} />
    </Button>
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
  (formatMessage, goToEdit, toggleActive, isReadOnly) => [
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
      name: formatMessage(messages.priceFieldLabel),
      selector: fieldsName.PRICE,
      cell: renderPriceFormatted(fieldsName.PRICE),
      center: true,
    },
    {
      name: formatMessage(messages.activeFieldLabel),
      cell: renderSwitch.bind({}, { toggleActive, isReadOnly }),
      center: true,
    },
    {
      cell: renderEditButton.bind(null, { goToEdit, isReadOnly }),
      right: true,
    },
  ]
);

export const SideList = ({
  loading,
  sides,
  refresh,
  goToCreate,
  goToEdit,
  toggleActive,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(
    formatMessage,
    goToEdit,
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
          <DataTable
            columns={columns}
            data={sides}
            pagination
            isLoading={loading}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

SideList.propTypes = {
  loading: PropTypes.bool.isRequired,
  sides: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default SideList;
