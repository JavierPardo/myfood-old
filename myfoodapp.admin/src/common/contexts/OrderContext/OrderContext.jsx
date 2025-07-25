import { createContext } from 'react';

export const defaultOrder = {
  orderDetail: [],
  customer: {},
  payment: null,
};

export const defaultMetadata = {
  items: [],
  options: [],
  sides: [],
};

const updateOrder = () => {};
const updateMetadata = () => {};

const OrderContext = createContext({
  metadata: { data: defaultMetadata, update: updateMetadata },
  order: { data: defaultOrder, update: updateOrder },
});

export default OrderContext;
