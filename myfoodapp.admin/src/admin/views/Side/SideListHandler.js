import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';

import { ROUTES } from '../../../common/globalConstants';
import { sideHttp } from '../../../services/http';
import { errorHandler } from '../../../common/Forms';
import globalMessages from '../../../common/globalMessages';

import SideList from './SideList';

const SideListHandler = ({ isReadOnly }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [sides, setSides] = useState([]);

  const goToCreate = () => history.push(ROUTES.side.new);
  const goToEdit = (id) => history.push(ROUTES.side.edit.replace(':id', id));

  const loadSides = () => {
    setLoading(true);
    sideHttp
      .getSides()
      .then((sides) => setSides(sides))
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(loadSides, []);

  return (
    <SideList
      loading={loading}
      sides={sides}
      goToCreate={goToCreate}
      goToEdit={goToEdit}
      refresh={loadSides}
      toggleActive={sideHttp.updateIsActive}
      isReadOnly={isReadOnly}
    />
  );
};

export default SideListHandler;
