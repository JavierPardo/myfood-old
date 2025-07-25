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
import { fieldsName } from './UserHandler';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';

const renderEditButton = (goToEdit, { id }) => {
  return (
    <Button
      outline
      size="xs"
      color="primary"
      type="button"
      onClick={goToEdit.bind(null, id)}
    >
      <em className={`fas fa-fw fa-pencil-alt`} />
    </Button>
  );
};

const generateColumns = memoize((formatMessage, goToEdit) => [
  {
    name: formatMessage(messages.firstNameFieldLabel),
    selector: fieldsName.FIRSTNAME,
    sortable: true,
  },
  {
    name: formatMessage(messages.lastNameFieldLabel),
    selector: fieldsName.LASTNAME,
  },
  {
    name: formatMessage(messages.emailFieldLabel),
    selector: fieldsName.EMAIL,
  },
  {
    name: formatMessage(messages.userNameFieldLabel),
    selector: fieldsName.USERNAME,
  },
  {
    name: formatMessage(messages.phoneNumberFieldLabel),
    selector: fieldsName.PHONENUMBER,
  },

  { cell: renderEditButton.bind(null, goToEdit), right: true },
]);

export const UserList = ({ loading, users, refresh, goToCreate, goToEdit }) => {
  const { formatMessage } = useIntl();

  const columns = generateColumns(formatMessage, goToEdit);

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
  return (
    <ContentWrapper>
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
      <Card className="card-default">
        <Spinner show={loading} />
        <CardBody>
          <DataTable
            columns={columns}
            data={users}
            pagination
            isLoading={loading}
          />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

UserList.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  goToCreate: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
};

export default UserList;
