import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import menuLogo from "assets/images/decor-logo.png";
import cn from "classnames";
import classes from "./orderMenu.module.css";

interface OrderMenuProps {
  menuItems: {
    name: string;
    image: string;
    link: string;
    isDisabled?: boolean;
  }[];
}
const hintBrowserStyle = {
  willChange: "transform, translate, transform-origin,opacity",
};
const removeHintStyle = {willChange: "auto"};
const OrderMenu: React.FC<OrderMenuProps> = ({menuItems}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentNavStyle, setCurrentNavStyle] = useState(hintBrowserStyle);

  const onUseMenu = () => setIsMenuOpen(!isMenuOpen);

  const itemsAmount = menuItems.length;
  const itemsContant = menuItems;

  const iconStyle = (elem: number) => {
    return {
      transitionDelay: `calc(0.1s*${elem}`,
      transform: isMenuOpen
        ? `rotate(calc(360deg / ${itemsAmount} * ${elem + 2}))`
        : "rotate(0deg) translateX(150px)",
    };
  };
  const imageStyle = (elem: number) => {
    return {
      transform: `rotate(calc(360deg / ${-itemsAmount} * ${elem + 2}))`,
    };
  };

  useEffect(() => {
    return () => {
      setCurrentNavStyle(removeHintStyle);
    };
  }, []);

  return (
    <nav
      className={classes.navContainer}
      id="nav-container"
      style={currentNavStyle}
    >
      <div
        className={cn(classes.menuToggle, {
          [classes.activeToggle]: isMenuOpen,
        })}
        onClick={onUseMenu}
        content={"order"}
      >
        <span className={classes.menuToggleText}>
          {!isMenuOpen ? "Choose order" : ""}
        </span>
        <img
          src={menuLogo}
          alt="menuLogo"
          width={150}
          height={150}
          className={classes.toggleImage}
        />
      </div>
      {itemsContant.map((item, index) => (
        <Link
          to={item.isDisabled ? "" : item.link}
          key={`${item.name}:${index}`}
          className={cn(classes.menuItem, {
            [classes.activeMenu]: isMenuOpen,
            [classes.disabledItem]: item.isDisabled,
          })}
          style={iconStyle(index)}
        >
          <div
            style={imageStyle(index)}
            className={cn(classes.itemText, {
              [classes.isOrderDisabled]: item.isDisabled,
            })}
          >
            {item.name}
            <br />
            {item.isDisabled && "\rВременно недоступно"}
          </div>
          <img
            src={item.image}
            alt="menuItem"
            width={250}
            height={150}
            style={imageStyle(index)}
            className={classes.itemImg}
          />
        </Link>
      ))}
    </nav>
  );
};
export default OrderMenu;
