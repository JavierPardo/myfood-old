import { createContext } from 'react';

export const defaultEvent = {
  orders: [],
  deliveryCost: 0,
  totalAmount: 0,
  coupon: {},
  transaction: {
    notes: '',
    currentStatusId: null,
    amount: 0,
    paymentType: null,
    imageReference: '',
    confirmed: false,
  },
  details: {
    customer: {
      id: '',
      name: '',
      email: '',
    },
    payment: {
      imageReference: '',
      reference: '',
      paymentType: '',
      confirmation: false,
    },
  },
  typeId: '',
};

export const defaultMetadata = {
  items: [],
  options: [],
  sides: [],
  eventTypes: [],
};

const updateEvent = () => {};
const updateMetadata = () => {};

const EventContext = createContext({
  metadata: { data: defaultMetadata, update: updateMetadata },
  event: { data: defaultEvent, update: updateEvent, refresh: function () {} },
});

export default EventContext;
