import React from 'react';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../../common/globalConstants';
import { generalErrorHandler } from '../../../common/Forms/errorHandler';
import { itemHttp, categoryHttp, optionHttp } from '../../../services/http';
import {
  toValueLabelList,
  toIdList,
  toSelectList,
} from '../../../common/utils';
import Item from './Item';
import messages from './messages';

export const fieldsName = {
  NAME: 'name',
  IMAGE: 'image',
  POSITION: 'position',
  DESCRIPTION: 'description',
  TIME: 'prepTimeMins',
  PRICE: 'currentPrice',
  REQUIRED_SIDES: 'numberSidesRequired',
  IS_OPTION_REQUIRED: 'optionsRequired',
  ACTIVE: 'isActive',
  VISIBLE: 'isVisibleInMenu',
  CATEGORIES: 'categoriesItems',
  OPTIONS: 'itemsOptions',
};

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.IMAGE]: '',
  [fieldsName.DESCRIPTION]: '',
  [fieldsName.TIME]: '',
  [fieldsName.PRICE]: '',
  [fieldsName.REQUIRED_SIDES]: 0,
  [fieldsName.IS_OPTION_REQUIRED]: false,
  [fieldsName.ACTIVE]: true,
  [fieldsName.VISIBLE]: true,
  [fieldsName.CATEGORIES]: [],
  [fieldsName.OPTIONS]: [],
};

const loadDependecies = (itemId) => {
  const promises = Promise.allSettled([
    categoryHttp.getCategories(),
    optionHttp.getOptions(),
  ]).then(([catResolved, optResolved]) => ({
    categories:
      catResolved.status === 'fulfilled'
        ? toValueLabelList(catResolved.value)
        : [],
    options:
      optResolved.status === 'fulfilled'
        ? toValueLabelList(optResolved.value)
        : [],
  }));
  if (!itemId) {
    return promises;
  }
  return Promise.all([promises, itemHttp.getItem(itemId)]).then(
    ([
      { categories, options },
      {
        [fieldsName.CATEGORIES]: categoriesIds,
        [fieldsName.OPTIONS]: optionsIds,
        ...values
      },
    ]) => ({
      categories,
      options,
      item: {
        ...values,
        [fieldsName.CATEGORIES]: toSelectList(
          categoriesIds,
          'categoryId',
          categories
        ),
        [fieldsName.OPTIONS]: toSelectList(optionsIds, 'optionId', options),
      },
    })
  );
};

const ItemHandler = ({ isReadOnly }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initValues, setInitValues] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    loadDependecies(id)
      .then(({ categories, options, item }) => {
        setCategories(categories);
        setOptions(options);
        if (item) {
          setInitValues(item);
        }
      })
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  }, [id, formatMessage]);

  const saveItem = ({
    [fieldsName.CATEGORIES]: categories,
    [fieldsName.OPTIONS]: options,
    ...item
  }) => {
    setLoading(true);
    const itemToSave = {
      [fieldsName.CATEGORIES]: toIdList(categories, 'categoryId'),
      [fieldsName.OPTIONS]: toIdList(options, 'optionId'),
      ...item,
    };
    const serviceMethod = id
      ? itemHttp.updateItem(itemToSave)
      : itemHttp.createItem(itemToSave);
    serviceMethod
      .then(() => {
        toast.success(formatMessage(messages.succesfullyCreated));
        history.push(ROUTES.item.list);
      })
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  const deleteItem = () => {
    setLoading(true);
    itemHttp
      .deleteItem(id)
      .then(() => {
        toast.success(formatMessage(messages.succesfullyDeleted));
        history.push(ROUTES.item.list);
      })
      .catch(generalErrorHandler)
      .finally(() => setLoading(false));
  };

  const goBack = () => history.push(ROUTES.item.list);

  return (
    <Item
      loading={loading}
      initValues={initValues}
      isEdit={!!id}
      goBack={goBack}
      saveItem={saveItem}
      deleteItem={deleteItem}
      availableCategories={categories}
      availableOptions={options}
      isReadOnly={isReadOnly}
    />
  );
};

export default ItemHandler;
