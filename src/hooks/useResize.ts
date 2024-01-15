import {useEffect, useState} from "react";
import {useAppDispatch} from "store/index";
import {
  setIsDesktop,
  setIsMobile,
  setIsTablet,
} from "store/modules/app/actions";
import {useDebounce} from "./useDebounce";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: any) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const currentWidth = useDebounce(width, 1000).debouncedValue;

  return currentWidth;
};
