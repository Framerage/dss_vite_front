import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  editUserExtraInfo,
  getAccountInfo,
  getAuthToken,
  userRegistration,
} from "api/auths";

export const getAuthTokenFx = createAsyncThunk("getToken", getAuthToken);
export const UserRegistrationFx = createAsyncThunk("userReg", userRegistration);
export const editUserExtraInfoFx = createAsyncThunk(
  "editUser",
  editUserExtraInfo,
);
export const fetchUserInfo = createAsyncThunk("fetchUser", getAccountInfo);
