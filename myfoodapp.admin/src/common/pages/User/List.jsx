import React from 'react';
import messages from './messages';
import { useIntl } from 'react-intl';
import { PageHeader, ContentWrapper } from '../../components';
import { useHistory } from 'react-router';
import { ROUTES } from '../../globalConstants';

export default function List() {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const goCreate = function () {
    history.push(`${ROUTES.user}/new`);
  };
  const buttons = [
    {
      label: formatMessage(messages.createTitle),
      icon: 'fa-plus',
      style: 'btn-primary',
      onClick: goCreate,
    },
  ];
  return (
    <ContentWrapper>
      <PageHeader title={formatMessage(messages.listTitle)} buttons={buttons} />
    </ContentWrapper>
  );
}
