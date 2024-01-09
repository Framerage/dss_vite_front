import {createReducer} from "@reduxjs/toolkit";
import {Orders, OrderRequestResult} from "typings/orders";
import {Prettify} from "typings/generalTypes";
import {
  fetchAllOrders,
  fetchToCreateOrderRequest,
  fetchUserOrders,
} from "./async-actions";
import {
  chooseOrdersSortCondition,
  chooseOrderKeyForSort,
  resetOrderCreatingResult,
} from "./actions";

interface OrderRequestsState {
  orderSortCondition: boolean;
  orderKeyForSort: string;
  orderCreating: {
    data: Prettify<OrderRequestResult> | null;
    isLoading: boolean;
    error: string | null;
  };
  allOrders: {
    data: Orders | null;
    isLoading: boolean;
    error: string | null;
  };
}
type ErrorPayload = any;
const initialOrderState = {
  orderSortCondition: true,
  orderKeyForSort: "createdAt",
  orderCreating: {
    data: null,
    isLoading: false,
    error: null,
  },
  allOrders: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const orderReducer = createReducer<OrderRequestsState>(
  initialOrderState,
  builder => {
    builder.addCase(resetOrderCreatingResult, state => {
      state.orderCreating.data = null;
      state.orderCreating.error = null;
    });
    builder.addCase(chooseOrdersSortCondition, (state, {payload}) => {
      state.orderSortCondition = payload;
    });
    builder.addCase(chooseOrderKeyForSort, (state, {payload}) => {
      state.orderKeyForSort = payload;
    });
    builder.addCase(fetchToCreateOrderRequest.fulfilled, (state, {payload}) => {
      state.orderCreating.data = payload;
      state.orderCreating.isLoading = false;
      state.orderCreating.error =
        payload?.status === 500
          ? "Please, try again laiter. Server is not responding"
          : null;
    });
    builder.addCase(fetchToCreateOrderRequest.pending, state => {
      state.orderCreating.isLoading = true;
      state.orderCreating.error = null;
    });
    builder.addCase(
      fetchToCreateOrderRequest.rejected,
      (state, {payload}: {payload: ErrorPayload}) => {
        if (!payload) {
          state.orderCreating.isLoading = false;
          state.orderCreating.error = "Ошибка с сервером";
          return;
        }
        state.orderCreating.data = payload;
        state.orderCreating.isLoading = false;
        state.orderCreating.error = payload?.message || "Error with order";
      },
    );
    builder.addCase(fetchAllOrders.fulfilled, (state, {payload}) => {
      state.allOrders.data = payload;
      state.allOrders.isLoading = false;
      state.allOrders.error =
        payload?.status === 500
          ? "Please, try again laiter. Server is not responding"
          : null;
    });
    builder.addCase(fetchAllOrders.pending, state => {
      state.allOrders.isLoading = true;
      state.allOrders.error = null;
    });
    builder.addCase(
      fetchAllOrders.rejected,
      (state, {payload}: {payload: ErrorPayload}) => {
        state.allOrders.data = payload;
        state.allOrders.isLoading = false;
        state.allOrders.error = payload?.message || "Error with getting orders";
      },
    );

    builder.addCase(fetchUserOrders.fulfilled, (state, {payload}) => {
      state.allOrders.data = payload;
      state.allOrders.isLoading = false;
      state.allOrders.error =
        payload?.status === 500
          ? "Please, try again laiter. Server is not responding"
          : null;
    });
    builder.addCase(fetchUserOrders.pending, state => {
      state.allOrders.isLoading = true;
      state.allOrders.error = null;
    });
    builder.addCase(
      fetchUserOrders.rejected,
      (state, {payload}: {payload: ErrorPayload}) => {
        state.allOrders.data = payload;
        state.allOrders.isLoading = false;
        state.allOrders.error = payload?.message || "Error with getting orders";
      },
    );
  },
);
