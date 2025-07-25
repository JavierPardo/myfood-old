import React from 'react';
import {
  PageHeader,
  ContentWrapper,
  DataTable,
} from '../../../common/components';
import useMenuList from './useMenuList';
import globalMessages from '../../../common/globalMessages';
import { useIntl } from 'react-intl';
import { memoize } from 'lodash';
import messages from './messages';
import { AsyncSwitch, Switch } from '../../../common/Forms';
import { Button } from 'reactstrap';

const renderButtons = function ({ buttons }, event) {
  return buttons.map(function ({ label, action, icon, isHidden }) {
    if (isHidden) return null;
    return (
      <Button
        key={Math.random()}
        outline
        size="xs"
        color="primary"
        type="button"
        style={{ marginLeft: '1rem' }}
        onClick={action.bind({}, event)}
      >
        {label}
        {icon && <em className={icon} />}
      </Button>
    );
  });
};
const generateColumns = memoize(function ({
  formatMessage,
  goToEdit,
  updateIsVisible,
  isDisabled,
  isReadOnly,
}) {
  return [
    {
      name: formatMessage(messages.menuIdentifier),
      selector: 'id',
      sortable: false,
      center: true,
    },
    { name: formatMessage(messages.name), selector: 'name', sortable: true },
    {
      name: formatMessage(messages.isActive),
      selector: 'isActive',
      cell: renderSwitch.bind({}, { updateIsVisible, isDisabled }),
      center: true,
    },
    {
      cell: renderButtons.bind(
        {},
        {
          buttons: [
            {
              action: goToEdit,
              icon: isDisabled ? 'far fa-eye' : 'fas fa-fw fa-pencil-alt',

              isHidden: isReadOnly,
            },
          ],
        }
      ),
      right: true,
    },
  ];
});

const renderSwitch = ({ updateIsVisible, isDisabled }, { isActive, id }) => {
  if (isDisabled) return <Switch checked={isActive} disabled />;
  return (
    <AsyncSwitch checked={isActive} updateFn={updateIsVisible.bind({}, id)} />
  );
};

export default function List({ isReadOnly }) {
  const {
    title,
    goToCreate,
    menus,
    goToEdit,
    updateIsVisible,
    refresh,
    loading,
  } = useMenuList();
  const { formatMessage } = useIntl();

  const columns = generateColumns({
    formatMessage,
    goToEdit,
    updateIsVisible,
    isDisabled: isReadOnly,
  });
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
      isHidden: isReadOnly,
    },
  ];

  return (
    <ContentWrapper>
      <PageHeader title={title} buttons={buttons} />
      <DataTable data={menus} columns={columns} isLoading={loading} />
    </ContentWrapper>
  );
}
