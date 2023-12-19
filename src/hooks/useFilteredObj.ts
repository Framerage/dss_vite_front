import {useMemo} from "react";

/**
 * @param obj массиив объектов, который нужно отфильтровать,
 * @param objKey ключ объекта,по которому нужно отфильтровать,
 * @param criterion - фильтрация объектов/списка по введенному тексту
 * @returns script version
 */

export const useFiltredObj = <T>(
  obj: T[] | null,
  objKey: keyof T,
  criterion: string,
) => {
  return useMemo(() => {
    if (obj && criterion) {
      return obj.filter(el =>
        String(el[objKey])
          .toLocaleLowerCase()
          .includes(criterion.toLocaleLowerCase()),
      );
    }
    return obj;
  }, [obj, objKey, criterion]);
};
