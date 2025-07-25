import round from 'lodash/round';
import { toPairs } from 'lodash/object';
import get from 'lodash/get';
import * as moment from 'moment';

export const imageToFile = (image) => {
  if (!image) {
    return undefined;
  }
  const file = new File([''], 'unknown');
  if (image.startsWith('data:')) {
    return { ...file, preview: image };
  }
  return { ...file, preview: `data:image/png;base64, ${image}` };
};

export const renderEnum = function (listEnum, stringProp, event) {
  if (!listEnum) {
    return '';
  }
  const element = listEnum.find((x) => x.id === event[stringProp]);
  return element && element.name;
};

export const roundFixed = (value, decimals = 2) =>
  round(value, decimals).toFixed(2);

export function dateToString({ formatDate, propertyName }, date) {
  if (!date[propertyName]) return '';
  return moment(date[propertyName]).format(formatDate);
}

export const toValueLabelList = (
  items,
  keySelector = 'id',
  labelSelector = 'name'
) =>
  items.map((item) => ({
    value: get(item, keySelector),
    label: get(item, labelSelector),
  }));

export const toIdList = (items, idName = 'id') => {
  if (!items) {
    return null;
  }
  return items.map(({ value }) => ({ [idName]: value }));
};

export const toSelectList = (items, idName, options) =>
  items.map(({ [idName]: id }) => findInSelectList(id, options)); //options.find(({ value }) => value === id));

export const findInSelectList = (id, options) =>
  options.find(({ value }) => value === id);

export const convertToForm = (fields) => {
  const data = new FormData();
  toPairs(fields).forEach(([key, value]) => {
    data.append(key, typeof value === 'object' ? convertToForm(value) : value);
  });
  return data;
};

File.prototype.convertToBase64 = function (callback) {
  var FR = new FileReader();
  FR.onload = function (e) {
    callback(e.target.result);
  };
  FR.readAsDataURL(this);
};

export const toDictonary = (list, key = 'id', value = 'name') =>
  list.reduce((dic, obj) => ({ ...dic, [obj[key]]: obj[value] }), {});

export const formatDate = (fieldName, format) => ({
  [fieldName]: dateTime,
}) => {
  return moment.utc(dateTime).local().format(format);
};

export const formatFromDic = (fieldName, dictonary) => ({
  [fieldName]: fieldId,
}) => get(dictonary, fieldId, '');

export const sortByDate = (fieldName, format) => (
  { [fieldName]: date1 },
  { [fieldName]: date2 }
) => {
  if (moment(date1, format).isSame(moment(date2, format))) {
    return 0;
  }
  const isAfter = moment(date1, format).isAfter(moment(date2, format));
  return isAfter ? 1 : -1;
};

export const filterByTerm = (items, term, columns) => {
  const itemsFiltered = items.filter((row) => {
    return columns.some((fieldName) => {
      const inWhichLook = get(row, fieldName, '').toString().trim();
      return inWhichLook.toLowerCase().includes(term.toString().toLowerCase());
    });
  });
  return itemsFiltered;
};

export const filterByEquality = (items, term, columns) => {
  const itemsFiltered = items.filter((row) => {
    return columns.some((fieldName) => {
      const value = get(row, fieldName, '');
      // eslint-disable-next-line eqeqeq
      return value == term;
    });
  });
  return itemsFiltered;
};

export const filterByDateRange = (items, column, from, to) => {
  return items.filter(({ [column]: dateCol }) => {
    const momentDateCol = moment(dateCol);
    const isAfter = from ? momentDateCol.isSameOrAfter(from) : true;
    const isBefore = to ? momentDateCol.isSameOrBefore(to) : true;
    return isAfter && isBefore;
  });
};

export const userHasSomeRoles = (userRoles, requiredRoles) =>
  userRoles.some((role) => requiredRoles.includes(role));
