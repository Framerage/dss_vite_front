import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelector";

const selectAppState = createSelector(selectRoot, root => root.appReducer);
export const selectIsMobile = createSelector(
  selectAppState,
  state => state.isMobile,
);
export const selectIsTablet = createSelector(
  selectAppState,
  state => state.isTablet,
);
export const selectIsLowDesktop = createSelector(
  selectAppState,
  state => state.isLowDesktop,
);
export const selectIsDesktop = createSelector(
  selectAppState,
  state => state.isDesktop,
);
