import {createReducer} from "@reduxjs/toolkit";
import {
  setIsDesktop,
  setIsLowDesktop,
  setIsMobile,
  setIsTablet,
} from "./actions";

interface InitialAppStateData {
  isMobile: boolean;
  isTablet: boolean;
  isLowDesktop: boolean;
  isDesktop: boolean;
}
const initialAppState = {
  isMobile: false,
  isTablet: false,
  isLowDesktop: false,
  isDesktop: false,
};

export const appReducer = createReducer<InitialAppStateData>(
  initialAppState,
  builder => {
    builder.addCase(setIsMobile, (state, {payload}) => {
      state.isMobile = payload;
    });
    builder.addCase(setIsTablet, (state, {payload}) => {
      state.isTablet = payload;
    });
    builder.addCase(setIsLowDesktop, (state, {payload}) => {
      state.isLowDesktop = payload;
    });
    builder.addCase(setIsDesktop, (state, {payload}) => {
      state.isDesktop = payload;
    });
  },
);
