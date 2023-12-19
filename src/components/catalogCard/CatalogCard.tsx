import React, {useState} from "react";
import {Link} from "react-router-dom";
import {APP_AUTH_ROUTES} from "utils/routes";
import {CatalogCardNesting} from "typings/catalogCards";
import ImageSlider from "components/imageSlider/ImageSlider";
import PlusIcon from "assets/icons/btn-plus.svg";
import AddedIcon from "assets/icons/btn-checked.svg";
import Unliked from "assets/icons/heart.svg";
import Liked from "assets/icons/fillHeart.svg";
import {translateCardTheme} from "helpers/catalog-helpers/translateCardTheme";
import classes from "./catalogCard.module.css";

interface CardProps {
  card?: CatalogCardNesting;
  isCardAdded: boolean;
  isAuthDone: boolean;
  onAddCardToCart: (cardId: string) => void;
  isUserLikedCard: boolean;
  onLikeCard: (
    card: CatalogCardNesting,
    isCardLiked: boolean,
    cardLikes: number,
  ) => void;
}
const CatalogCard: React.FC<CardProps> = React.memo(
  ({
    card,
    isCardAdded,
    onAddCardToCart,
    isAuthDone,
    isUserLikedCard,
    onLikeCard,
  }) => {
    const [isCardLiked, setIsCardLiked] = useState(isUserLikedCard);
    const [cardLikes, setCardlikes] = useState(
      card && card.likes ? card.likes : 0,
    );
    const cardImages = card && card.imgUrl.length > 0 ? card.imgUrl : [];

    const onAddToPackage = (
      e: React.MouseEvent<HTMLElement>,
      card: CatalogCardNesting,
    ) => {
      e.stopPropagation();
      onAddCardToCart(card._id);
    };
    const onClickLike = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (isCardLiked) {
        if (cardLikes === 0) {
          return;
        }
        setIsCardLiked(!isCardLiked);
        setCardlikes(cardLikes - 1);
        card && onLikeCard(card, true, card.likes || 0);
        return;
      }
      setIsCardLiked(!isCardLiked);
      setCardlikes(cardLikes + 1);
      card && onLikeCard(card, false, card.likes || 0);
    };
    return (
      <div className={classes.cardContainer}>
        <div className={classes.cardPreview}>
          <ImageSlider images={cardImages} />
          <div className={classes.extraCardInfo}>
            <div className={classes.extraInfoText}>
              Просмотров:&nbsp;{card && card.viewsCount ? card.viewsCount : 0}
            </div>
            <div className={classes.extraInfoText}>
              Лайки:&nbsp;{cardLikes}
              <img
                src={isCardLiked ? Liked : Unliked}
                alt="like"
                width={25}
                height={25}
                onClick={onClickLike}
                className={classes.cardLike}
              />
            </div>
          </div>
        </div>
        <div className={classes.cardInfo}>
          <Link
            to={`${APP_AUTH_ROUTES.catalog.link}/${card?._id}`}
            className={classes.infoCardTitle}
          >
            {card?.title}
          </Link>
          <div className={classes.infoCardTheme}>
            Тематика:&nbsp;
            <br />
            {translateCardTheme(card?.theme || "")}
          </div>
          <div className={classes.infoCardDescrip}>
            Описание:&nbsp;
            <br />
            <span className={classes.descripText}>{card?.descrip || ""}</span>
          </div>
          <div>Цена:&nbsp;{card?.price || 0}&nbsp;руб</div>
          {isAuthDone && (
            <div className={classes.addBtnContainer}>
              <img
                src={isCardAdded ? AddedIcon : PlusIcon}
                alt="addBtn"
                className={classes.addBtn}
                onClick={e => card && onAddToPackage(e, card)}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);
export default CatalogCard;
