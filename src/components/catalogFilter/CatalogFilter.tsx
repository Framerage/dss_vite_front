import React, {useCallback} from "react";
import {VolumMenuProps} from "typings/generalComponents";
import {useSelector} from "react-redux";
import {choosedCatalogFilter} from "store/modules/catalog/selectors";
import {selectIsMobile, selectIsTablet} from "store/modules/app/selectors";
import cn from "classnames";
import classes from "./catalogFilter.module.css";

interface CatalogFilterItemProps {
  menuItem: VolumMenuProps;
  itemStyle: (index: number) => {zIndex: number};
  isMobile: boolean;
  itemIndex: number;
  choosedFilter: string;
  onChooseFilter: (theme: string) => void;
}
const CatalogFilterItem: React.FC<CatalogFilterItemProps> = React.memo(
  ({
    menuItem,
    itemStyle,
    isMobile,
    itemIndex,
    choosedFilter,
    onChooseFilter,
  }) => {
    return (
      <button
        key={menuItem.title + itemIndex}
        onClick={() => {
          onChooseFilter(menuItem.link);
        }}
        className={cn(classes.menuItem, {
          [classes.activeMenuItem]: choosedFilter === menuItem.link,
        })}
        style={itemStyle(itemIndex)}
      >
        <span className={classes.itemLink} style={menuItem.style}>
          {isMobile ? menuItem.icon : menuItem.title}
        </span>
      </button>
    );
  },
);
interface CatalogFilterProps {
  filterItems: VolumMenuProps[];
  onChooseFilter: (theme: string) => void;
}
const CatalogFilter: React.FC<CatalogFilterProps> = React.memo(
  ({filterItems, onChooseFilter}) => {
    const choosedFilter = useSelector(choosedCatalogFilter);

    const itemsCount = filterItems ? filterItems.length : 0;
    const isTabletMenu = useSelector(selectIsTablet);
    const isMobileMenu = useSelector(selectIsMobile);
    const getItemZindex = useCallback(
      (index: number) => {
        return {
          zIndex: itemsCount - index,
        };
      },
      [itemsCount],
    );
    return (
      <div className={classes.menu3dContainer}>
        <ul className={classes.menuBlock}>
          {filterItems &&
            filterItems.map((item, index) => (
              <CatalogFilterItem
                key={item.title + index}
                choosedFilter={choosedFilter}
                isMobile={isTabletMenu || isMobileMenu}
                itemIndex={index}
                itemStyle={getItemZindex}
                menuItem={item}
                onChooseFilter={onChooseFilter}
              />
            ))}
        </ul>
      </div>
    );
  },
);
export default CatalogFilter;
