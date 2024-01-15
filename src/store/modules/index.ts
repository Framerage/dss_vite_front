import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./auth";
import {catalogReducer} from "./catalog";
import {shopCartReducer} from "./cart";
import {popupReducer} from "./popup";
import {orderReducer} from "./order";
import {appReducer} from "./app";

export const rootReducer = combineReducers({
  authReducer,
  catalogReducer,
  shopCartReducer,
  popupReducer,
  orderReducer,
  appReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
