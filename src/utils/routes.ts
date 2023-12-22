import AboutPage from "pages/aboutPage";
import CardFullDescrip from "pages/cardFullDescrip";
import Catalog from "pages/catalog";
import ContactsPage from "pages/contactsPage";
import CreateIndivOrder from "pages/createIndivOrder/CreateIndivOrder";
import CreatingCard from "pages/creatingCard";
import IndivOrderPage from "pages/indivOrderPage";
import LoginPage from "pages/loginPage";
import MainPage from "pages/mainPage";
import OrderPage from "pages/orderPage";
import PersonalPage from "pages/personalPage";
import RegistrationPage from "pages/regPage";
import React from "react";

interface RoutesType {
  [key: string]: {component: React.FC | null; link: string; index?: boolean};
}
export const FOR_GH_PAGES = "";
// export const FOR_GH_PAGES = "/dss_vite_front";
export const ORDERS_ROUTES = {
  printVol: "/3d-printers",
  laserEngr: "/laser-engraving",
  furniture: "/furniture",
  reliefPic: "/bas-relief-picture",
  plywood: "/plywood-frames",
  neon: "/neon-decor",
};

export const APP_GENERAL_ROUTES: RoutesType = {
  main: {link: `${FOR_GH_PAGES}/`, component: MainPage, index: true},
  catalog: {link: `${FOR_GH_PAGES}/catalog`, component: Catalog},
  catalogCard: {
    link: `${FOR_GH_PAGES}/catalog/:id`,
    component: CardFullDescrip,
  },
  contacts: {link: `${FOR_GH_PAGES}/contacts`, component: ContactsPage},
  about: {link: `${FOR_GH_PAGES}/about`, component: AboutPage},
  login: {link: `${FOR_GH_PAGES}/auth/login`, component: LoginPage},
  registration: {
    link: `${FOR_GH_PAGES}/auth/registration`,
    component: RegistrationPage,
  },
};
export const APP_AUTH_ROUTES: RoutesType = {
  main: {link: FOR_GH_PAGES, component: MainPage, index: true},
  catalog: {link: `${FOR_GH_PAGES}/catalog`, component: Catalog},
  catalogCard: {
    link: `${FOR_GH_PAGES}/catalog/:id`,
    component: CardFullDescrip,
  },
  creatingCard: {link: `${FOR_GH_PAGES}/create-card`, component: CreatingCard},
  contacts: {link: `${FOR_GH_PAGES}/contacts`, component: ContactsPage},
  about: {link: `${FOR_GH_PAGES}/about`, component: AboutPage},
  customOrder: {
    link: `${FOR_GH_PAGES}/create-indiv-order`,
    component: CreateIndivOrder,
  },
  customFurnitureOrder: {
    link: `${FOR_GH_PAGES}/create-indiv-order${ORDERS_ROUTES.furniture}`,
    component: IndivOrderPage,
  },
  order: {link: `${FOR_GH_PAGES}/order`, component: OrderPage},
  login: {link: `${FOR_GH_PAGES}/auth/login`, component: LoginPage},
  personPage: {link: `${FOR_GH_PAGES}/my-account`, component: PersonalPage},
};
// "homepage": "https://framerage.github.io/dss_vite_front",
