import React, { useState } from 'react';

import OrderContext, { defaultOrder, defaultMetadata } from './OrderContext';

const OrderProvider = ({ children }) => {
  const [order, updateOrder] = useState(defaultOrder);
  const [metadata, setMetadata] = useState(defaultMetadata);
  return (
    <OrderContext.Provider
      value={{
        metadata: { data: metadata, update: setMetadata },
        order: { data: order, update: updateOrder },
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
