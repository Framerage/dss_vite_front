import React, {useState} from "react";

import {generateFileData, setBase64Image} from "helpers/appHelpers";
import cn from "classnames";
import classes from "./imageAdder.module.css";

interface ImageAdderProps {
  images: {fileBody: string; fileName: string; id: number}[];
  changeImages: (
    images: {fileBody: string; fileName: string; id: number}[],
  ) => void;
}
const ImageAdder: React.FC<ImageAdderProps> = React.memo(
  ({images, changeImages}) => {
    const [choosedFileIndex, setChoosedFileIndex] = useState(0);
    const [fileSizeError, setFileSizeError] = useState(false);
    const [imageRepeatErr, setImageRepeatErr] = useState(false);

    const createImgString = async (fileList: FileList | null) => {
      setFileSizeError(false);
      setImageRepeatErr(false);
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
      if (images.some(file => file.fileName === imgResult.fileName)) {
        setImageRepeatErr(true);
        return;
      }
      changeImages([
        ...images.map((img, index) => {
          return {...img, id: index};
        }),
        {...imgResult, id: images.length},
      ]);
    };

    const onRemoveFile = (id: number) => {
      const takeImgs = () => {
        const newFiles = images.filter(file => file.id !== id);
        return newFiles.map((file, index) => {
          return {...file, id: index};
        });
      };
      changeImages(takeImgs());
      if (choosedFileIndex) {
        setChoosedFileIndex(choosedFileIndex - 1);
      }
    };

    const onChoosedFile = (id: number) => setChoosedFileIndex(id);
    return (
      <div className={classes.imageAdderContainer}>
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
              <span className={classes.errAddedText}>File more than 10mb</span>
            )}
            {imageRepeatErr && (
              <span className={classes.errAddedText}>
                Файл с таким названием уже добавлен
              </span>
            )}
          </div>

          {images.length > 0 &&
            images.map((image, index) => (
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
          {images && images.length > 0 && (
            <img
              src={setBase64Image("", images[choosedFileIndex]?.fileBody)}
              alt="cardImg"
              className={classes.previewImg}
            />
          )}
        </div>
      </div>
    );
  },
);
export default ImageAdder;
