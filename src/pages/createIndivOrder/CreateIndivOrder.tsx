import React, {useMemo} from "react";
import VolumePrint from "assets/images/3d-printer.jpg";
import LaserEngr from "assets/images/engr-acrilic.jpg";
import Furniture from "assets/images/furniture.jpg";
import BasRelief from "assets/images/bas-relief.jpg";
import Plywood from "assets/images/plywood-frame.jpg";
import NeonDecor from "assets/images/neon-decor.jpeg";
import OrderMenu from "components/orderMenu";

import {APP_AUTH_ROUTES, ORDERS_ROUTES} from "utils/routes";

import classes from "./createIndivOrder.module.css";

const CreateIndivOrder: React.FC = () => {
  const orderMenuItems = useMemo(() => {
    return [
      {
        name: "3D-printer",
        image: VolumePrint,
        link: APP_AUTH_ROUTES.customOrder.link + ORDERS_ROUTES.printVol,
        isDisabled: true,
      },
      {
        name: "Laser engraving",
        image: LaserEngr,
        link: APP_AUTH_ROUTES.customOrder.link + ORDERS_ROUTES.laserEngr,
        isDisabled: true,
      },

      {
        name: "Relief pictures",
        image: BasRelief,
        link: APP_AUTH_ROUTES.customOrder.link + ORDERS_ROUTES.reliefPic,
        isDisabled: true,
      },
      {
        name: "Wood cutting",
        image: Plywood,
        link: APP_AUTH_ROUTES.customOrder.link + ORDERS_ROUTES.plywood,
        isDisabled: true,
      },

      {
        name: "Decor furniture",
        image: Furniture,
        link: APP_AUTH_ROUTES.customOrder.link + ORDERS_ROUTES.furniture,
        isDisabled: false,
      },
      {
        name: "Neon decor",
        image: NeonDecor,
        link: APP_AUTH_ROUTES.customOrder.link + ORDERS_ROUTES.neon,
        isDisabled: true,
      },
    ];
  }, []);
  return (
    <div className={classes.orderContainer}>
      <div className={classes.menuContainer}>
        <OrderMenu menuItems={orderMenuItems} />
      </div>
      <div className={classes.orderHelper}>
        <span>
          Привет, друзья! Здесь вы можете предложить/описать свой дизайн
          проекта, свою давнюю мечту, которую хотели бы воплотить, используя
          наши возможности
        </span>
      </div>
    </div>
  );
};
export default CreateIndivOrder;
