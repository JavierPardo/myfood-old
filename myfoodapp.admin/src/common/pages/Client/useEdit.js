import { useParams, useHistory } from 'react-router';
import messages from './messages';
import { useEffect } from 'react';
import { clientHttp } from '../../../services/http';
import { ROUTES } from '../../globalConstants';
import {
  addSpinner,
  removeSpinner,
  toggleReloadClients,
} from '../../../store/actions/applications.actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { fieldsName } from './useList';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.IS_ACTIVE]: true,
  [fieldsName.LOGO_URL]: '',
  [fieldsName.BANNER_URL]: '',
};
export default function useEdit() {
  const [client, setClient] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const history = useHistory();
  const { clientId } = useParams();
  const title = formatMessage(
    clientId ? messages.editTitle : messages.newTitle
  );
  const isEdit = !!clientId;

  useEffect(function () {
    refresh();
    return function () {};
  }, []);

  function refresh() {
    if (!isEdit) return;
    setLoading(true);
    clientHttp
      .getById(clientId)
      .then(setClient)
      .then(function () {
        setLoading(false);
      });
  }

  function goBack() {
    history.push(ROUTES.client.list);
  }

  function saveClient(_client) {
    setLoading(true);
    return (isEdit
      ? clientHttp.updateClient({ ..._client })
      : clientHttp.createClient(_client)
    ).finally(function () {
      const toastMessage = isEdit
        ? messages.updateSuccess
        : messages.createSuccess;
      dispatch(toggleReloadClients());
      toast.success(formatMessage(toastMessage));

      setLoading(false);
      goBack();
    });
  }

  return {
    title,
    client,
    saveClient,
    formatMessage,
    loading,
    goBack,
  };
}
