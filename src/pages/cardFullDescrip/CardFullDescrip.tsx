import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Unliked from "assets/icons/heart.svg";
import Liked from "assets/icons/fillHeart.svg";
import DeleteIcon from "assets/icons/btn-remove.svg";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import PointLoader from "components/pointLoader/PointLoader";
import ImageSlider from "components/imageSlider/ImageSlider";

import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {
  catalogCardDescrip,
  catalogCardDescripError,
  catalogCardDescripIsLoading,
  selectCardDeleteRequest,
  selectCardDeleteRequestError,
  selectCardDeleteRequestIsLoading,
} from "store/modules/catalog/selectors";
import {
  editCatalogCardFx,
  getCardFullDescripFx,
  removeCardFromCatalog,
} from "store/modules/catalog/async-actions";
import {selectUserData} from "store/modules/auth/selectors";
import {editUserExtraInfoFx} from "store/modules/auth/async-actions";
import {resetCardRemovingResult} from "store/modules/catalog/actions";

import Cookies from "js-cookie";
import cn from "classnames";
import {translateCardTheme} from "helpers/catalog-helpers/translateCardTheme";
import classes from "./cardFullDescrip.module.css";

const CardFullDescrip: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathParam = useParams<{id: string}>();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserData);

  const cardDescrip = useSelector(catalogCardDescrip);
  const cardDescripIsLoading = useSelector(catalogCardDescripIsLoading);
  const cardDescripError = useSelector(catalogCardDescripError);

  const removeRequest = useSelector(selectCardDeleteRequest);
  const removeRequestIsLoading = useSelector(selectCardDeleteRequestIsLoading);
  const removeRequestError = useSelector(selectCardDeleteRequestError);

  const accS = Cookies.get("perAcTkn");

  const [isCardLiked, setIsCardLiked] = useState(
    Boolean(
      userInfo && cardDescrip && userInfo.userLikes.includes(cardDescrip._id),
    ),
  );
  const [cardLikes, setCardLikes] = useState(
    cardDescrip && cardDescrip.likes ? cardDescrip.likes : 0,
  );

  useEffect(() => {
    if (pathParam.id && cardDescrip) {
      if (cardDescrip._id === pathParam.id) {
        setIsCardLiked(
          Boolean(
            userInfo &&
              cardDescrip &&
              userInfo.userLikes.includes(cardDescrip._id),
          ),
        );
        setCardLikes(cardDescrip.likes || 0);
        return;
      }
      dispatch(getCardFullDescripFx(pathParam.id));
      return;
    }
    pathParam.id && dispatch(getCardFullDescripFx(pathParam.id));
  }, [cardDescrip, userInfo, pathParam]);

  useEffect(() => {
    if (removeRequest && removeRequest.success) {
      dispatch(resetCardRemovingResult());
      navigate(
        accS ? APP_AUTH_ROUTES.catalog.link : APP_GENERAL_ROUTES.catalog.link,
      );
    }
  }, [removeRequest]);

  const onSendLike = () => {
    cardDescrip &&
      dispatch(
        editCatalogCardFx({
          ...cardDescrip,
          likes: isCardLiked ? cardLikes - 1 : cardLikes + 1,
        }),
      );
    if (userInfo && accS && cardDescrip) {
      dispatch(
        editUserExtraInfoFx({
          user: {
            ...userInfo,
            userLikes: isCardLiked
              ? userInfo.userLikes.filter(el => el !== cardDescrip._id)
              : [...userInfo.userLikes, cardDescrip._id],
          },
          auth: accS,
        }),
      );
    }
  };
  const onLikeCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsCardLiked(!isCardLiked);
    if (isCardLiked) {
      if (cardLikes === 0) {
        return;
      }
      setCardLikes(cardLikes - 1);
      onSendLike();
      return;
    }
    setCardLikes(cardLikes + 1);
    onSendLike();
  };

  const onDeleteCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const check = window.prompt("Are you sure want to delete? Enter pass");
    if (check === import.meta.env.VITE_ADM_PSS && cardDescrip && accS) {
      dispatch(removeCardFromCatalog({id: cardDescrip._id, auth: accS}));
      return;
    }
    window.alert("Удаление не удалось");
  };
  if (cardDescripIsLoading) {
    return <PointLoader scale={0.5} />;
  }
  return (
    <>
      {cardDescrip ? (
        <div className={classes.fullDescripContainer}>
          <div className={classes.cardContent}>
            <div className={classes.contentSlider}>
              <ImageSlider
                images={cardDescrip.imgUrl ? cardDescrip.imgUrl : []}
              />
            </div>
            <div className={classes.contentItems}>
              <div className={classes.contentItem}>
                {cardDescrip.title || "-"}
              </div>
              <div className={cn(classes.contentItem, classes.lowerSize)}>
                Тематика:&nbsp;
                {translateCardTheme(cardDescrip.theme || "some")}
              </div>
              <div className={cn(classes.contentItem, classes.lowerSize)}>
                Описание:&nbsp;{cardDescrip.descrip || "-"}
              </div>
            </div>
            {userInfo && accS && (
              <button
                onClick={e => onDeleteCard(e)}
                title="Delete card"
                className={classes.deleteBtn}
              >
                <img src={DeleteIcon} alt="delBtn" />
                {removeRequestIsLoading && "loading..."}
              </button>
            )}
          </div>
          <div className={classes.cardExtraContent}>
            <div className={classes.extraContItem}>
              Просмотров:&nbsp;{cardDescrip.viewsCount || 0}
            </div>
            <div className={classes.extraContItem}>
              Лайки:&nbsp;{cardLikes}
              <img
                src={isCardLiked ? Liked : Unliked}
                alt="like"
                width={25}
                height={25}
                onClick={onLikeCard}
                className={classes.cardLike}
              />
            </div>
            <div className={classes.extraContItem}>
              Цена:&nbsp;{cardDescrip.price || 0}&nbsp;руб
            </div>
          </div>
          <div className={classes.cardFullDescrip}>
            {cardDescrip.fullDescrip || "-"}
          </div>
          <div>
            {removeRequest &&
              !removeRequest.success &&
              removeRequestError &&
              removeRequestError}
          </div>
        </div>
      ) : (
        <div className={classes.errorInfo}>{cardDescripError || "Error"}</div>
      )}
    </>
  );
};
export default CardFullDescrip;
