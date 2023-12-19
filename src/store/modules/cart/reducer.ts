import {createReducer} from "@reduxjs/toolkit";
import {ShopCartCardsForOrder} from "typings/catalogCards";
import {Prettify} from "typings/generalTypes";
import {
  isShoppingCartUse,
  resetUserShopCart,
  updateCardCountOfCart,
} from "./actions";
import {getUserShopCart} from "./async-actions";

interface ShoppingCartInitioalState {
  isShopCartUsing: boolean;
  shopCartCards: {
    data: Prettify<ShopCartCardsForOrder>[];
    isLoading: boolean;
    error: string | null;
  };
}
const shopCartInitioalState: ShoppingCartInitioalState = {
  isShopCartUsing: false,
  shopCartCards: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const shopCartReducer = createReducer(shopCartInitioalState, builder => {
  builder.addCase(resetUserShopCart, state => {
    state.shopCartCards.data = [];
    state.shopCartCards.isLoading = false;
    state.shopCartCards.error = null;
  });
  builder.addCase(updateCardCountOfCart, (state, {payload}) => {
    state.shopCartCards.data = state.shopCartCards.data.map(el => {
      if (el._id === payload.cardId) {
        return {...el, itemCount: payload.count};
      }
      return el;
    });
  });
  builder.addCase(isShoppingCartUse, (state, {payload}) => {
    state.isShopCartUsing = payload;
  });
  builder.addCase(getUserShopCart.fulfilled, (state, {payload}) => {
    if (!payload?.success) {
      state.shopCartCards.data = [];
      state.shopCartCards.isLoading = false;
      state.shopCartCards.error = "Some error with cart";
      return;
    }
    if (state.shopCartCards.data.length) {
      state.shopCartCards.data.map(stateCard => {
        const newArr = payload.cartCards.map((card: ShopCartCardsForOrder) => {
          if (card._id === stateCard._id) {
            return {...card, itemCount: stateCard.itemCount};
          }
          return card;
        });

        state.shopCartCards.data = newArr;
        return newArr;
      });
      state.shopCartCards.isLoading = false;
      state.shopCartCards.error = null;
      return;
    }
    state.shopCartCards.data = payload.cartCards.map(
      (card: ShopCartCardsForOrder) => {
        return {...card, itemCount: 1};
      },
    );
    state.shopCartCards.isLoading = false;
    state.shopCartCards.error = null;
  });
  builder.addCase(getUserShopCart.pending, state => {
    state.shopCartCards.isLoading = true;
  });
  builder.addCase(getUserShopCart.rejected, state => {
    state.shopCartCards.isLoading = false;
    state.shopCartCards.error = "Error with fetch cart";
  });
});
