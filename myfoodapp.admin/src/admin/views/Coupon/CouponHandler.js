import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import * as moment from 'moment';

import { ROUTES } from '../../../common/globalConstants';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';
import { couponHttp } from '../../../services/http';
import Coupon from './Coupon';
import messages from './messages';

export const fieldsName = {
  NAME: 'name',
  TYPE: 'discountType',
  MIN_AMOUNT: 'minAmount',
  AMOUNT: 'amount',
  CODE: 'code',
  EXPIRATION_TYPE: 'expirationType',
  END_DATE: 'endDate',
  LIMIT: 'Limit',
  ACTIVE: 'isActive',
};

export const COUPON_TYPES = { percentage: 1, amount: 2 };
export const EXPIRATION_TYPES = { date: 1, limit: 2 };

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.TYPE]: COUPON_TYPES.percentage,
  [fieldsName.MIN_AMOUNT]: '',
  [fieldsName.AMOUNT]: '',
  [fieldsName.CODE]: '',
  [fieldsName.EXPIRATION_TYPE]: EXPIRATION_TYPES.limit,
  [fieldsName.END_DATE]: moment(),
  [fieldsName.LIMIT]: 0,
  [fieldsName.ACTIVE]: true,
};

const CouponHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    couponHttp
      .getOne(id)
      .then(setInitValues)
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  }, [id, formatMessage]);

  const saveCoupon = (entity) => {
    setLoading(true);
    const serviceMethod = id
      ? couponHttp.update(entity)
      : couponHttp.create(entity);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullysaved));
        history.push(ROUTES.coupon.list);
      })
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  const goBack = () => history.push(ROUTES.coupon.list);

  return (
    <Coupon
      loading={loading}
      initValues={initValues}
      isEdit={!!id}
      goBack={goBack}
      saveCoupon={saveCoupon}
      isReadOnly={isReadOnly}
    />
  );
};

export default CouponHandler;
