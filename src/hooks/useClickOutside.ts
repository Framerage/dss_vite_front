import {useEffect, RefObject} from "react";

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    return (): void => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};
