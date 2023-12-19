import {createAction} from "@reduxjs/toolkit";

export const setPopupImage = createAction<string>("setPopupImage");
export const setImgCoord = createAction<number>("setImgCoord");
export const resetPopupImage = createAction("resetPopupImage");
