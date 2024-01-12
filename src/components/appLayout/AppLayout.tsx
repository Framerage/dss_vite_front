import React, {useEffect, useMemo} from "react";
import {Route, Routes} from "react-router-dom";

import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";

import Cookies from "js-cookie";

import AppMenu from "components/appMenu";
import AppFooter from "components/appFooter";
import AppHeader from "components/appHeader";
import AppPopup from "components/AppPopup";
import ModalCart from "components/modalCart";

import ErrorPage from "pages/errorPage";
import LoginPage from "pages/loginPage";

import {useAppDispatch} from "store";
import {useSelector} from "react-redux";
import {isUserAuth, selectUserData} from "store/modules/auth/selectors";
import {getUserAuth, resetUserRequest} from "store/modules/auth/actions";
import {fetchUserInfo} from "store/modules/auth/async-actions";
import {isShopCartUse} from "store/modules/cart/selectors";
import {selectPopupImage} from "store/modules/popup/selectors";
import CatalogIcon from "assets/icons/menu-icons/catalog.svg";
import OrdersIcon from "assets/icons/menu-icons/design-order.svg";
import AboutIcon from "assets/icons/menu-icons/about.svg";
import ContactsIcon from "assets/icons/menu-icons/contacts.svg";
import classes from "./appLayout.module.css";

const AppLayout: React.FC = () => {
  const userData = useSelector(selectUserData);
  const isAuth = useSelector(isUserAuth);
  const dispatch = useAppDispatch();
  const accTkn = Cookies.get("perAcTkn");

  const appNavigation = useMemo(() => {
    return [
      {
        title: "Каталог",
        link: isAuth
          ? APP_AUTH_ROUTES.catalog.link
          : APP_GENERAL_ROUTES.catalog.link,
        icon: <img src={CatalogIcon} alt="ctlg" />,
      },
      {
        title: "Свой дизайн заказа",
        link: APP_AUTH_ROUTES.customOrder.link,
        icon: <img src={OrdersIcon} alt="ctlg" />,
      },
      {
        title: "О нас",
        link: isAuth
          ? APP_AUTH_ROUTES.about.link
          : APP_GENERAL_ROUTES.about.link,
        icon: <img src={AboutIcon} alt="ctlg" />,
      },
      {
        title: "Контакты",
        link: isAuth
          ? APP_AUTH_ROUTES.contacts.link
          : APP_GENERAL_ROUTES.contacts.link,
        icon: <img src={ContactsIcon} alt="ctlg" />,
      },
    ];
  }, [isAuth]);

  const isCartOpened = useSelector(isShopCartUse);
  const isPopupOpen = useSelector(selectPopupImage);

  // TODO: настроить счетчик заказов
  // TODO: добавить сохранение БД в файлы на серве (резервн сохранение данных)
  // TODO: админская секция/страница со статистикой просмотров/лайков
  // TODO: страница создания собственного заказа
  // TODO: адаптив для всех страниц
  // TODO: подумать об использовании промокода при регистрации для акций и бонусов(проверку делать на бэке и возвращать текущее/расчитанное кол-во бонусов)
  // TODO:  придумать текст about
  // TODO: страница заказа, добавить оплату надо ли???
  // TODO:  добавить ли рефреш токен?

  useEffect(() => {
    if (!isAuth) {
      if (userData && userData.success && !accTkn) {
        dispatch(resetUserRequest());
        dispatch(getUserAuth(false));
        return;
      }
      if (!userData && !accTkn) {
        dispatch(getUserAuth(false));
        return;
      }
      if (!userData && accTkn) {
        dispatch(fetchUserInfo(accTkn));
        return;
      }
      if (userData && !userData.success && accTkn) {
        dispatch(fetchUserInfo(accTkn));
        return;
      }
      if (userData && userData.success && accTkn) {
        dispatch(getUserAuth(true));
        return;
      }
    }
    if (!accTkn) {
      dispatch(resetUserRequest());
      dispatch(getUserAuth(false));
    }
  }, [userData, accTkn, isAuth]);
  console.log("render layout");

  return (
    <div
      className={classes.appWrapper}
      style={{
        height: isCartOpened || !!isPopupOpen ? "100vh" : "auto",
        overflow: isCartOpened || !!isPopupOpen ? "hidden" : "inherit",
      }}
    >
      <AppPopup />
      <ModalCart />
      <AppHeader />
      <main className={classes.mainContainer}>
        {isAuth ? (
          <div className={classes.contentWrapper}>
            <Routes>
              {Object.values(APP_AUTH_ROUTES).map(appRoute => (
                <Route
                  key={appRoute.link}
                  index={appRoute.index}
                  path={appRoute.link}
                  Component={appRoute.component}
                />
              ))}
              <Route path="*" Component={isAuth ? ErrorPage : LoginPage} />
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </div>
        ) : (
          <div className={classes.contentWrapper}>
            <Routes>
              {Object.values(APP_GENERAL_ROUTES).map(appRoute => (
                <Route
                  key={appRoute.link}
                  index={appRoute.index}
                  path={appRoute.link}
                  Component={appRoute.component}
                />
              ))}
              <Route path="*" Component={isAuth ? ErrorPage : LoginPage} />
            </Routes>
            <AppMenu menuItems={appNavigation} />
          </div>
        )}
      </main>
      <AppFooter />
    </div>
  );
};
export default AppLayout;
