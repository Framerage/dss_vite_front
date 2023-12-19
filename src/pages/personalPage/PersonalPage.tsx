import React, {useState} from "react";
// import AllOrders from "components/personalPageComponents/allOrders";
// import PersonalDatas from "components/personalPageComponents/personalDatas";
import ArrowIcon from "assets/icons/arrow.svg";
import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import {selectOrderSortCondition} from "store/modules/order/selectors";
import {
  chooseOrderKeyForSort,
  chooseOrdersSortCondition,
} from "store/modules/order/actions";
import cn from "classnames";
import classes from "./personalPage.module.css";

const menuItems = [
  {
    name: "persData",
    title: "Мои данные",
    // component: <PersonalDatas />,
    component: null,
    role: ["user", "admin"],
  },
  {
    name: "persOrders",
    title: "Мои заказы",
    // component: <AllOrders markRole="user" />,
    component: null,
    role: ["user", "admin"],
  },
  {
    name: "adminOrders",
    title: "Все заказы",
    // component: <AllOrders markRole="admin" />,
    component: null,
    role: "admin",
  },
  {name: "statistic", title: "Статистика", component: null, role: "admin"},
];

const PersonalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectUserData);
  const sortCondition = useSelector(selectOrderSortCondition);

  // console.log(userInfo && Object.keys(userInfo), "onfp");
  // TODO: check оформление информации юзера
  // TODO: check раскомпановка верстки!! опитимизация селектора

  const [choosedMenuItem, setChoosedMenuItem] = useState(menuItems[0].name);
  const onChooseMenuItem = (itemName: string) => setChoosedMenuItem(itemName);
  const renderChoosedInfo = (choosedInfo: string) => {
    return menuItems.filter(el => el.name === choosedInfo)[0].component;
  };
  const onChangeSortCondition = () =>
    dispatch(chooseOrdersSortCondition(!sortCondition));
  return (
    <div className={classes.personalPageContainer}>
      <div className={classes.persPageMenu}>
        <div className={classes.menuItems}>
          {menuItems.map(
            item =>
              userInfo &&
              item.role.includes(userInfo.role) && (
                <div
                  key={item.name}
                  className={cn(classes.menuItem, {
                    [classes.activeItem]: choosedMenuItem === item.name,
                  })}
                  onClick={() => onChooseMenuItem(item.name)}
                >
                  {item.title}
                </div>
              ),
          )}
        </div>
        {(choosedMenuItem === "persOrders" ||
          choosedMenuItem === "adminOrders") && (
          <>
            <div
              className={cn(classes.menuItem, classes.arrowItem)}
              onClick={onChangeSortCondition}
            >
              <img
                src={ArrowIcon}
                alt="arrow"
                className={cn(classes.sortArrow, {
                  [classes.sortArrowUp]: sortCondition,
                })}
              />
            </div>
            <select
              defaultValue="createdAt"
              className={cn(classes.selectMenuItem)}
              onChange={e => dispatch(chooseOrderKeyForSort(e.target.value))}
            >
              <option value="createdAt">Sort by date</option>
              <option value="name">Sort by name</option>
              <option value="orderStatus">Sort by status</option>
            </select>
          </>
        )}
      </div>

      {userInfo && userInfo.success && (
        <div className={classes.previewContainer}>
          {renderChoosedInfo(choosedMenuItem)}
        </div>
      )}
    </div>
  );
};
export default PersonalPage;
