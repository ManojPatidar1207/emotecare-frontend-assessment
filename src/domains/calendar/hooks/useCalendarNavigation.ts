import { useCallback, type RefObject } from "react";
import type FullCalendar from "@fullcalendar/react";

import { useCalendarStore } from "@/domains/calendar/store";
import type { CalendarViewTypes } from "@/domains/calendar/types";

export const useCalendarNavigation = (calendarRef: RefObject<FullCalendar>) => {
  const { setCurrentView } = useCalendarStore();

  const handleNavigate = useCallback(
    (action: "today" | "prev" | "next") => {
      const api = calendarRef.current?.getApi();
      if (!api) return;
      if (action === "today") api.today();
      if (action === "prev") api.prev();
      if (action === "next") api.next();
    },
    [calendarRef]
  );

  const handleViewChange = useCallback(
    (view: CalendarViewTypes) => {
      const api = calendarRef.current?.getApi();
      if (api) {
        api.changeView(view);
        setCurrentView(view);
      }
    },
    [calendarRef, setCurrentView]
  );

  return { handleNavigate, handleViewChange };
};
