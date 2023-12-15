import {createAction} from "@reduxjs/toolkit";

export const currentCatalogFilter = createAction<string>(
  "CurrentCatalogFilter",
);
export const resetCreatingCardResult = createAction("ResetCreatingCardResult");
export const resetCardRemovingResult = createAction("ResetCardRemovingResult");
export const saveCatalogStatus = createAction<boolean>("SaveCatalogStatus");
