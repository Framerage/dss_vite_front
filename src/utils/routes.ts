// import AboutPage from "pages/aboutPage";
// import CardFullDescrip from "pages/cardFullDescrip";
// import Catalog from "pages/catalog";
// import ContactsPage from "pages/contactsPage";
// import CreateOrder from "pages/createOrder";
// import CreatingCard from "pages/creatingCard";
// import OrderPage from "pages/orderPage/OrderPage";
// import PersonalPage from "pages/personalPage";
// import RegistrationPage from "pages/regPage";
import LoginPage from "pages/loginPage";
import MainPage from "pages/mainPage/MainPage";
import React from "react";

interface RoutesType {
  [key: string]: {component: React.FC | null; link: string; index?: boolean};
}
export const FOR_GH_PAGES = "";
// export const FOR_GH_PAGES = "/dss_react_frontend";
export const APP_GENERAL_ROUTES: RoutesType = {
  main: {link: `${FOR_GH_PAGES}/`, component: MainPage, index: true},
  //   catalog: {link: FOR_GH_PAGES + "/cards", component: Catalog},
  //   catalogCard: {link: FOR_GH_PAGES + "/cards/:id", component: CardFullDescrip},
  //   contacts: {link: FOR_GH_PAGES + "/contacts", component: ContactsPage},
  //   about: {link: FOR_GH_PAGES + "/about", component: AboutPage},
  login: {link: `${FOR_GH_PAGES}/auth/login`, component: LoginPage},
  //   registration: {
  //     link: FOR_GH_PAGES + "/auth/registration",
  //     component: RegistrationPage,
  //   },
};
export const APP_AUTH_ROUTES: RoutesType = {
  main: {link: FOR_GH_PAGES, component: MainPage, index: true},
  //   catalog: {link: FOR_GH_PAGES + "/cards", component: Catalog},
  //   catalogCard: {link: FOR_GH_PAGES + "/cards/:id", component: CardFullDescrip},
  //   creatingCard: {link: FOR_GH_PAGES + "/create-card", component: CreatingCard},
  //   contacts: {link: FOR_GH_PAGES + "/contacts", component: ContactsPage},
  //   about: {link: FOR_GH_PAGES + "/about", component: AboutPage},
  //   customOrder: {
  //     link: FOR_GH_PAGES + "/create-own-decor",
  //     component: CreateOrder,
  //   },
  //   order: {link: FOR_GH_PAGES + "/order", component: OrderPage},
  login: {link: `${FOR_GH_PAGES}/auth/login`, component: LoginPage},
  //   personPage: {link: FOR_GH_PAGES + "/my-account", component: PersonalPage},
};
// "homepage": "https://framerage.github.io/dss_react_frontend",

export const ORDERS_ROUTES = {
  printVol: "/3d-printers",
  laserEngr: "/laser-engraving",
  furniture: "/furniture",
  reliefPic: "/bas-relief-picture",
  plywood: "/plywood-frames",
  neon: "/neon-decor",
};
