import React, {useCallback, useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";
import Cookies from "js-cookie";
import {AppDispatch} from "store";
import {fetchToCreateOrderRequest} from "store/modules/order/async-actions";
import {
  selectOrderCreating,
  selectOrderCreatingError,
  selectOrderCreatingIsLoading,
} from "store/modules/order/selectors";
import {selectShopCart} from "store/modules/cart/selectors";
import {selectUserData} from "store/modules/auth/selectors";
import {resetOrderCreatingResult} from "store/modules/order/actions";

import {
  editUserExtraInfoFx,
  fetchUserInfo,
} from "store/modules/auth/async-actions";
import {resetUserShopCart} from "store/modules/cart/actions";
import {EMAIL_PATTERN, PHONE_NUM_PATTERN} from "constants/appConstants";
import classes from "./orderPage.module.css";

interface OrderFormData {
  email: string;
  name: string;
  phoneNum: string;
  city: string;
}
const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const orderRequest = useSelector(selectOrderCreating);
  const orderRequestIsLoading = useSelector(selectOrderCreatingIsLoading);
  const orderRequestError = useSelector(selectOrderCreatingError);
  const {handleSubmit, register, formState} = useForm<OrderFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });

  const emailPatternError = formState.errors?.email?.type === "pattern";
  const telNumberPatternError = formState.errors?.phoneNum?.type === "pattern";
  const minLengthPhoneNumberError =
    formState.errors?.phoneNum?.type === "minLength";

  const cartList = useSelector(selectShopCart, shallowEqual);
  const curUser = useSelector(selectUserData);
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.itemCount,
    0,
  );
  const accS = Cookies.get("perAcTkn");

  useEffect(() => {
    if (!orderRequest) {
      return;
    }
    if (orderRequest.success && curUser && curUser.userCart.length) {
      accS &&
        dispatch(
          editUserExtraInfoFx({
            user: {
              ...curUser,
              userCart: [],
            },
            auth: accS,
          }),
        )
          .then(() => {
            accS && dispatch(fetchUserInfo(accS));
          })
          .catch(() => {
            accS && dispatch(fetchUserInfo(accS));
          });
      setTimeout(() => {
        dispatch(resetOrderCreatingResult());
        dispatch(resetUserShopCart());
        navigate(APP_AUTH_ROUTES.catalog.link);
      }, 5000);
    }
  }, [orderRequest, curUser, accS]);

  const onSendOrder = useCallback(
    (data: OrderFormData) => {
      const resultOrder = {...data, userCart: cartList, totalPrice};
      accS &&
        dispatch(fetchToCreateOrderRequest({order: resultOrder, auth: accS}));
    },
    [accS, totalPrice, cartList],
  );
  return (
    <form className={classes.orderForm} onSubmit={handleSubmit(onSendOrder)}>
      {orderRequest ? (
        <div className={classes.resultMessages}>
          {orderRequest.success ? (
            <span>{orderRequest.message}</span>
          ) : (
            <span style={{color: "red"}}>
              {orderRequest.message}
              <br />
              {orderRequestError}
            </span>
          )}
        </div>
      ) : (
        <div className={classes.itemsContainer}>
          <div className={classes.formItems}>
            <div className={classes.formItem}>
              <input
                type="text"
                {...register("name")}
                defaultValue={curUser?.name}
                name="name"
                placeholder="Ваше имя/ник на сайте"
                required
              />
            </div>
            <div className={classes.formItem}>
              <input
                type="text"
                {...register("email", {pattern: EMAIL_PATTERN})}
                defaultValue={curUser?.email}
                name="email"
                placeholder="Ваша почта"
                required
              />
              {emailPatternError && <span>Неверный формат</span>}
            </div>
          </div>

          <div className={classes.formItems}>
            <div className={classes.formItem}>
              <input
                type="tel"
                {...register("phoneNum", {
                  pattern: PHONE_NUM_PATTERN,
                  minLength: 12,
                })}
                name="phoneNum"
                placeholder="+71234567890"
                required
              />
              {(telNumberPatternError || minLengthPhoneNumberError) && (
                <span>
                  {minLengthPhoneNumberError
                    ? "Минимальное количество символов 12"
                    : "Неверный формат"}
                </span>
              )}
            </div>
            <div className={classes.formItem}>
              <input
                type="text"
                {...register("city")}
                name="city"
                placeholder="Ваш город"
              />
            </div>
          </div>
        </div>
      )}

      <div className={classes.productList}>
        {cartList.map(item => (
          <div key={item._id} className={classes.listItem}>
            <span className={classes.textName}>{item.title}</span>
            <span>{item.itemCount}&nbsp;шт.</span>
            <span>{item.price * item.itemCount}&nbsp;руб</span>
          </div>
        ))}
      </div>

      <div className={classes.completeItems}>
        <div className={classes.completePrice}>
          Всего:&nbsp;{totalPrice}&nbsp;руб
        </div>
        <button
          className={classes.completeBtn}
          disabled={orderRequestIsLoading || !!orderRequest?.success}
        >
          {orderRequestIsLoading ? "Loading ..." : "Отправить"}
        </button>
      </div>
    </form>
  );
};
export default OrderPage;
