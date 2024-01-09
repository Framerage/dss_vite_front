import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  selectAllOrders,
  selectAllOrdersError,
  selectAllOrdersIsLoading,
  selectOrderKeySort,
  selectOrderSortCondition,
} from "store/modules/order/selectors";
import PointLoader from "components/pointLoader";
import {AppDispatch} from "store";
import {
  editChoosedOrder,
  fetchAllOrders,
  fetchUserOrders,
  removeChoosedOrder,
} from "store/modules/order/async-actions";
import Cookies from "js-cookie";
import {selectUserData} from "store/modules/auth/selectors";
import {OrderRequestResult, OrderStatuses} from "typings/orders";
import {useSortedObj} from "hooks/useSortedObj";
import {SortTypes} from "typings/generalTypes";
import AppSearcher from "components/appSearcher";
import {useFiltredObj} from "hooks/useFilteredObj";
import {setPopupImage} from "store/modules/popup/actions";
import {setBase64Image} from "helpers/appHelpers";
import OrderCard from "../orderCard";
import classes from "./allOrders.module.css";

interface OrdersProps {
  markRole: string;
}
const AllOrders: React.FC<OrdersProps> = ({markRole}) => {
  const dispatch = useDispatch<AppDispatch>();
  const allOrders = useSelector(selectAllOrders);
  const ordersIsLoading = useSelector(selectAllOrdersIsLoading);
  const ordersError = useSelector(selectAllOrdersError);

  const sortCondition = useSelector(selectOrderSortCondition);

  const choosedOrderKey = useSelector(selectOrderKeySort);

  const curUser = useSelector(selectUserData);
  const accS = Cookies.get("perAcTkn");
  const [searchValue, setSearchValue] = useState("");

  const sortedOrders = useSortedObj<OrderRequestResult>(
    allOrders && allOrders.orders.length ? allOrders.orders : [],
    choosedOrderKey as keyof OrderRequestResult,
    sortCondition ? SortTypes.ABC : SortTypes.CBA,
  );

  const filteredOrders = useFiltredObj<OrderRequestResult>(
    sortedOrders,
    "name",
    searchValue,
  );
  const roleAccess = useMemo(() => {
    return curUser && curUser.role === "admin" && markRole === curUser.role;
  }, [curUser, markRole]);

  useEffect(() => {
    if (curUser && curUser.success && accS) {
      roleAccess
        ? dispatch(fetchAllOrders({auth: accS, email: curUser.email}))
        : dispatch(fetchUserOrders({auth: accS, email: curUser.email}));
    }
  }, [markRole]);

  const onChooseOrderImg = useCallback((img: string) => {
    dispatch(setPopupImage(setBase64Image("", img)));
  }, []);
  const onDeleteOrder = useCallback(
    (e: React.MouseEvent<HTMLElement>, orderId: string) => {
      e.stopPropagation();
      const check = window.prompt("Are you sure want to delete? Enter pass");
      if (
        check === import.meta.env.VITE_ADM_PSS &&
        curUser &&
        sortedOrders.length &&
        accS
      ) {
        dispatch(removeChoosedOrder({id: orderId, auth: accS}))
          .then(({payload}) => {
            if (!payload) {
              return;
            }
            if (payload.success) {
              window.alert("Заказ успешно удален");
              dispatch(fetchAllOrders({auth: accS, email: curUser.email}));
              return;
            }
            window.alert("Не удалось удалить заказ");
          })
          .catch(() => {
            window.alert("Ошибка соединения");
          });
        return;
      }
      window.alert("Какая-то ошибка");
    },
    [allOrders, accS, curUser],
  );
  const onSaveChangesByOrderCard = useCallback(
    (order: OrderRequestResult, status: OrderStatuses) => {
      curUser &&
        accS &&
        dispatch(
          editChoosedOrder({
            order: {...order, orderStatus: status},
            auth: accS,
          }),
        ).then(res => {
          res.payload?.success &&
            dispatch(fetchAllOrders({auth: accS, email: curUser.email}));
        });
    },
    [curUser, accS],
  );
  return (
    <div className={classes.ordersContainer}>
      {roleAccess && <AppSearcher onCreateSearchValue={setSearchValue} />}

      {!ordersIsLoading ? (
        <div className={classes.ordersList}>
          {allOrders &&
          allOrders.success &&
          filteredOrders &&
          filteredOrders.length ? (
            filteredOrders.map(order => (
              <OrderCard
                key={order._id}
                order={order}
                markRole={markRole}
                onRemoveOrder={onDeleteOrder}
                onSaveOrder={onSaveChangesByOrderCard}
                onChooseOrderImg={onChooseOrderImg}
              />
            ))
          ) : (
            <div className={classes.errorText}>
              {!allOrders?.success ? ordersError : "Empty list"}
            </div>
          )}
        </div>
      ) : (
        <PointLoader scale={0.4} />
      )}
    </div>
  );
};
export default AllOrders;
