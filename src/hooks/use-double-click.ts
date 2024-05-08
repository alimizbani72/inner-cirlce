import { type SyntheticEvent, useCallback, useRef, type MouseEvent } from "react";

// ----------------------------------------------------------------------

type Props = {
  timeout?: number;
  click?: (e: SyntheticEvent) => void;
  doubleClick: (e: SyntheticEvent) => void;
};

export function useDoubleClick({ click, doubleClick, timeout = 250 }: Props) {
  const clickTimeout = useRef<any>();

  const clearClickTimeout = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  return useCallback(
    (event: MouseEvent<HTMLElement>) => {
      clearClickTimeout();
      if (click && event.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          click(event);
        }, timeout);
      }
      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick, timeout]
  );
}
