import { useEffect } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";

import { useCalendarStore } from "@/domains/calendar/store";
import { useOutsideClick } from "@/hooks";

export const useEventPopoverFloating = () => {
  const {
    selectedEvent: { anchorEl },
    clearSelectedEvent,
  } = useCalendarStore();

  const { x, y, strategy, refs, update } = useFloating({
    placement: "left-start",
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ["right-start", "bottom-start", "top-start"],
        padding: 8,
      }),
      shift({ padding: 8 }),
    ],
  });

  console.log("strategy", strategy);

  useOutsideClick(refs.floating, clearSelectedEvent);

  useEffect(() => {
    if (!anchorEl) return;
    refs.setReference(anchorEl);
    if (!refs.floating.current) return;

    return autoUpdate(anchorEl, refs.floating.current, update);
  }, [anchorEl, refs, update]);

  return {
    x,
    y,
    refs,
    strategy,
  };
};
