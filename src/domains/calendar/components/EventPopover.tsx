import { useMemo } from "react";
import { createPortal } from "react-dom";
import dayjs from "dayjs";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCalendarStore } from "@/domains/calendar/store";
import { useEventPopoverFloating } from "@/domains/calendar/hooks";

export const FloatingEventPopover = () => {
  const {
    selectedEvent: { event },
    clearSelectedEvent,
  } = useCalendarStore();

  const { strategy, x, y, refs } = useEventPopoverFloating();

  const renderEventDetail = useMemo(
    () =>
      event ? (
        <div className="fixed inset-0 z-[9999]">
          <div className="relative w-full h-full">
            <div
              ref={refs.setFloating}
              role="dialog"
              aria-modal="true"
              className="z-[99999] w-[300px] rounded-md border bg-white p-4 shadow-xl dark:bg-zinc-900"
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">🔔 Event Details</h1>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={clearSelectedEvent}
                  >
                    <X />
                  </Button>
                </div>

                <div>
                  <div className="text-base font-semibold text-zinc-700">
                    {event.title}
                  </div>

                  <div className="mt-1 text-xs text-gray-600">
                    {dayjs(event.extendedProps.originalStartDate).format(
                      "ddd, MMM D, h:mm A "
                    )}
                    -
                    {dayjs(event.extendedProps.originalEndDate).format(
                      " ddd, MMM D, h:mm A"
                    )}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {event.extendedProps?.description || "No description"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null,
    [clearSelectedEvent, event, refs.setFloating, strategy, x, y]
  );

  return createPortal(renderEventDetail, document.body);
};

FloatingEventPopover.displayName = "FloatingEventPopover";
