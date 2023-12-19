import React from "react";
import {VolumMenuProps} from "typings/generalComponents";
import {useSelector} from "react-redux";
import {choosedCatalogFilter} from "store/modules/catalog/selectors";
import cn from "classnames";

import classes from "./catalogFilter.module.css";

interface CatalogFilterProps {
  filterItems: VolumMenuProps[];
  onChooseFilter: (theme: string) => void;
}
const CatalogFilter: React.FC<CatalogFilterProps> = React.memo(
  ({filterItems, onChooseFilter}) => {
    const choosedFilter = useSelector(choosedCatalogFilter);

    const itemsCount = filterItems ? filterItems.length : 0;

    const itemZindex = (index: number) => {
      return {
        zIndex: itemsCount - index,
      };
    };
    return (
      <div className={classes.menu3dContainer}>
        <ul className={classes.menuBlock}>
          {filterItems &&
            filterItems.map((item, index) => (
              <button
                key={item.title + index}
                onClick={() => {
                  onChooseFilter(item.link);
                }}
                className={cn(classes.menuItem, {
                  [classes.activeMenuItem]: choosedFilter === item.link,
                })}
                style={itemZindex(index)}
              >
                <span className={classes.itemLink} style={item.style}>
                  {item.title}
                </span>
              </button>
            ))}
        </ul>
      </div>
    );
  },
);
export default CatalogFilter;
