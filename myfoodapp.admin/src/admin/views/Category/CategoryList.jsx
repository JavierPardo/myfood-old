import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Card, CardBody } from 'reactstrap';
import { memoize } from 'lodash';
import { Button } from 'reactstrap';

import {
  ContentWrapper,
  PageHeader,
  Spinner,
  DataTable,
} from '../../../common/components';
import { AsyncSwitch, Switch } from '../../../common/Forms';
import { RenderImage } from '../../../common/cmptUtils';
import { fieldsName } from './CategoryHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const renderSwitch = (updateIsVisible, isReadOnly, { isVisibleInMenu, id }) => {
  if (isReadOnly) {
    return (
      <Switch
        name={`swt${id}`}
        checked={isVisibleInMenu}
        disabled={isReadOnly}
      />
    );
  }
  return (
    <AsyncSwitch
      checked={isVisibleInMenu}
      updateFn={updateIsVisible.bind({}, id)}
    />
  );
};

const renderButtons = (goToEdit, deleteCategory, isReadOnly, { id }) => {
  return (
    <>
      {!isReadOnly && (
        <Button
          outline
          size="xs"
          color="danger"
          type="button"
          onClick={deleteCategory.bind(null, id)}
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
        onClick={goToEdit.bind(null, id)}
      >
        <em
          className={`fas fa-fw ${isReadOnly ? 'fa-eye' : 'fa-pencil-alt'}`}
        />
      </Button>
    </>
  );
};

const generateColumns = memoize(
  (formatMessage, updateIsVisible, goToEdit, deleteCategory, isReadOnly) => [
    {
      name: 'Imagen',
      selector: fieldsName.IMAGE,
      sortable: false,
      cell: RenderImage,
      center: true,
    },
    {
      name: formatMessage(messages.nameFieldLabel),
      selector: fieldsName.NAME_FIELD,
      sortable: true,
    },
    {
      name: formatMessage(messages.positionFieldLabel),
      selector: fieldsName.POSITION,
      sortable: true,
      cell: ({ [fieldsName.POSITION]: position }) => position + 1,
      center: true,
    },
    {
      name: formatMessage(messages.visibleFieldLabel),
      selector: fieldsName.IS_VISIBLE,
      cell: renderSwitch.bind({}, updateIsVisible, isReadOnly),
      center: true,
    },
    {
      cell: renderButtons.bind({}, goToEdit, deleteCategory, isReadOnly),
      right: true,
    },
  ]
);

export const CategoryList = ({
  categories,
  loading,
  refresh,
  goToCreate,
  goToEdit,
  updateIsVisible,
  deleteCategory,
  openSortModal,
  isReadOnly,
}) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(
    formatMessage,
    updateIsVisible,
    goToEdit,
    deleteCategory,
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
            data={categories}
            pagination
            isLoading={loading}
            noHeader
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

CategoryList.propTypes = {
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  updateIsVisible: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  openSortModal: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

export default CategoryList;
