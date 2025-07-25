import { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { exceptionDateHttp } from '../../../services/http';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import messages from './messages';
import { ROUTES } from '../../globalConstants';
import { useEffect } from 'react';
import * as moment from 'moment';

const fieldsName = {
  SERVICE: 'service',
  IS_CLOSED: 'isClosed',
  EXCEPTION_DATE: 'exceptionDate',
  TIME_START: 'timeStart',
  DEFINE_DATE: 'defineDate',
  TIME_END: 'timeEnd',
  TIME_EXCEPTIONS: 'dateExceptions',
};

const initialExceptionDate = {
  [fieldsName.SERVICE]: '',
  [fieldsName.IS_CLOSED]: false,
  [fieldsName.EXCEPTION_DATE]: null,
  [fieldsName.TIME_EXCEPTIONS]: [],
  [fieldsName.DEFINE_DATE]: false,
};

export default function useExceptionDateEdit() {
  const [exceptionDate, setExceptionDate] = useState(initialExceptionDate);
  const { exceptionDateId } = useParams();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const isEdit = !!exceptionDateId;
  const title = formatMessage(messages.exceptionDateTitle);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      exceptionDateHttp.getById(exceptionDateId).then(function (exceptionDate) {
        const dateExceptions = [];
        if (
          exceptionDate[`${fieldsName.TIME_START}1`] !== null ||
          exceptionDate[`${fieldsName.TIME_END}1`] !== null
        ) {
          dateExceptions.push({
            [fieldsName.TIME_START]: moment(
              exceptionDate[`${fieldsName.TIME_START}1`],
              'HH:mm:ss.SSS'
            ),
            [fieldsName.TIME_END]: moment(
              exceptionDate[`${fieldsName.TIME_END}1`],
              'HH:mm:ss.SSS'
            ),
          });
        }
        if (
          exceptionDate[`${fieldsName.TIME_START}2`] !== null ||
          exceptionDate[`${fieldsName.TIME_END}2`] !== null
        ) {
          dateExceptions.push({
            [fieldsName.TIME_START]: moment(
              exceptionDate[`${fieldsName.TIME_START}2`],
              'HH:mm:ss.SSS'
            ),
            [fieldsName.TIME_END]: moment(
              exceptionDate[`${fieldsName.TIME_END}2`],
              'HH:mm:ss.SSS'
            ),
          });
        }
        if (
          exceptionDate[`${fieldsName.TIME_START}3`] !== null ||
          exceptionDate[`${fieldsName.TIME_END}3`] !== null
        ) {
          dateExceptions.push({
            [fieldsName.TIME_START]: moment(
              exceptionDate[`${fieldsName.TIME_START}3`],
              'HH:mm:ss.SSS'
            ),
            [fieldsName.TIME_END]: moment(
              exceptionDate[`${fieldsName.TIME_END}3`],
              'HH:mm:ss.SSS'
            ),
          });
        }
        exceptionDate[fieldsName.DEFINE_DATE] = !!exceptionDate[
          fieldsName.EXCEPTION_DATE
        ];
        exceptionDate[fieldsName.EXCEPTION_DATE] = !!exceptionDate[
          fieldsName.EXCEPTION_DATE
        ]
          ? moment(exceptionDate[fieldsName.EXCEPTION_DATE])
          : null;
        setExceptionDate({
          ...exceptionDate,
          dateExceptions,
        });

        setLoading(false);
      });
    } else {
      setExceptionDate({
        ...exceptionDate,
        [fieldsName.DEFINE_DATE]: false,
        dateExceptions: [
          {
            [fieldsName.TIME_START]: moment(),
            [fieldsName.TIME_END]: moment(),
          },
        ],
      });
    }

    return function () {};
  }, []);

  function submit(exceptionDate) {
    setLoading(true);
    const promise = isEdit
      ? exceptionDateHttp.update
      : exceptionDateHttp.create;

    for (let index = 0; index < 3; index++) {
      const timeException = exceptionDate[fieldsName.TIME_EXCEPTIONS][index];
      exceptionDate[`${fieldsName.TIME_START}${index + 1}`] = timeException
        ? toTimeSpan(timeException[fieldsName.TIME_START])
        : null;
      exceptionDate[`${fieldsName.TIME_END}${index + 1}`] = timeException
        ? toTimeSpan(timeException[fieldsName.TIME_END])
        : null;
    }
    if (!exceptionDate[fieldsName.DEFINE_DATE]) {
      exceptionDate[fieldsName.EXCEPTION_DATE] = null;
    }
    return promise({
      ...exceptionDate,
    }).then(function () {
      toast.success(
        formatMessage(
          isEdit
            ? messages.exceptionDatesUpdateSuccess
            : messages.exceptionDatesCreateSuccess
        )
      );

      setLoading(false);
      history.push(ROUTES.client.datesManager);
    });
  }
  function toTimeSpan(value) {
    if (!value) return null;
    return value.format('HH:mm:ss.SSS');
  }

  function goToList() {
    history.push(ROUTES.client.datesManager);
  }

  return {
    title,
    submit,
    isEdit,
    goToList,
    loading,
    exceptionDate,
  };
}
