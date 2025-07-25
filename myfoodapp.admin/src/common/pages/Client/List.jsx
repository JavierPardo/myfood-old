import React from 'react';
import useList, { fieldsName } from './useList';
import { ContentWrapper, PageHeader, DataTable } from '../../components';
import globalMessages from '../../globalMessages';
import { RenderImage } from '../../cmptUtils';
import messages from './messages';
import { AsyncSwitch } from '../../Forms';
import { Button } from 'reactstrap';
import { memoize } from 'lodash';

function renderSwitch(updateIsActive, { isActive, id }) {
  return (
    <AsyncSwitch
      checked={isActive}
      updateFn={updateIsActive.bind({}, { isActive: !isActive, id })}
    />
  );
}

function renderButtons(goToEdit, client) {
  const { id } = client;
  return (
    <>
      {/* <Button
          outline
          size="xs"
          color="danger"
          type="button"
          onClick={deleteCategory.bind(null, id)}
          className="mr-2"
        >
          <em className={`fas fa-fw fa-trash-alt`} />
        </Button> */}
      <Button
        outline
        size="xs"
        color="primary"
        type="button"
        onClick={goToEdit.bind(null, id)}
      >
        <em className={`fas fa-fw fa-pencil-alt`} />
      </Button>
    </>
  );
}

const generateColumns = memoize(function ({
  formatMessage,
  updateIsActive,
  goToEdit,
}) {
  return [
    {
      name: formatMessage(messages.logoUrl),
      selector: fieldsName.LOGO_URL,
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
      name: formatMessage(messages.isActiveFieldLabel),
      selector: fieldsName.IS_ACTIVE,
      sortable: true,
      cell: renderSwitch.bind({}, updateIsActive),
      center: true,
    },
    { cell: renderButtons.bind({}, goToEdit), right: true },
  ];
});

export default function List() {
  const {
    title,
    clients,
    refresh,
    goToCreate,
    goToEdit,
    updateIsActive,
    formatMessage,
    loading,
  } = useList();

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

  const columns = generateColumns({ goToEdit, formatMessage, updateIsActive });

  return (
    <ContentWrapper>
      <PageHeader title={title} buttons={buttons} />
      <DataTable
        columns={columns}
        data={clients}
        pagination
        isLoading={loading}
      />
    </ContentWrapper>
  );
}
