import { useState, useCallback } from 'react';
import get from 'lodash/get';

export const useSearchFilter = (items, columns) => {
  const [itemsFiltered, setItemsFiltered] = useState(items);

  const applyFilter = useCallback(
    (term) => {
      const itemsFiltered = items.filter((row) => {
        return columns.some((fieldName) => {
          const inWhichLook = get(row, fieldName, '') || '';
          return inWhichLook
            .toString()
            .trim()
            .toLowerCase()
            .includes(term.toString().toLowerCase());
        });
      });
      setItemsFiltered(itemsFiltered);
    },
    [items, columns]
  );

  return { applyFilter, itemsFiltered };
};
