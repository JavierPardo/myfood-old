import { useState, useEffect, useCallback } from 'react';
import { useSearchFilter } from '../../../common/hooks/useSearchFilter';
import { fieldsName } from './CouponHandler';
import { filterByEquality } from '../../../common/utils';

const columnsToSearch = [fieldsName.NAME, fieldsName.CODE];

export const useFilterBar = (items) => {
  const [itemsFiltered, setItemsFiltered] = useState(items);
  const [typeId, setTypeId] = useState(0);
  const {
    applyFilter: applyInputFilter,
    itemsFiltered: inputItemsFiltered,
  } = useSearchFilter(items, columnsToSearch);

  const applyFilter = useCallback(
    ({ term, typeId }) => {
      applyInputFilter(term);
      setTypeId(typeId);
    },
    [applyInputFilter]
  );

  useEffect(() => {
    const afterTypeFilter =
      typeId === 0
        ? inputItemsFiltered
        : filterByEquality(inputItemsFiltered, typeId, [fieldsName.TYPE]);
    setItemsFiltered(afterTypeFilter);
  }, [inputItemsFiltered, typeId]);
  return { applyFilter, itemsFiltered };
};
