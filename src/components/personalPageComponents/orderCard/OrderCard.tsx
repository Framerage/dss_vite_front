import React, {useState} from "react";
import {OrderRequestResult, OrderStatuses} from "typings/orders";
import {formatDateToLocale, setBase64Image} from "helpers/appHelpers";
import DeleteIcon from "assets/icons/btn-remove.svg";
import cn from "classnames";
import classes from "./orderCard.module.css";

interface OrderCardProps {
  order: OrderRequestResult;
  markRole: string;
  onRemoveOrder: (e: React.MouseEvent<HTMLElement>, orderId: string) => void;
  onSaveOrder: (order: OrderRequestResult, status: OrderStatuses) => void;
  onChooseOrderImg: (img: string) => void;
}
const OrderCard: React.FC<OrderCardProps> = React.memo(
  ({order, markRole, onRemoveOrder, onSaveOrder, onChooseOrderImg}) => {
    const [selectValue, setSelectValue] = useState(order.orderStatus);
    const {orderStatus, orderType} = order;
    const isOrderCanceled = orderStatus === OrderStatuses.canceled;
    const isOrderComplete = orderStatus === OrderStatuses.complete;
    const isOrderPaided = orderStatus === OrderStatuses.paid;
    const translateOrderType =
      orderType === "custom" ? "индивидуальный" : "обычный";
    return (
      <div
        key={order._id}
        className={cn(classes.orderCardContainer, {
          [classes.canceledOrder]: isOrderCanceled,
          [classes.paidedOrder]: isOrderPaided,
          [classes.completedOrder]: isOrderComplete,
        })}
      >
        <div className={classes.shortCardDatas}>
          <div className={classes.cardItem}>
            <span className={classes.itemText}>
              Заказчик:&nbsp;{order.name}
            </span>
            <span className={classes.itemText}>Email:&nbsp;{order.email}</span>
            <span className={classes.itemText}>
              Phone:&nbsp;{order.phoneNum}
            </span>
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
              Общая цена:&nbsp;
              {order.totalPrice ? `${order.totalPrice} rub` : "Не назначена"}
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
                  onChange={e =>
                    setSelectValue(e.target.value as OrderStatuses)
                  }
                  className={classes.statusSlt}
                >
                  <option value={OrderStatuses.job}>{OrderStatuses.job}</option>
                  <option value={OrderStatuses.paid}>
                    {OrderStatuses.paid}
                  </option>
                  <option value={OrderStatuses.canceled}>
                    {OrderStatuses.canceled}
                  </option>
                  <option value={OrderStatuses.complete}>
                    {OrderStatuses.complete}
                  </option>
                </select>
                {selectValue !== orderStatus && (
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
            <span className={classes.itemText}>
              Вид заказа:&nbsp;{translateOrderType}
            </span>
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
        {order.orderDescrip && (
          <div className={classes.longCardDatas}>
            <span>Описание</span>
            <div>{order.orderDescrip}</div>
          </div>
        )}
        {order.specImgsOrder.length && (
          <div className={classes.orderImages}>
            {order.specImgsOrder.map((img, index) => (
              <img
                key={index + img}
                className={classes.orderImg}
                src={setBase64Image("", img)}
                alt="orderImg"
                width={200}
                height={100}
                onClick={() => onChooseOrderImg(img)}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
export default OrderCard;
