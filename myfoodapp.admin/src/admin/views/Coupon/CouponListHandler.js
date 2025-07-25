import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { ROUTES } from '../../../common/globalConstants';
import { couponHttp } from '../../../services/http';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';

import CouponList from './CouponList';
import messages from './messages';

const CouponListHandler = ({ isReadOnly }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);

  const goToCreate = () => history.push(ROUTES.coupon.create);
  const goToEdit = (id) => history.push(ROUTES.coupon.edit.replace(':id', id));

  const loadCoupons = () => {
    setLoading(true);
    couponHttp
      .getAll()
      .then((coupons) => setCoupons(coupons))
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  useEffect(loadCoupons, []);

  const deleteCoupon = (id) => {
    setLoading(true);
    couponHttp
      .remove(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        loadCoupons();
      })
      .catch(generalErrorHandler);
  };
  return (
    <CouponList
      loading={loading}
      coupons={coupons}
      goToCreate={goToCreate}
      goToEdit={goToEdit}
      refresh={loadCoupons}
      deleteCoupon={deleteCoupon}
      toggleActive={couponHttp.updateIsActive}
      isReadOnly={isReadOnly}
    />
  );
};

export default CouponListHandler;
