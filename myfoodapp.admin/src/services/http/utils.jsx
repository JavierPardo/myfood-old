import { toPairs } from 'lodash';

export const convertToForm = (data) => {
  const dataForm = new FormData();
  toPairs(data).forEach(([key, value]) => {
    dataForm.append(
      key,
      typeof value === 'object' ? convertToForm(value) : value
    );
  });
  return dataForm;
};
