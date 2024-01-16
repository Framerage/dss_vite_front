import {useEffect, useState} from "react";
import {useAppDispatch} from "store/index";
import {
  setIsDesktop,
  setIsLowDesktop,
  setIsMobile,
  setIsTablet,
} from "store/modules/app/actions";
import {useDebounce} from "./useDebounce";

export const useResize = () => {
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const appWidth = useDebounce(width, 1000).debouncedValue;
  useEffect(() => {
    if (appWidth > 768 && appWidth <= 1024) {
      dispatch(setIsLowDesktop(true));
      dispatch(setIsDesktop(false));
      dispatch(setIsTablet(false));
      dispatch(setIsMobile(false));
      return;
    }
    if (appWidth <= 768 && appWidth > 480) {
      dispatch(setIsTablet(true));
      dispatch(setIsMobile(false));
      dispatch(setIsDesktop(false));
      return;
    }
    if (appWidth <= 480 && appWidth >= 320) {
      dispatch(setIsMobile(true));
      dispatch(setIsTablet(false));
      dispatch(setIsDesktop(false));
      return;
    }
    dispatch(setIsDesktop(true));
    dispatch(setIsLowDesktop(false));
    dispatch(setIsTablet(false));
    dispatch(setIsMobile(false));
  }, [appWidth]);
  return appWidth;
};
