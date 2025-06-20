import dayjs from "dayjs";

import type { CalendarViewTypes } from "@/domains/calendar/types";

export const getToolbarDateLabel = (
  view: CalendarViewTypes,
  start: Date,
  end: Date
) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  switch (view) {
    case "dayGridMonth":
      return startDate.format("MMMM YYYY");

    case "timeGridWeek": {
      const sameMonth = startDate.month() === endDate.month();
      const startMonth = sameMonth
        ? startDate.format("MMMM")
        : startDate.format("MMM");
      const endMonth = endDate.format("MMM");
      const year = startDate.format("YYYY");

      return sameMonth
        ? `${startMonth} ${year}`
        : `${startMonth} - ${endMonth} ${year}`;
    }

    case "timeGridDay":
      return startDate.format("MMMM D, YYYY");

    default:
      return "";
  }
};
