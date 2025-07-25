import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { sideHttp } from '../../../services/http/sideHttp';
import { itemHttp, orderItemHttp } from '../../../services/http';
import { optionHttp, orderExtraHttp } from '../../../services/http';
import { orderHttp } from '../../../services/http/orderHttp';
import { useParams } from 'react-router';

function reloadOrderItems({ orderItems }) {
  return orderItems;
}
function reloadOrderExtras({ orderExtras }) {
  return orderExtras;
}

export default function useEditOrder({ updateOrder, updateMetadata }) {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const isEdit = !!orderId;

  function loadMetadata(orderId) {
    return Promise.all([
      sideHttp.getAllByOrderId(orderId),
      itemHttp.getAllByOrderId(orderId),
      optionHttp.getAllByOrderId(orderId),
    ]).then(function ([sides, items, options]) {
      return { sides, items, options };
    });
  }

  useEffect(() => {
    if (isEdit) {
      dispatch(addSpinner('loadOrder'));
      Promise.all([
        orderHttp.getById(orderId),
        orderItemHttp.getAllByOrderId(orderId),
        orderExtraHttp.getAllByOrderId(orderId),
        loadMetadata(orderId),
      ])
        .then(function ([orderData, orderItems, orderExtras, metadata]) {
          updateMetadata(metadata);
          updateOrder({
            ...orderData,
            orderDetail: [
              ...reloadOrderItems({ orderItems, metadata }),
              ...reloadOrderExtras({ orderExtras, metadata }),
            ],
          });
        })
        .finally(function () {
          dispatch(removeSpinner('loadOrder'));
        });
    }
    return () => {
      updateOrder({});
    };
  }, []);

  return {};
}
