import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelector";

const selectAuthState = createSelector(selectRoot, root => root.authReducer);
export const isUserAuth = createSelector(
  selectAuthState,
  state => state.isUserAuth,
);

export const selectAuthIsLoading = createSelector(
  selectAuthState,
  state => state.authorization.isLoading,
);
export const selectAuthError = createSelector(
  selectAuthState,
  state => state.authorization.error,
);

export const selectUserData = createSelector(
  selectAuthState,
  state => state.userInfo.data,
);
export const selectUserIsLoading = createSelector(
  selectAuthState,
  state => state.userInfo.isLoading,
);
export const selectUserError = createSelector(
  selectAuthState,
  state => state.userInfo.error,
);

export const selectRegistrData = createSelector(
  selectAuthState,
  state => state.registrationReq.data,
);
export const selectRegistrIsLoading = createSelector(
  selectAuthState,
  state => state.registrationReq.isLoading,
);
export const selectRegistrError = createSelector(
  selectAuthState,
  state => state.registrationReq.error,
);

export const selectEditUserExtraInfoResult = createSelector(
  selectAuthState,
  state => state.editingUserExtraInfo.data,
);
export const selectEditUserExtraInfoResultIsLoading = createSelector(
  selectAuthState,
  state => state.editingUserExtraInfo.isLoading,
);
export const selectEditUserExtraInfoResultError = createSelector(
  selectAuthState,
  state => state.editingUserExtraInfo.error,
);
