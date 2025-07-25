import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import { errorHandler } from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import { menuHttp } from '../../../services/http';

export const fieldsName = {
  NAME_FIELD: 'name',
  IS_ACTIVE: 'isActive',
  IMAGE: 'image',
};

const initialValues = {
  [fieldsName.NAME_FIELD]: '',
  [fieldsName.IS_ACTIVE]: true,
};

const useMenu = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { menuId } = useParams();
  const { formatMessage } = useIntl();
  const isEdit = !!menuId;
  const title = isEdit
    ? formatMessage(messages.edit)
    : formatMessage(messages.new);

  useEffect(() => {
    if (!menuId) {
      return;
    }
    setLoading(true);
    menuHttp
      .getById(menuId)
      .then(setInitValues)
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  }, [menuId, formatMessage]);

  function save(menu) {
    setLoading(true);
    const method = menuId ? menuHttp.update(menu) : menuHttp.create(menu);
    method
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreatedMenu));
        history.push(ROUTES.menu.list);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(function () {
        setLoading(false);
      });
  }

  function goBack() {
    history.push(ROUTES.menu.list);
  }

  return { save, goBack, loading, isEdit, title, initValues };
};

export { useMenu };
