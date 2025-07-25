import { useHistory, useParams } from 'react-router';
import { useIntl } from 'react-intl';
import messages from './messages';
import { eventHttp } from '../../../services/http';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../globalConstants';
import { useContext } from 'react';
import EventContext from '../../contexts/EventContext/EventContext';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { toast } from 'react-toastify';

export default function useEventEdit() {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const {
    event: { data: event, update: updateEvent, refresh: refreshEvent },
    metadata: { data: metadata }, //, update: updateMetadata },
  } = useContext(EventContext);

  const isEdit = !!eventId;

  // const loadMedatada = function () {
  //   return Promise.all([eventStatusHttp.getEventStatus()]).then(function ([
  //     eventStatus,
  //   ]) {
  //     updateMetadata({ ...metadata, eventStatus });
  //   });
  // };

  function handleCreateSubmit() {
    dispatch(addSpinner('SAVE_EVENT'));
    const { destinationLocation, ...newEvent } = event;
    let location = { ...destinationLocation };
    if (location && location.coordinates) {
      location = {
        ...location,
        coordinates: JSON.stringify(location.coordinates),
      };
    }
    eventHttp
      .createEvent({
        ...newEvent,
        details: JSON.stringify(event.details),
        coupon: null,
        destinationLocation: location,
      })
      .then(function (eventId) {
        toast.success(
          formatMessage(messages.eventCreatedSucessfully, { eventId })
        );
        history.push(ROUTES.event.edit.replace(':eventId', eventId));
      })
      .finally(function () {
        dispatch(removeSpinner('SAVE_EVENT'));
      });
  }

  function handleUpdateSubmit() {
    dispatch(addSpinner('SAVE_EVENT'));
    const { transaction } = event;
    eventHttp
      .saveEvent({
        ...event,
        id: parseInt(eventId),
        details: JSON.stringify(event.details),
      })
      .then(function (eventId) {
        const message = formatMessage(messages.eventUpdatedSucessfully, {
          eventId,
        });
        toast.success(message);
      })
      .finally(function () {
        dispatch(removeSpinner('SAVE_EVENT'));
      });
  }

  return {
    isEdit,
    event,
    title: formatMessage(isEdit ? messages.editTitle : messages.createTitle),
    refresh: refreshEvent,
    goToList: function () {
      history.push(ROUTES.event.list);
    },
    handleSubmit: isEdit ? handleUpdateSubmit : handleCreateSubmit,
    updateEvent,
    formatMessage,
    metadata,
  };
}
