import React, {useCallback, useEffect, useState} from "react";
import {CatalogCardNesting, CardThemes} from "typings/catalogCards";
import {useForm} from "react-hook-form";
import {generateFileData, setBase64Image} from "helpers/appHelpers";
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
import classes from "./creatingCard.module.css";

const CreatingCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const creatingResult = useSelector(creatingCardData);
  const creatingResultIsLoading = useSelector(creatingCardsIsLoading);
  const creatingResultError = useSelector(creatingCardError);

  const creatingStatus =
    creatingResult && creatingResult.success ? creatingResult.success : false;
  const [fullDescripValue, setFullDescripValue] = useState("");
  const [choosedFileIndex, setChoosedFileIndex] = useState(0);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [cardImagesUrls, setCardImagesUrls] = useState<
    {fileBody: string; fileName: string; id: number}[]
  >([]);

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
      const images = cardImagesUrls.map(file => file.fileBody);
      const card = {
        ...data,
        price: Number(data.price),
        fullDescrip: fullDescripValue,
        imgUrl: images,
      };
      dispatch(createNewCatalogCardFx({card, auth: accS || ""}));
    },
    [cardImagesUrls, fullDescripValue],
  );

  const createImgString = async (fileList: FileList | null) => {
    setFileSizeError(false);
    if (!fileList) {
      return;
    }
    const body = fileList[0];
    if (body?.size > 1000000) {
      setFileSizeError(true);
      return;
    }
    const imgResult = await generateFileData({
      fileBody: body,
      fileName: body.name,
    });
    if (cardImagesUrls.some(file => file.fileName === imgResult.fileName)) {
      return;
    }
    setCardImagesUrls([
      ...cardImagesUrls.map((img, index) => {
        return {...img, id: index};
      }),
      {...imgResult, id: cardImagesUrls.length},
    ]);
  };

  const onRemoveFile = useCallback(
    (id: number) => {
      setCardImagesUrls(() => {
        const newFiles = cardImagesUrls.filter(file => file.id !== id);
        return newFiles.map((file, index) => {
          return {...file, id: index};
        });
      });
      if (choosedFileIndex) {
        setChoosedFileIndex(choosedFileIndex - 1);
      }
    },
    [cardImagesUrls],
  );

  const onChoosedFile = (id: number) => setChoosedFileIndex(id);

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
          <div className={classes.previewAddBlock}>
            <div className={classes.addBtns}>
              <label htmlFor="addImgUrl" className={classes.previewAddFile}>
                + Add image
              </label>
              <input
                type="file"
                name="imgUrl"
                id="addImgUrl"
                onChange={e => {
                  createImgString(e.target.files);
                }}
                style={{display: "none"}}
              />
              {fileSizeError && (
                <span className={classes.errAddedText}>
                  File more than 10mb
                </span>
              )}
            </div>

            {cardImagesUrls.length > 0 &&
              cardImagesUrls.map((image, index) => (
                <div key={index} className={classes.previewFilesList}>
                  <span
                    className={cn(classes.previewFileName, {
                      [classes.choosedFile]: choosedFileIndex === index,
                    })}
                    onClick={() => onChoosedFile(index)}
                  >
                    {index + 1}.&nbsp;{image.fileName ? image.fileName : "-"}
                  </span>
                  <span
                    onClick={() => onRemoveFile(index)}
                    className={classes.previewRemoveBtn}
                  >
                    X
                  </span>
                </div>
              ))}
          </div>
          <div className={classes.imageWindow}>
            {cardImagesUrls && cardImagesUrls.length > 0 && (
              <img
                src={setBase64Image(
                  "",
                  cardImagesUrls[choosedFileIndex]?.fileBody,
                )}
                alt="cardImg"
                className={classes.previewImg}
              />
            )}
          </div>
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
