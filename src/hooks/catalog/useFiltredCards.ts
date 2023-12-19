import {useMemo} from "react";
import {CatalogCardNesting} from "typings/catalogCards";

export const useFiltredCards = (
  obj: CatalogCardNesting[] | null,
  criterion: string,
) => {
  return useMemo(() => {
    if (obj && criterion) {
      return obj.filter(el =>
        String(el.title)
          .toLocaleLowerCase()
          .includes(criterion.toLocaleLowerCase()),
      );
    }
    return obj;
  }, [obj, criterion]);
};
