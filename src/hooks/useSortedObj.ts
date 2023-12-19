import {useMemo} from "react";
import {SortTypes} from "typings/generalTypes";
import {checkColumnBySort} from "./hooksHelpers";

/**
 * @param obj объект/список, который мы сортируем,
 * @param columnKey - выбранный столбец по которому сортируется,
 * @param condition - вид сортировки от меньшего к большему/ от большего к меньшему
 * @returns script version
 */

export const useSortedObj = <T>(
  obj: T[],
  columnKey: keyof T,
  condition: SortTypes,
) => {
  return useMemo(() => {
    if (obj && columnKey) {
      return [...obj].sort((a, b) => {
        const [first, second] = condition === SortTypes.ABC ? [a, b] : [b, a];
        return checkColumnBySort<T>(columnKey, first, second);
      });
    }
    return obj;
  }, [obj, columnKey, condition]);
};
