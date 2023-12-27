import {createReducer} from "@reduxjs/toolkit";
import {
  EditingUserExtraInfoResult,
  UserAuthorisation,
  UserRegistrationValidation,
  userRegistration,
} from "typings/auths";
import {Prettify} from "typings/generalTypes";
import {
  UserRegistrationFx,
  editUserExtraInfoFx,
  fetchUserInfo,
  getAuthTokenFx,
} from "./async-actions";
import {getUserAuth, resetRegRequest, resetUserRequest} from "./actions";

export interface AuthInitialState {
  userInfo: {
    data: Prettify<UserAuthorisation> | null;
    isLoading: boolean;
    error: null | string;
  };
  authorization: {
    isLoading: boolean;
    error: null | string;
  };
  registrationReq: {
    data: userRegistration | UserRegistrationValidation[] | null;
    isLoading: boolean;
    error: null | string;
  };
  isUserAuth: boolean;
  editingUserExtraInfo: {
    data: EditingUserExtraInfoResult | null;
    isLoading: boolean;
    error: null | string;
  };
}
const authInitialState: AuthInitialState = {
  isUserAuth: false,
  authorization: {
    isLoading: false,
    error: null,
  },
  userInfo: {
    data: null,
    isLoading: false,
    error: null,
  },
  registrationReq: {
    data: null,
    isLoading: false,
    error: null,
  },
  editingUserExtraInfo: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const authReducer = createReducer<AuthInitialState>(
  authInitialState,
  builder => {
    builder.addCase(resetUserRequest, state => {
      state.userInfo.data = null;
    });
    builder.addCase(resetRegRequest, state => {
      state.registrationReq.data = null;
    });
    builder.addCase(getUserAuth, (state, action) => {
      state.isUserAuth = action.payload;
    });

    builder.addCase(getAuthTokenFx.fulfilled, (state, {payload}) => {
      if (!payload?.success) {
        state.authorization.error = payload?.message;
        state.authorization.isLoading = false;
        return;
      }
      state.authorization.isLoading = false;
    });
    builder.addCase(getAuthTokenFx.pending, state => {
      state.authorization.isLoading = true;
      state.authorization.error = null;
    });
    builder.addCase(getAuthTokenFx.rejected, state => {
      state.authorization.error = "Error with auth";
      state.authorization.isLoading = false;
    });

    builder.addCase(UserRegistrationFx.fulfilled, (state, {payload}) => {
      if (!payload?.success) {
        state.userInfo.data = null;
        state.registrationReq.error = payload.message;
        state.registrationReq.isLoading = false;
        return;
      }
      state.registrationReq.data = payload;
      state.registrationReq.isLoading = false;
    });
    builder.addCase(UserRegistrationFx.pending, state => {
      state.registrationReq.isLoading = true;
      state.registrationReq.error = null;
    });
    builder.addCase(UserRegistrationFx.rejected, state => {
      state.registrationReq.error = "Error with registration";
      state.registrationReq.isLoading = false;
    });

    builder.addCase(fetchUserInfo.fulfilled, (state, {payload}) => {
      state.userInfo.data = payload;
      state.userInfo.isLoading = false;
    });
    builder.addCase(fetchUserInfo.pending, state => {
      state.userInfo.isLoading = true;
      state.userInfo.error = null;
    });
    builder.addCase(fetchUserInfo.rejected, state => {
      state.userInfo.error = "Error with access";
      state.userInfo.isLoading = false;
    });

    builder.addCase(editUserExtraInfoFx.fulfilled, (state, {payload}) => {
      if (!payload?.success) {
        state.editingUserExtraInfo.data = null;
        state.editingUserExtraInfo.error = payload?.message;
        state.editingUserExtraInfo.isLoading = false;
        return;
      }
      state.editingUserExtraInfo.data = payload;
      state.userInfo.data = {...state.userInfo.data, ...payload};
      state.editingUserExtraInfo.isLoading = false;
    });
    builder.addCase(editUserExtraInfoFx.pending, state => {
      state.editingUserExtraInfo.isLoading = true;
      state.editingUserExtraInfo.error = null;
    });
    builder.addCase(editUserExtraInfoFx.rejected, state => {
      state.editingUserExtraInfo.error = "Error with edit";
      state.editingUserExtraInfo.isLoading = false;
    });
  },
);
