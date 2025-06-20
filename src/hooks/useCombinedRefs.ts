import { useEffect, useRef, type Ref, type RefObject } from "react";

export const useCombinedRefs = <T>(
  ...refs: (Ref<T> | undefined)[]
): RefObject<T | null> => {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        (ref as RefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};
