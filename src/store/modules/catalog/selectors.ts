import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelector";

const selectCatalogState = createSelector(
  selectRoot,
  root => root.catalogReducer,
);
export const choosedCatalogFilter = createSelector(
  selectCatalogState,
  state => state.catalogFilter,
);

export const selectCatalogStatus = createSelector(
  selectCatalogState,
  state => state.isCatalogOpen,
);
export const catalogCardsData = createSelector(
  selectCatalogState,
  state => state.catalogCards.data,
);
export const catalogCardsIsLoading = createSelector(
  selectCatalogState,
  state => state.catalogCards.isLoading,
);
export const catalogCardsError = createSelector(
  selectCatalogState,
  state => state.catalogCards.error,
);

export const catalogCardDescrip = createSelector(
  selectCatalogState,
  state => state.catalogCardDescrip.data,
);
export const catalogCardDescripIsLoading = createSelector(
  selectCatalogState,
  state => state.catalogCardDescrip.isLoading,
);
export const catalogCardDescripError = createSelector(
  selectCatalogState,
  state => state.catalogCardDescrip.error,
);

export const creatingCardData = createSelector(
  selectCatalogState,
  state => state.cardCreating.data,
);
export const creatingCardsIsLoading = createSelector(
  selectCatalogState,
  state => state.cardCreating.isLoading,
);
export const creatingCardError = createSelector(
  selectCatalogState,
  state => state.cardCreating.error,
);

export const selectCardDeleteRequest = createSelector(
  selectCatalogState,
  state => state.cardRemoveRequest.data,
);
export const selectCardDeleteRequestIsLoading = createSelector(
  selectCatalogState,
  state => state.cardRemoveRequest.isLoading,
);
export const selectCardDeleteRequestError = createSelector(
  selectCatalogState,
  state => state.cardRemoveRequest.error,
);
