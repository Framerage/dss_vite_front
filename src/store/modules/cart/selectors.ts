import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelector";

const selectShopCartState = createSelector(
  selectRoot,
  root => root.shopCartReducer,
);

export const selectShopCart = createSelector(
  selectShopCartState,
  state => state.shopCartCards.data,
);
export const selectShopCartIsLoading = createSelector(
  selectShopCartState,
  state => state.shopCartCards.isLoading,
);
export const selectShopCartError = createSelector(
  selectShopCartState,
  state => state.shopCartCards.error,
);

export const isShopCartUse = createSelector(
  selectShopCartState,
  state => state.isShopCartUsing,
);
