import { useIntl } from 'react-intl';
import messages from './messages';
import { menuHttp } from '../../../services/http';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../common/globalConstants';

export default function useMenuList() {
  const [menus, setMenus] = useState([]);
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const title = formatMessage(messages.list);
  const updateIsVisible = menuHttp.updateIsVisibleFlag;

  function goToCreate() {
    history.push(ROUTES.menu.new);
  }

  function goToEdit({ id: menuId }) {
    history.push(ROUTES.menu.edit.replace(':menuId', menuId));
  }

  function refresh() {
    setLoading(true);
    Promise.all([menuHttp.getAll()])
      .then(function ([menus]) {
        setMenus(menus);
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
    title,
    goToCreate,
    goToEdit,
    refresh,
    updateIsVisible,
    loading,
    menus,
  };
}
