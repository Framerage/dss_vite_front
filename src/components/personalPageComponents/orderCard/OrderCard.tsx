import React, {useState} from "react";
import {OrderRequestResult, OrderStatuses} from "typings/orders";
import {formatDateToLocale} from "helpers/appHelpers";
import DeleteIcon from "assets/icons/btn-remove.svg";
import cn from "classnames";
import classes from "./orderCard.module.css";

interface OrderCardProps {
  order: OrderRequestResult;
  markRole: string;
  onRemoveOrder: (e: React.MouseEvent<HTMLElement>, orderId: string) => void;
  onSaveOrder: (order: OrderRequestResult, status: OrderStatuses) => void;
}
const OrderCard: React.FC<OrderCardProps> = React.memo(
  ({order, markRole, onRemoveOrder, onSaveOrder}) => {
    const [selectValue, setSelectValue] = useState(order.orderStatus);
    const isOrderCanceled = order.orderStatus === OrderStatuses.canceled;
    const isOrderComplete = order.orderStatus === OrderStatuses.complete;
    const isOrderPaided = order.orderStatus === OrderStatuses.paid;
    const {orderStatus} = order;
    return (
      <div
        key={order._id}
        className={cn(classes.orderCardContainer, {
          [classes.canceledOrder]: isOrderCanceled,
          [classes.paidedOrder]: isOrderPaided,
          [classes.completedOrder]: isOrderComplete,
        })}
      >
        <div className={classes.cardItem}>
          <span className={classes.itemText}>Заказчик:&nbsp;{order.name}</span>
          <span className={classes.itemText}>Email:&nbsp;{order.email}</span>
          <span className={classes.itemText}>Phone:&nbsp;{order.phoneNum}</span>
        </div>
        <div className={classes.cardItem}>
          <span className={classes.itemText}>
            Дата создания:&nbsp;
            <br />
            {formatDateToLocale(order.createdAt)}
          </span>
          <span className={classes.itemText}>
            Дата изменения:&nbsp;
            <br />
            {formatDateToLocale(order.updatedAt)}
          </span>
        </div>
        <div className={classes.cardItem}>
          <span className={classes.itemText}>
            Общая цена:&nbsp;{order.totalPrice}&nbsp;rub
          </span>
          {order.city && (
            <span className={classes.itemText}>Город:&nbsp;{order.city}</span>
          )}
          {order.promo && (
            <span className={classes.itemText}>
              Использованный промокод:&nbsp;{order.promo}
            </span>
          )}
        </div>
        <div className={classes.cardItem}>
          {markRole === "admin" ? (
            <>
              <span className={classes.itemText}>Статус заказа:&nbsp;</span>
              <select
                value={selectValue}
                onChange={e => setSelectValue(e.target.value as OrderStatuses)}
                className={classes.statusSlt}
              >
                <option value={OrderStatuses.job}>{OrderStatuses.job}</option>
                <option value={OrderStatuses.paid}>{OrderStatuses.paid}</option>
                <option value={OrderStatuses.canceled}>
                  {OrderStatuses.canceled}
                </option>
                <option value={OrderStatuses.complete}>
                  {OrderStatuses.complete}
                </option>
              </select>
              {selectValue !== order.orderStatus && (
                <button
                  className={classes.saveBtn}
                  onClick={() =>
                    onSaveOrder(order, selectValue as OrderStatuses)
                  }
                >
                  save status
                </button>
              )}
            </>
          ) : (
            <span className={classes.itemText}>
              Статус заказа:&nbsp;
              {orderStatus}
            </span>
          )}
        </div>
        {markRole === "admin" && (
          <img
            src={DeleteIcon}
            alt="deleteBtn"
            width={25}
            height={25}
            className={classes.removeOrderBtn}
            onClick={e => onRemoveOrder(e, order._id)}
          />
        )}
      </div>
    );
  },
);
export default OrderCard;
