import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CardShopCart from "components/cardShopCart";
import PointLoader from "components/pointLoader";
import {APP_AUTH_ROUTES} from "utils/routes";
import RemoveIcon from "assets/icons/btn-remove.svg";
import EmptyCartImg from "assets/icons/emptyIcon.svg";

import {AppDispatch} from "store";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
  isShopCartUse,
  selectShopCart,
  selectShopCartError,
  selectShopCartIsLoading,
} from "store/modules/cart/selectors";
import {selectUserData} from "store/modules/auth/selectors";
import {isShoppingCartUse, resetUserShopCart} from "store/modules/cart/actions";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";

import Cookies from "js-cookie";
import {getUserShopCart} from "store/modules/cart/async-actions";
import classes from "./modalCart.module.css";

const ModalCart: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const isCartOpened = useSelector(isShopCartUse);
  const shopCartCards = useSelector(selectShopCart, shallowEqual);
  const shopCartIsLoading = useSelector(selectShopCartIsLoading);
  const shopCartError = useSelector(selectShopCartError);
  const userInfo = useSelector(selectUserData, shallowEqual);
  const cartLength =
    isCartOpened && userInfo
      ? userInfo.userCart.length
      : userInfo?.userCart.length;
  const errorMsg = shopCartError || "Корзина пуста";
  const accS = Cookies.get("perAcTkn");

  const [totalPrice, setTotalPrice] = useState(() => {
    if (!shopCartCards?.length) {
      return 0;
    }
    return shopCartCards.reduce((sum, el) => sum + el.price * el.itemCount, 0);
  });

  useEffect(() => {
    if (!shopCartCards?.length) {
      setTotalPrice(0);
      return;
    }
    setTotalPrice(() =>
      shopCartCards.reduce((sum, el) => sum + el.price * el.itemCount || 1, 0),
    );
  }, [shopCartCards]);

  useEffect(() => {
    if (cartLength === 0) {
      dispatch(resetUserShopCart());
      return;
    }
    isCartOpened &&
      accS &&
      userInfo &&
      shopCartCards.length !== cartLength &&
      dispatch(
        getUserShopCart({
          cards: userInfo.userCart,
          auth: accS,
          email: userInfo.email,
        }),
      );
  }, [cartLength, isCartOpened]);

  const onCloseCart = useCallback(() => {
    dispatch(isShoppingCartUse(false));
  }, []);

  const onRemoveCardFromCart = useCallback(
    (takenId: string) => {
      if (userInfo && accS) {
        dispatch(
          editUserExtraInfoFx({
            user: {
              ...userInfo,
              userCart: userInfo.userCart.filter(cardId => cardId !== takenId),
            },
            auth: accS,
          }),
        );
      }
    },
    [userInfo, accS],
  );

  const renderExtraContent = () => {
    return !shopCartIsLoading ? (
      <div className={classes.emptyCart}>
        <img src={EmptyCartImg} alt="emptyCart" width={150} height={150} />
        {errorMsg}
      </div>
    ) : (
      <PointLoader scale={0.3} />
    );
  };
  return (
    <div
      className={`${classes.overlay} ${
        isCartOpened ? classes.overlayVisible : ""
      }`}
    >
      <div className={classes.shopCart}>
        <h2 className={classes.shopCartTitle}>
          Корзина
          <img
            onClick={onCloseCart}
            className={classes.shopCartCloseBtn}
            src={RemoveIcon}
            alt="Close"
          />
        </h2>

        {shopCartCards && shopCartCards.length > 0 && !shopCartIsLoading ? (
          <div className={classes.shopCartItems}>
            <div className={classes.items}>
              {shopCartCards.map(card => (
                <CardShopCart
                  key={card._id}
                  card={card}
                  onRemove={onRemoveCardFromCart}
                />
              ))}
            </div>
            <div className={classes.totalPrice}>
              Всего:&nbsp;{totalPrice}&nbsp;руб
            </div>
            <Link
              to={APP_AUTH_ROUTES.order.link}
              onClick={onCloseCart}
              className={classes.createOrderBtn}
            >
              Оформить заказ
            </Link>
          </div>
        ) : (
          renderExtraContent()
        )}
      </div>
    </div>
  );
});
export default ModalCart;
