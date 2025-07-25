import { useIntl } from 'react-intl';
import messages from './messages';
import { useState } from 'react';
import { useEffect } from 'react';
import { exceptionDateHttp } from '../../../services/http';
import { useHistory } from 'react-router';
import { ROUTES } from '../../globalConstants';

export default function useExceptionDateList() {
  const [exceptionDates, setExceptionDates] = useState([]);
  const [normalDates, setNormalDates] = useState([]);
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(false);

  function refresh() {
    setIsLoading(true);
    exceptionDateHttp.getAll().then(function (response) {
      setExceptionDates([
        ...response.filter(function (date) {
          return !!date.exceptionDate;
        }),
      ]);
      setNormalDates([
        ...response.filter(function (date) {
          return !date.exceptionDate;
        }),
      ]);
      setIsLoading(false);
    });
  }

  function goToCreate() {
    history.push(ROUTES.client.datesManagerNew);
  }

  function goToEdit(exceptionDateId) {
    history.push(
      ROUTES.client.datesManagerEdit.replace(
        ':exceptionDateId',
        exceptionDateId
      )
    );
  }

  useEffect(() => {
    refresh();
    return function () {};
  }, []);

  return {
    title: formatMessage(messages.exceptionDatesListTitle),
    exceptionDates,
    normalDates,
    isLoading,
    goToCreate,
    goToEdit,
    updateIsClosed: exceptionDateHttp.updateIsClosed,
    refresh,
  };
}
