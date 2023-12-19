import React, {useRef, useState} from "react";
import defaultImg from "assets/images/defaultCardImg.png";
import {AppDispatch} from "store";
import {useDispatch} from "react-redux";
import {setImgCoord, setPopupImage} from "store/modules/popup/actions";
import {setBase64Image} from "helpers/appHelpers";
import cn from "classnames";
import classes from "./imageSlider.module.css";

interface ImageSliderProps {
  images: string[];
  componentScale?: number;
  isImgFile?: boolean;
  isScaled?: boolean;
}
const ImageSlider: React.FC<ImageSliderProps> = ({
  images = [],
  componentScale,
  isImgFile = false,
  isScaled = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [choosedImg, setChoosedImg] = useState(0);
  const [isImgScaled, setIsImageScaled] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const currentImg = isImgFile
    ? images[choosedImg]
    : setBase64Image("", images[choosedImg]);
  const onScaleImg = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsImageScaled(!isImgScaled);
    dispatch(
      setPopupImage(
        isImgFile ? images[choosedImg] : setBase64Image("", images[choosedImg]),
      ),
    );
    setTimeout(() => {
      imgRef.current &&
        dispatch(setImgCoord(imgRef.current.getBoundingClientRect().y));
    }, 500);
  };
  const onChooseImg = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation();
    setChoosedImg(index);
  };
  return (
    <div
      className={classes.imageSlider}
      style={{
        transform: componentScale ? `scale(${componentScale})` : "scale(1)",
      }}
    >
      <div className={classes.imageContainer} ref={imgRef}>
        <div
          className={classes.imgArrow}
          onClick={() => choosedImg !== 0 && setChoosedImg(choosedImg - 1)}
        >
          &#8249;
        </div>
        <img
          src={images && images.length > 0 ? currentImg : defaultImg}
          alt="cardImg"
          className={cn(classes.cardImg, {[classes.cardHover]: isImgScaled})}
          loading="lazy"
          onClick={e =>
            images && images.length > 0 && isScaled && onScaleImg(e)
          }
        />
        <div
          className={classes.imgArrow}
          onClick={() =>
            choosedImg !== images.length - 1 &&
            choosedImg < images.length &&
            setChoosedImg(choosedImg + 1)
          }
        >
          &#8250;
        </div>
      </div>

      <div className={classes.sliderPoints}>
        {images.map((_, index) => (
          <div
            key={index}
            className={cn(classes.pointItem, {
              [classes.activePoint]: choosedImg === index,
            })}
            onClick={e => onChooseImg(e, index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
