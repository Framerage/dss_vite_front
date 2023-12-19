import {createReducer} from "@reduxjs/toolkit";
import {setPopupImage, resetPopupImage, setImgCoord} from "./actions";

interface PopupState {
  popupImage: string;
  imgCoord: number;
}
const popupInitialState = {
  popupImage: "",
  imgCoord: 0,
};
export const popupReducer = createReducer<PopupState>(
  popupInitialState,
  builder => {
    builder.addCase(setImgCoord, (state, {payload}) => {
      state.imgCoord = payload;
    });
    builder.addCase(setPopupImage, (state, {payload}) => {
      state.popupImage = payload;
    });
    builder.addCase(resetPopupImage, state => {
      state.popupImage = "";
    });
  },
);
