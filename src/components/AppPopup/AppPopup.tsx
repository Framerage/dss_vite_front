import React, {useRef, useState, useEffect} from "react";
import {useOnClickOutside} from "hooks/useClickOutside";
import {AppDispatch} from "store";
import {useDispatch, useSelector} from "react-redux";
import {
  selectImageCoord,
  selectPopupImage,
} from "store/modules/popup/selectors";
import {resetPopupImage} from "store/modules/popup/actions";

import cn from "classnames";
import classes from "./appPopup.module.css";

const AppPopup: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const scaledImage = useSelector(selectPopupImage);
  const scaledImgCoord = useSelector(selectImageCoord);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const onClosePopup = () => {
    if (isPopupOpen) {
      dispatch(resetPopupImage());
      setIsPopupOpen(false);
      setTimeout(() => {
        window.scrollTo(0, scaledImgCoord - 200);
      }, 500);
    }
  };
  useOnClickOutside(popupRef, onClosePopup);

  useEffect(() => {
    !!scaledImage && setIsPopupOpen(true);
  }, [scaledImage]);

  return (
    <div
      className={cn(classes.popupContainer, {
        [classes.vissiblePopup]: isPopupOpen,
      })}
    >
      <div className={classes.popupWindow} ref={popupRef}>
        <img src={scaledImage} alt="scaledImg" className={classes.popupImg} />
        <div className={classes.closeBtn} onClick={onClosePopup}>
          Закрыть
        </div>
      </div>
    </div>
  );
});
export default AppPopup;
