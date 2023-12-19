import React, {useCallback, useEffect, useState} from "react";
import CatalogCard from "components/catalogCard/CatalogCard";
import PointLoader from "components/pointLoader/PointLoader";
import AppSearcher from "components/appSearcher/AppSearcher";
import CatalogFilter from "components/catalogFilter";

import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";
import {CatalogCardNesting} from "typings/catalogCards";

import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {
  catalogCardsData,
  catalogCardsError,
  catalogCardsIsLoading,
  choosedCatalogFilter,
} from "store/modules/catalog/selectors";
import {
  editCatalogCardFx,
  getCatalogCardsFx,
} from "store/modules/catalog/async-actions";
import {
  currentCatalogFilter,
  saveCatalogStatus,
} from "store/modules/catalog/actions";
import {selectUserData} from "store/modules/auth/selectors";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";

import {useFiltredObj} from "hooks/useFilteredObj";
import {useFiltredCards} from "hooks/catalog/useFiltredCards";
import Cookies from "js-cookie";
import classes from "./catalog.module.css";

const catalogFilterItems = [
  {title: "Все", link: ""},
  {title: "Неоновый декор", link: "neon"},
  {title: "Резка по дереву", link: "plywood"},
  {title: "Лазерная гравировка", link: "laserEngr"},
  {title: "Фурнитура/мебель", link: "furniture"},
  {title: "3D-принтер", link: "volPrinter"},
  {title: "Рельефные картины", link: "reliefPics"},
];
const Catalog: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();

  const userInfo = useSelector(selectUserData);

  const accS = Cookies.get("perAcTkn") ?? "";
  const cards = useSelector(catalogCardsData);
  const cardsIsLoading = useSelector(catalogCardsIsLoading);
  const cardsError = useSelector(catalogCardsError);

  const choosedFilter = useSelector(choosedCatalogFilter);

  const [searchValue, setSearchValue] = useState("");

  const filtredCards = useFiltredObj<CatalogCardNesting>(
    cards,
    "theme",
    choosedFilter,
  );
  const filtredCardsBySearch = useFiltredCards(filtredCards, searchValue);

  useEffect(() => {
    dispatch(saveCatalogStatus(true));
    dispatch(getCatalogCardsFx());
    return () => {
      dispatch(saveCatalogStatus(false));
    };
  }, []);

  const onSetSearchValue = useCallback((value: string) => {
    if (value) {
      dispatch(currentCatalogFilter(""));
    }
    setSearchValue(value);
  }, []);

  const onGetCurrentFilter = useCallback(
    (theme: string) => dispatch(currentCatalogFilter(theme)),
    [],
  );

  const addCardToShopCart = useCallback(
    (cardId: string) => {
      if (!userInfo || (userInfo && !userInfo.success) || !accS) {
        return;
      }
      if (!userInfo.userCart.length) {
        dispatch(
          editUserExtraInfoFx({
            user: {...userInfo, userCart: [cardId]},
            auth: accS,
          }),
        );
        return;
      }
      if (userInfo.userCart.includes(cardId)) {
        const filteredCart = userInfo.userCart.filter(el => el !== cardId);
        dispatch(
          editUserExtraInfoFx({
            user: {...userInfo, userCart: filteredCart},
            auth: accS,
          }),
        );
        return;
      }
      dispatch(
        editUserExtraInfoFx({
          user: {...userInfo, userCart: [...userInfo.userCart, cardId]},
          auth: accS,
        }),
      );
    },
    [userInfo, accS],
  );

  const onSendLike = useCallback(
    (
      catalogCard: CatalogCardNesting,
      isCardLiked: boolean,
      cardLikes: number,
    ) => {
      catalogCard &&
        dispatch(
          editCatalogCardFx({
            ...catalogCard,
            likes: isCardLiked ? cardLikes - 1 : cardLikes + 1,
          }),
        );
      if (userInfo && userInfo.success && accS && catalogCard) {
        dispatch(
          editUserExtraInfoFx({
            user: {
              ...userInfo,
              userLikes: isCardLiked
                ? userInfo.userLikes.filter(el => el !== catalogCard._id)
                : [...userInfo.userLikes, catalogCard._id],
            },
            auth: accS,
          }),
        );
      }
    },
    [userInfo, accS],
  );
  return (
    <div className={classes.catalogContainer}>
      <CatalogFilter
        filterItems={catalogFilterItems}
        onChooseFilter={onGetCurrentFilter}
      />
      <div className={classes.catalogContent}>
        <div className={classes.extraFunctional}>
          <AppSearcher onCreateSearchValue={onSetSearchValue} />
          {userInfo && userInfo.success && userInfo.role === "admin" && (
            <Link
              to={APP_AUTH_ROUTES.creatingCard.link}
              className={classes.createBtn}
            >
              &#43;&nbsp;Добавить карту
            </Link>
          )}
        </div>
        <div className={classes.catalogCards}>
          {!cardsIsLoading ? (
            filtredCardsBySearch && filtredCardsBySearch.length ? (
              filtredCardsBySearch.map(card => (
                <CatalogCard
                  key={card._id}
                  card={card}
                  isCardAdded={
                    userInfo && userInfo.userCart?.length > 0
                      ? userInfo.userCart.includes(card._id)
                      : false
                  }
                  onAddCardToCart={addCardToShopCart}
                  isAuthDone={!!(userInfo && userInfo.success)}
                  isUserLikedCard={Boolean(
                    userInfo &&
                      userInfo.success &&
                      userInfo.userLikes.includes(card._id),
                  )}
                  onLikeCard={onSendLike}
                />
              ))
            ) : (
              <div className={classes.warnText}>
                {cardsError ? "Ошибка получения данных" : "Пусто"}
              </div>
            )
          ) : (
            <PointLoader scale={0.2} />
          )}
        </div>
      </div>
    </div>
  );
});
export default Catalog;
