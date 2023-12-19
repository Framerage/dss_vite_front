import {createAction} from "@reduxjs/toolkit";

export const isShoppingCartUse = createAction<boolean>("UseShoppingCart");
export const resetUserShopCart = createAction("resetUserShop");
export const updateCardCountOfCart = createAction<{
  cardId: string;
  count: number;
}>("UpdateCardCountOfCart");
