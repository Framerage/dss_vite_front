import {createAction} from "@reduxjs/toolkit";

export const getUserAuth = createAction<boolean>("IsUserAuth");
export const resetUserRequest = createAction("ResetAuthRequest");
export const resetRegRequest = createAction("ResetRegRequest");
