import React, {useCallback} from "react";
import {Link} from "react-router-dom";
import {VolumMenuProps} from "typings/generalComponents";
import {useResize} from "hooks/useResize";
import classes from "./appMenu.module.css";

interface AppMenuItemProps {
  menuItem: VolumMenuProps;
  itemStyle: (index: number) => {zIndex: number};
  isMobile: boolean;
  index: number;
}
const AppMenuItem: React.FC<AppMenuItemProps> = React.memo(
  ({menuItem, itemStyle, isMobile, index}) => {
    return (
      <Link
        to={menuItem.link}
        className={classes.menuItem}
        style={itemStyle(index)}
      >
        <span className={classes.itemLink} style={menuItem.style}>
          {isMobile ? menuItem.icon : menuItem.title}
        </span>
      </Link>
    );
  },
);
const AppMenu: React.FC<{menuItems?: VolumMenuProps[]}> = ({menuItems}) => {
  const itemsCount = menuItems ? menuItems.length : 0;
  const currentWidth = useResize();
  const isMobileMenu = currentWidth < 1025;

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
        {menuItems &&
          menuItems.map((item, index) => (
            <AppMenuItem
              key={item.title + index}
              index={index}
              menuItem={item}
              itemStyle={getItemZindex}
              isMobile={isMobileMenu}
            />
          ))}
      </ul>
    </div>
  );
};

export default AppMenu;
