import {createAction} from "@reduxjs/toolkit";

export const setIsMobile = createAction<boolean>("setIsMobile");
export const setIsTablet = createAction<boolean>("setIsTablet");
export const setIsLowDesktop = createAction<boolean>("setIsLowDesktop");
export const setIsDesktop = createAction<boolean>("setIsDesktop");
