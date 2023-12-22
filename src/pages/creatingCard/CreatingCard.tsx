import React, {useCallback, useEffect, useMemo, useState} from "react";
import {CatalogCardNesting, CardThemes} from "typings/catalogCards";
import {useForm} from "react-hook-form";
// import {generateFileData, setBase64Image} from "helpers/appHelpers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "store";
import {createNewCatalogCardFx} from "store/modules/catalog/async-actions";
import {
  creatingCardData,
  creatingCardsIsLoading,
  creatingCardError,
} from "store/modules/catalog/selectors";
import {resetCreatingCardResult} from "store/modules/catalog/actions";

import Cookies from "js-cookie";
import cn from "classnames";
import ImageAdder from "components/imageAdder";
import classes from "./creatingCard.module.css";

const CreatingCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const creatingResult = useSelector(creatingCardData);
  const creatingResultIsLoading = useSelector(creatingCardsIsLoading);
  const creatingResultError = useSelector(creatingCardError);

  const creatingStatus =
    creatingResult && creatingResult.success ? creatingResult.success : false;
  const [fullDescripValue, setFullDescripValue] = useState("");

  const [cardImagesUrls, setCardImagesUrls] = useState<
    {fileBody: string; fileName: string; id: number}[]
  >([]);

  const memoImages = useMemo(() => {
    return cardImagesUrls;
  }, [cardImagesUrls]);

  const changeImages = useCallback(
    (images: {fileBody: string; fileName: string; id: number}[]) => {
      setCardImagesUrls(images);
    },
    [],
  );
  const {handleSubmit, register, setValue} = useForm<CatalogCardNesting>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const themes = Object.keys(CardThemes);
  const accS = Cookies.get("perAcTkn") || "";

  const onCreateCard = useCallback(
    (data: CatalogCardNesting) => {
      if (!accS) {
        return;
      }
      const images = memoImages.map(file => file.fileBody);
      const card = {
        ...data,
        price: Number(data.price),
        fullDescrip: fullDescripValue,
        imgUrl: images,
      };
      dispatch(createNewCatalogCardFx({card, auth: accS || ""}));
    },
    [memoImages, fullDescripValue],
  );

  useEffect(() => {
    if (!creatingResult) {
      return;
    }
    if (creatingResult.success) {
      setValue("title", "");
      setValue("theme", "");
      setValue("descrip", "");
      setValue("price", 0);
      setValue("imgUrl", []);
      setCardImagesUrls([]);
      setFullDescripValue("");
    }
  }, [creatingResult]);

  useEffect(() => {
    if (!creatingStatus) {
      return;
    }
    setTimeout(() => dispatch(resetCreatingCardResult()), 3000);
  }, [creatingStatus]);
  return (
    <div className={classes.cardCreatingContainer}>
      <div className={classes.firstSection}>
        <div className={classes.firstSectPreview}>
          <ImageAdder images={memoImages} changeImages={changeImages} />
        </div>
        <div className={classes.firstSectBotmBlock}>
          Full descrip:&nbsp;
          <textarea
            className={classes.firstSectArea}
            value={fullDescripValue}
            onChange={e => setFullDescripValue(e.target.value)}
          />
        </div>
      </div>
      <form
        className={classes.secondSection}
        onSubmit={handleSubmit(onCreateCard)}
      >
        <div className={classes.secondSectItem}>
          Title:&nbsp;
          <input
            type="text"
            className={classes.secondSectInput}
            {...register("title")}
            name="title"
            required
          />
        </div>
        <div className={classes.secondSectItem}>
          Theme:&nbsp;
          <select
            className={classes.secondSectInput}
            {...register("theme")}
            name="theme"
          >
            {themes.map(theme => (
              <option
                key={theme}
                value={theme}
                className={classes.selectOption}
              >
                {theme}
              </option>
            ))}
          </select>
        </div>
        <div className={cn(classes.secondSectItem)}>
          Description:&nbsp;
          <textarea
            className={cn(classes.secondSectArea, classes.secondSectInput)}
            {...register("descrip")}
            name="descrip"
            required
          />
        </div>
        <div className={classes.secondSectItem}>
          Price:&nbsp;
          <input
            type="number"
            className={classes.secondSectInput}
            {...register("price")}
            name="price"
            required
          />
        </div>
        <div className={classes.secondSectItem}>
          <button className={classes.submitBtn}>
            {creatingResultIsLoading ? "Loading..." : "Create card"}
          </button>
        </div>
        <div className={classes.errorReqText}>{creatingResultError}</div>
        {creatingStatus && (
          <div className={cn(classes.errorReqText, classes.successReqText)}>
            Success
          </div>
        )}
      </form>
    </div>
  );
};
export default CreatingCard;
