import React, {useCallback, useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {RegisterOptions, UseFormRegister, useForm} from "react-hook-form";
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
import {
  selectShopCart,
  selectShopCartIsLoading,
} from "store/modules/cart/selectors";
import {selectUserData} from "store/modules/auth/selectors";
import {resetOrderCreatingResult} from "store/modules/order/actions";

import {
  editUserExtraInfoFx,
  fetchUserInfo,
} from "store/modules/auth/async-actions";
import {resetUserShopCart} from "store/modules/cart/actions";
import {EMAIL_PATTERN, PHONE_NUM_PATTERN} from "constants/appConstants";
import {getUserShopCart} from "store/modules/cart/async-actions";
import PointLoader from "components/pointLoader";
import classes from "./orderPage.module.css";

interface OrderFormData {
  email: string;
  name: string;
  phoneNum: string;
  city: string;
}
interface OrderFormItemProps {
  itemName: keyof OrderFormData;
  inputType?: string;
  itemPlaceHolder?: string;
  parentStyle?: string;
  childStyle?: string;
  errorText?: string;
  defaultValue?: string;
  register: UseFormRegister<OrderFormData>;
  registerOprions?:
    | RegisterOptions<OrderFormData, keyof OrderFormData>
    | undefined;
}

const OrderFormItem: React.FC<OrderFormItemProps> = ({
  register,
  itemName,
  itemPlaceHolder,
  parentStyle,
  childStyle,
  errorText,
  defaultValue,
  registerOprions,
  inputType = "text",
}) => {
  return (
    <div className={parentStyle}>
      <input
        className={childStyle}
        type={inputType}
        {...register(itemName, {...registerOprions})}
        name={itemName}
        placeholder={itemPlaceHolder || ""}
        defaultValue={defaultValue}
      />
      {errorText && <span>{errorText}</span>}
    </div>
  );
};

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const orderRequest = useSelector(selectOrderCreating);
  const orderRequestIsLoading = useSelector(selectOrderCreatingIsLoading);
  const orderRequestError = useSelector(selectOrderCreatingError);
  const shopCartIsLoading = useSelector(selectShopCartIsLoading);
  const {handleSubmit, register, formState} = useForm<OrderFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const emailPatternError = formState.errors?.email?.type === "pattern";
  const nameError = formState.errors.name?.type === "required";
  const emailError = formState.errors.email?.type === "required";
  const telNumberPatternError = formState.errors?.phoneNum?.type === "pattern";
  const minLengthPhoneNumberError =
    formState.errors?.phoneNum?.type === "minLength";
  const telNumberErrTextReqPattern = telNumberPatternError
    ? "Неверный формат"
    : "Обязательно для заполнения";
  const telNumberLengthErrText = minLengthPhoneNumberError
    ? "Минимальное количество символов 12"
    : telNumberErrTextReqPattern;
  const emailErrorText = emailError ? "Обязательно для заполнения" : "";
  const cartList = useSelector(selectShopCart, shallowEqual);
  const curUser = useSelector(selectUserData);
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.itemCount,
    0,
  );
  const accS = Cookies.get("perAcTkn");

  useEffect(() => {
    if (!cartList?.length && accS && curUser) {
      dispatch(
        getUserShopCart({
          cards: curUser.userCart,
          auth: accS,
          email: curUser.email,
        }),
      );
    }
  }, []);

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
            <OrderFormItem
              itemName="name"
              itemPlaceHolder="Ваше имя/ник на сайте"
              register={register}
              registerOprions={{
                required: true,
              }}
              parentStyle={classes.formItem}
              childStyle={classes.inputFormItem}
              errorText={nameError ? "Обязательно заполните ник" : ""}
              defaultValue={curUser?.name}
            />
            <OrderFormItem
              itemName="email"
              itemPlaceHolder="Ваша почта"
              register={register}
              registerOprions={{
                pattern: EMAIL_PATTERN,
                required: true,
              }}
              parentStyle={classes.formItem}
              childStyle={classes.inputFormItem}
              errorText={emailPatternError ? "Неверный формат" : emailErrorText}
              defaultValue={curUser?.email}
            />
          </div>

          <div className={classes.formItems}>
            <OrderFormItem
              itemName="phoneNum"
              itemPlaceHolder="+71234567890"
              register={register}
              registerOprions={{
                pattern: PHONE_NUM_PATTERN,
                minLength: 12,
                required: true,
              }}
              parentStyle={classes.formItem}
              childStyle={classes.inputFormItem}
              errorText={telNumberLengthErrText}
            />
            <OrderFormItem
              itemName="city"
              itemPlaceHolder="Ваш город"
              register={register}
              parentStyle={classes.formItem}
              childStyle={classes.inputFormItem}
            />
          </div>
        </div>
      )}

      <div className={classes.productList}>
        {shopCartIsLoading ? (
          <PointLoader scale={0.1} />
        ) : (
          cartList.map(item => (
            <div key={item._id} className={classes.listItem}>
              <span className={classes.textName}>{item.title}</span>
              <span>{item.itemCount}&nbsp;шт.</span>
              <span>{item.price * item.itemCount}&nbsp;руб</span>
            </div>
          ))
        )}
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
