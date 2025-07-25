import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import {
  categoryHttp,
  menuHttp,
  menuCategoryhttp,
} from '../../../services/http';
import { errorHandler } from '../../../common/Forms';
import messages from './messages';
import globalMessages from '../../../common/globalMessages';
import { useDispatch } from 'react-redux';
import Category from './Category';

import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';

export const fieldsName = {
  NAME_FIELD: 'name',
  IS_VISIBLE: 'isVisibleInMenu',
  MENUCATEGORY: 'menusCategories',
  ACTIVE: 'isActive',
  IMAGE: 'image',
  POSITION: 'position',
};

const initialValues = {
  [fieldsName.NAME_FIELD]: '',
  [fieldsName.IS_VISIBLE]: true,
  [fieldsName.ACTIVE]: true,
  [fieldsName.IMAGE]: '',
};

const CategoryHandler = ({ isReadOnly }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const [metadata, setMetadata] = useState({ menus: [] });
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const promise = loadMetadata();
    if (!!id) {
      setLoading(true);
      promise.then(loadData);
    }
    promise.then(function () {
      setMetadata({ ...metadata });
    });
  }, [id, formatMessage]);

  function loadMetadata() {
    dispatch(addSpinner('LOAD_METADATA'));
    return Promise.all([menuHttp.getAll()])
      .then(function ([responseMenu]) {
        metadata.menus = [
          ...responseMenu
            .filter(function (menu) {
              return menu.isActive;
            })
            .map(function ({ name: label, id: menuId }) {
              return { value: menuId, label, key: menuId, menuId };
            }),
        ];
      })
      .finally(function () {
        dispatch(removeSpinner('LOAD_METADATA'));
      });
  }

  function loadData() {
    return Promise.all([
      categoryHttp.getCategory(id),
      menuCategoryhttp.getAllByCategoryId(id),
    ])
      .then(function ([category, menusCategories]) {
        setInitValues({
          ...category,
          menusCategories: metadata.menus.filter(function (menu) {
            return menusCategories.find(function (mc) {
              return mc.menuId === menu.menuId;
            });
          }),
        });
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  }

  const saveCategory = (category) => {
    setLoading(true);
    const method = id
      ? categoryHttp.updateCategory(category)
      : categoryHttp.createCategory(category);
    method
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreatedCategory));
        history.push(ROUTES.category.list);
      })
      .catch(
        errorHandler.bind(
          null,
          formatMessage(globalMessages.generalErrorMessage)
        )
      )
      .finally(() => setLoading(false));
  };
  const goBack = () => history.push(ROUTES.category.list);

  return (
    <Category
      saveCategory={saveCategory}
      goBack={goBack}
      loading={loading}
      isEdit={!!id}
      initValues={initValues}
      metadata={metadata}
      isReadOnly={isReadOnly}
    />
  );
};

export default CategoryHandler;
