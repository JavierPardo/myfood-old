import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { orderHttp } from '../../../services/http/orderHttp';
import { errorHandler } from '../../Forms';
import globalMessages from '../../globalMessages';
import { ROUTES } from '../../globalConstants';
import { useEffect } from 'react';
import { getOrderStatus } from '../../../services/http/orderStatusHttp';

export default function useOrderList() {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [metadata, setMetadata] = useState({ orderStatuses: [] });

  const goToCreate = () => history.push(ROUTES.order.new);

  const goToEdit = function ({ id }) {
    history.push(ROUTES.order.edit.replace(':orderId', id));
  };

  const loadOrders = () => {
    setLoading(true);

    loadMetadata();

    orderHttp
      .getAll()
      .then((orders) => setOrders(orders))
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };

  const loadMetadata = function () {
    Promise.all([getOrderStatus()]).then(function ([orderStatuses]) {
      setMetadata({ orderStatuses });
    });
  };

  const updateIsVisible = orderHttp.updateIsVisibleFlag;

  useEffect(loadOrders, []);

  return {
    orders,
    loading,
    goToCreate,
    goToEdit,
    refresh: loadOrders,
    updateIsVisible,
    metadata,
  };
}
