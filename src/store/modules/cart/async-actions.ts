import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchUserShopCart} from "api/auths";

export const getUserShopCart = createAsyncThunk(
  "getUserShopCart",
  fetchUserShopCart,
);
