import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelector";

const selectOrder = createSelector(selectRoot, root => root.orderReducer);

export const selectOrderSortCondition = createSelector(
  selectOrder,
  state => state.orderSortCondition,
);
export const selectOrderKeySort = createSelector(
  selectOrder,
  state => state.orderKeyForSort,
);
export const selectOrderCreating = createSelector(
  selectOrder,
  state => state.orderCreating.data,
);
export const selectOrderCreatingIsLoading = createSelector(
  selectOrder,
  state => state.orderCreating.isLoading,
);
export const selectOrderCreatingError = createSelector(
  selectOrder,
  state => state.orderCreating.error,
);

export const selectAllOrders = createSelector(
  selectOrder,
  state => state.allOrders.data,
);
export const selectAllOrdersIsLoading = createSelector(
  selectOrder,
  state => state.allOrders.isLoading,
);
export const selectAllOrdersError = createSelector(
  selectOrder,
  state => state.allOrders.error,
);
