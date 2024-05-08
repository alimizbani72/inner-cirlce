"use client";

import { useScroll } from "framer-motion";
import { type RefObject, useCallback, useEffect, useMemo, useState } from "react";

// ----------------------------------------------------------------------

type ReturnType = boolean;

interface UseScrollOptions extends Omit<ScrollOptions, "container" | "target"> {
  container?: RefObject<HTMLElement>;
  target?: RefObject<HTMLElement>;
}

export function useOffSetTop(top = 0, options?: UseScrollOptions): ReturnType {
  const { scrollY } = useScroll(options);

  const [value, setValue] = useState(false);

  const onOffSetTop = useCallback(() => {
    scrollY.on("change", (scrollHeight) => {
      if (scrollHeight > top) {
        setValue(true);
      } else {
        setValue(false);
      }
    });
  }, [scrollY, top]);

  useEffect(() => {
    onOffSetTop();
  }, [onOffSetTop]);

  const memoizedValue = useMemo(() => value, [value]);

  return memoizedValue;
}

// Usage
// const offset = useOffSetTop(100);

// Or
// const offset = useOffSetTop(100, {
//   container: ref,
// });
