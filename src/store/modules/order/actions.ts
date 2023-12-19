import {createAction} from "@reduxjs/toolkit";

export const resetOrderCreatingResult = createAction("resetOrderResult");
export const chooseOrdersSortCondition = createAction<boolean>(
  "chooseOrdersSortCondition",
);
export const chooseOrderKeyForSort = createAction<string>(
  "chooseOrderKeyForSort",
);
