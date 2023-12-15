import {createReducer} from "@reduxjs/toolkit";
import {CatalogCardNesting, CreatingCatalogCard} from "typings/catalogCards";
import {Prettify} from "typings/generalTypes";
import {
  createNewCatalogCardFx,
  editCatalogCardFx,
  getCardFullDescripFx,
  getCatalogCardsFx,
  removeCardFromCatalog,
} from "./async-actions";
import {
  currentCatalogFilter,
  resetCardRemovingResult,
  resetCreatingCardResult,
  saveCatalogStatus,
} from "./actions";

export interface CatalogInitialState {
  isCatalogOpen: boolean;
  catalogCards: {
    data: Prettify<CatalogCardNesting>[] | null;
    isLoading: boolean;
    error: null | string;
  };
  catalogCardDescrip: {
    data: Prettify<CatalogCardNesting> | null;
    isLoading: boolean;
    error: null | string;
  };
  cardCreating: {
    data: Prettify<CreatingCatalogCard> | null;
    isLoading: boolean;
    error: null | string;
  };
  catalogFilter: string;
  cardRemoveRequest: {
    data: {success: boolean; message: string; error: string} | null;
    isLoading: boolean;
    error: null | string;
  };
}
const catalogInitialState: CatalogInitialState = {
  isCatalogOpen: false,
  catalogCards: {
    data: null,
    isLoading: false,
    error: null,
  },
  catalogCardDescrip: {
    data: null,
    isLoading: false,
    error: null,
  },
  catalogFilter: "",
  cardCreating: {
    data: null,
    isLoading: false,
    error: null,
  },
  cardRemoveRequest: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const catalogReducer = createReducer<CatalogInitialState>(
  catalogInitialState,
  builder => {
    builder.addCase(saveCatalogStatus, (state, {payload}) => {
      state.isCatalogOpen = payload;
    });
    builder.addCase(currentCatalogFilter, (state, {payload}) => {
      state.catalogFilter = payload;
    });
    builder.addCase(resetCreatingCardResult, state => {
      state.cardCreating.data = null;
    });
    builder.addCase(resetCardRemovingResult, state => {
      state.cardRemoveRequest.data = null;
    });

    builder.addCase(editCatalogCardFx.fulfilled, (state, {payload}) => {
      if (payload?.error) {
        state.catalogCardDescrip.data = null;
        state.catalogCardDescrip.error = payload.message;
        state.catalogCardDescrip.isLoading = false;
        return;
      }
      state.catalogCardDescrip.data = payload;
      state.catalogCardDescrip.isLoading = false;
    });
    builder.addCase(editCatalogCardFx.pending, state => {
      state.catalogCardDescrip.isLoading = true;
      state.catalogCardDescrip.error = null;
    });
    builder.addCase(editCatalogCardFx.rejected, state => {
      state.catalogCardDescrip.data = null;
      state.catalogCardDescrip.error = "Error with getting card";
      state.catalogCardDescrip.isLoading = false;
    });

    builder.addCase(removeCardFromCatalog.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.cardRemoveRequest.error = action.payload.message;
        state.cardRemoveRequest.isLoading = false;
        return;
      }
      state.cardRemoveRequest.data = action.payload;
      state.cardRemoveRequest.isLoading = false;
    });

    builder.addCase(removeCardFromCatalog.pending, state => {
      state.cardRemoveRequest.isLoading = true;
      state.cardRemoveRequest.error = null;
    });
    builder.addCase(removeCardFromCatalog.rejected, state => {
      state.cardRemoveRequest.error = "Error with dekete card";
      state.cardRemoveRequest.isLoading = false;
    });

    builder.addCase(getCardFullDescripFx.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.catalogCardDescrip.data = null;
        state.catalogCardDescrip.error = action.payload.message;
        state.catalogCardDescrip.isLoading = false;
        return;
      }
      state.catalogCardDescrip.data = action.payload;
      state.catalogCardDescrip.isLoading = false;
    });
    builder.addCase(getCardFullDescripFx.pending, state => {
      state.catalogCardDescrip.isLoading = true;
      state.catalogCardDescrip.error = null;
    });
    builder.addCase(getCardFullDescripFx.rejected, state => {
      state.catalogCardDescrip.data = null;
      state.catalogCardDescrip.error = "Error with getting card";
      state.catalogCardDescrip.isLoading = false;
    });

    builder.addCase(createNewCatalogCardFx.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.cardCreating.error = action.payload.message;
        state.cardCreating.isLoading = false;
        return;
      }
      state.cardCreating.data = action.payload;
      state.cardCreating.isLoading = false;
    });
    builder.addCase(createNewCatalogCardFx.pending, state => {
      state.cardCreating.isLoading = true;
      state.cardCreating.error = null;
    });
    builder.addCase(createNewCatalogCardFx.rejected, state => {
      state.cardCreating.error = "Error with creating";
      state.cardCreating.isLoading = false;
    });

    builder.addCase(getCatalogCardsFx.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.catalogCards.error = action.payload.error;
        state.catalogCards.isLoading = false;
        return;
      }
      state.catalogCards.data = action.payload;
      state.catalogCards.isLoading = false;
    });
    builder.addCase(getCatalogCardsFx.pending, state => {
      state.catalogCards.isLoading = true;
      state.catalogCards.error = null;
    });
    builder.addCase(getCatalogCardsFx.rejected, state => {
      state.catalogCards.error = "Error with data";
      state.catalogCards.isLoading = false;
    });
  },
);
