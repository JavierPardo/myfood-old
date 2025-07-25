import React, { useState } from 'react';

import EventContext, { defaultEvent, defaultMetadata } from './EventContext';
import { orderHttp } from '../../../services/http/orderHttp';
import { useParams } from 'react-router';
import {
  orderItemHttp,
  orderExtraHttp,
  orderItemSideHttp,
  itemHttp,
  eventTypeHttp,
  orderItemOptionHttp,
  eventHttp,
  transactionHttp,
  orderStatusHttp,
  transactionStatusHttp,
  couponHttp,
  locationHttp,
} from '../../../services/http';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { sideHttp } from '../../../services/http/sideHttp';

const EventProvider = function ({ children }) {
  const [event, setEvent] = useState(defaultEvent);
  const [metadata, setMetadata] = useState(defaultMetadata);
  const [orderStatusFilters, setOrderStatusFilters] = useState([]);
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const isEdit = !!eventId;

  function loadMetadata() {
    dispatch(addSpinner('LOAD_METADATA'));
    return Promise.all([
      eventTypeHttp.getEventTypes(),
      orderStatusHttp.getOrderStatus(),
      transactionStatusHttp.getAll(),
    ]).then(function ([eventTypes, orderStatuses, transactionStatuses]) {
      dispatch(removeSpinner('LOAD_METADATA'));
      return { eventTypes, orderStatuses, transactionStatuses };
    });
  }

  function loadCompleteOrders(eventData, statuses) {
    dispatch(addSpinner('LOAD_DATAEVENT'));
    return Promise.all([
      orderHttp.getAllByEventIdAndStatuses(eventId, statuses.join(',')),
      orderItemHttp.getAllByEventId(eventId),
      orderExtraHttp.getAllByEventId(eventId),
      orderItemSideHttp.getAllByEventId(eventId),
      itemHttp.getAllByEventId(eventId),
      orderItemOptionHttp.getAllByEventId(eventId),
      sideHttp.getAllByEventId(eventId),
      couponHttp.getByEventId(eventId),
    ])
      .then(function ([
        orders,
        orderItems,
        orderExtras,
        orderItemSides,
        items,
        orderItemOptions,
        sides,
        coupon,
      ]) {
        eventData.coupon = coupon;
        eventData.orders = orders.map(function (order) {
          order.orderItems = orderItems.filter(function ({ orderId }) {
            return orderId === order.id;
          });

          order.orderItems.forEach(function (orderItem) {
            orderItem.item = items.find(function ({ id }) {
              return id === orderItem.itemId;
            });
            orderItem.selectedSides = orderItemSides.filter(function ({
              orderItemId,
            }) {
              return orderItemId === orderItem.id;
            });
            orderItem.selectedOptions = orderItemOptions.filter(function ({
              orderItemId,
            }) {
              return orderItemId === orderItem.id;
            });
          });

          ///
          order.orderExtras = orderExtras.filter(function ({ orderId }) {
            return orderId === order.id;
          });

          order.orderExtras.forEach(function (orderExtra) {
            orderExtra.side = sides.find(function ({ id }) {
              return id === orderExtra.sideId;
            });
          });

          return order;
        });
      })
      .finally(function () {
        dispatch(removeSpinner('LOAD_DATAEVENT'));
      });
  }

  function loadData() {
    dispatch(addSpinner('LOAD_EVENT_DATA'));
    return Promise.all([
      eventHttp.getEvent(eventId),
      transactionHttp.getByEvent(eventId),
      locationHttp.getByEventId(eventId),
    ])
      .then(function ([eventData, transaction, destinationLocation]) {
        eventData.details = JSON.parse(eventData.details);

        if (destinationLocation && destinationLocation.coordinates) {
          destinationLocation.coordinates = JSON.parse(
            destinationLocation.coordinates
          );
        }

        setMetadata(metadata);
        let _event = eventData;
        if (!eventData.details) {
          eventData.details = { payment: {} };
        }
        if (transaction) {
          _event = { ...eventData, transaction };
        } else {
          _event = { ...eventData, transaction: event.transaction };
        }
        if (destinationLocation) {
          _event = { ..._event, destinationLocation };
        }
        setEvent({ ..._event });
      })
      .then(function () {
        dispatch(removeSpinner('LOAD_EVENT_DATA'));
      })
      .then(function () {
        loadCompleteOrders(event, orderStatusFilters);
      });
  }

  function loadEvent() {
    dispatch(addSpinner('LOAD_EVENT'));

    const promise = isEdit
      ? loadData()
      : new Promise(function (resolve) {
          resolve();
        });

    promise.finally(function () {
      dispatch(removeSpinner('LOAD_EVENT'));
    });
    return promise;
  }

  useEffect(function () {
    loadMetadata().then(function (metadata) {
      return loadEvent().then(function () {
        setMetadata(metadata);
        setOrderStatusFilters(
          metadata.orderStatuses.map(function ({ id }) {
            return id;
          })
        );
      });
    });

    return function () {};
  }, []);

  useEffect(
    function () {
      if (isEdit) {
        loadCompleteOrders(event, orderStatusFilters);
      }
    },
    [orderStatusFilters]
  );

  return (
    <EventContext.Provider
      value={{
        metadata: { data: metadata, update: setMetadata, loadData: loadData },
        event: {
          data: event,
          update: setEvent,
          refresh: loadData,
          updateOrderStatusFilters: setOrderStatusFilters,
          orderStatusFilters,
        },
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
