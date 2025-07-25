import { useIntl } from 'react-intl';
import messages from './messages';
import clientHttp from '../../../services/http/clientHttp';
import { useDispatch } from 'react-redux';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { useHistory } from 'react-router';
import { ROUTES } from '../../globalConstants';
import { useState } from 'react';
import { useEffect } from 'react';

export const fieldsName = {
  NAME: 'clientName',
  IS_ACTIVE: 'isActive',
  LOGO_URL: 'logoURL',
  BANNER_URL: 'bannerURL',
};

export default function useList() {
  const [clients, setClients] = useState([]);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const title = formatMessage(messages.clientListTitle);

  function goToCreate() {
    history.push(ROUTES.client.new);
  }

  function goToEdit(id) {
    history.push(ROUTES.client.edit.replace(':clientId', id));
  }

  function refresh() {
    dispatch(addSpinner('LOAD_CLIENTS'));
    setLoading(true);
    clientHttp
      .getAll()
      .then(function (response) {
        return response.map(function (client) {
          return { ...client, image: client[fieldsName.LOGO_URL] };
        });
      })
      .then(setClients)
      .then(function () {
        dispatch(removeSpinner('LOAD_CLIENTS'));
      })
      .then(function () {
        setLoading(false);
      });
  }

  useEffect(() => {
    refresh();
    return () => {};
  }, []);

  return {
    clients,
    goToEdit,
    formatMessage,
    goToCreate,
    loading,
    updateIsActive: clientHttp.updateIsActive,
    refresh,
    title,
  };
}
