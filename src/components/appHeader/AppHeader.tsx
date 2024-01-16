import React from "react";
import {Link} from "react-router-dom";

import Arrow from "assets/icons/backArrow.svg";
import ShopCart from "assets/icons/cart-shopping-solid.svg";
import {
  getUserAuth,
  resetRegRequest,
  resetUserRequest,
} from "store/modules/auth/actions";
import {useAppDispatch} from "store";
import {useSelector} from "react-redux";
import {isUserAuth, selectUserData} from "store/modules/auth/selectors";

import Cookies from "js-cookie";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";

import {selectCatalogStatus} from "store/modules/catalog/selectors";
import {isShoppingCartUse, resetUserShopCart} from "store/modules/cart/actions";
import {selectIsMobile} from "store/modules/app/selectors";
import cn from "classnames";
import classes from "./appHeader.module.css";

const AppHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(isUserAuth);
  const userInfo = useSelector(selectUserData);
  const isCatalogOpen = useSelector(selectCatalogStatus);
  const isMobile = useSelector(selectIsMobile);
  const userBonuses = userInfo?.bonuses || 0;
  const currentUser = userInfo?.name || "-";
  const userCartCount = userInfo?.userCart?.length || 0;

  const onLogOut = () => {
    dispatch(resetUserRequest());
    dispatch(resetRegRequest());
    dispatch(resetUserShopCart());
    Cookies.remove("perAcTkn");
    dispatch(getUserAuth(false));
  };
  const onOpenShopCart = () => {
    dispatch(isShoppingCartUse(true));
  };
  return (
    <header
      className={cn(classes.headerContainer, {
        [classes.headerBG]: isCatalogOpen,
      })}
    >
      <Link to={APP_AUTH_ROUTES.main.link} className={classes.headerLogo}>
        <div className={classes.firstLogo}>Decor</div>
        <div className={classes.secondLogo}>spirit</div>
        <div className={classes.botBorder}></div>
      </Link>
      <div
        onClick={() => window.history.go(-1)}
        className={classes.goBackArrow}
      >
        <img
          src={Arrow}
          alt="back"
          width={30}
          height={30}
          style={{transform: "rotate(-130deg)", position: "relative"}}
        />
        {!isMobile && <span className={classes.arrowText}>Назад</span>}
      </div>
      {isAuth ? (
        <div className={classes.authedBlock}>
          <div className={classes.cartBlock}>
            <img
              src={ShopCart}
              alt="cart"
              onClick={onOpenShopCart}
              className={classes.userShopCart}
            />
            <sup className={classes.cartCounter}>{userCartCount}</sup>
            <div className={classes.imgBorder}></div>
          </div>

          <div className={classes.userBonuses}>
            Bonuses:&nbsp;
            <i className={classes.bonusesValue}>{userBonuses}</i>
          </div>
          <Link
            to={APP_AUTH_ROUTES.personPage.link}
            className={classes.userLink}
          >
            <span className={classes.currentUser}>&nbsp;{currentUser}</span>
            <div className={classes.userBorder}></div>
          </Link>

          <Link
            to={APP_GENERAL_ROUTES.login.link}
            className={classes.exitBtn}
            onClick={onLogOut}
          />
        </div>
      ) : (
        <nav className={classes.headerNav}>
          <Link
            to={APP_GENERAL_ROUTES.login.link}
            className={classes.headerNavItem}
          >
            Sign in
          </Link>
          <Link
            to={APP_GENERAL_ROUTES.registration.link}
            className={classes.headerNavItem}
          >
            Sign up
          </Link>
        </nav>
      )}
    </header>
  );
};
export default AppHeader;
