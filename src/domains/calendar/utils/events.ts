import dayjs from "dayjs";

import type { CalendarEvent, RawEvent } from "@/domains/calendar/types";

export const isEventAllDayByTime = (start: Date, end: Date): boolean => {
  const startTime = dayjs(start).format("HH:mm");
  const endTime = dayjs(end).format("HH:mm");
  const durationInMinutes = dayjs(end).diff(start, "minute");

  const isMidnightTime = startTime === "00:00" && endTime === "00:00";
  const isMultiDay = !dayjs(start).isSame(end, "day");

  return isMidnightTime || (isMultiDay && durationInMinutes >= 1440);
};

export const convertEventsRawToCalendar = (
  rawEvents: RawEvent[]
): CalendarEvent[] => {
  return rawEvents.map((event) => ({
    id: event.id,
    title: event.title,
    start: dayjs(event.startDate).toISOString(),
    end: dayjs(event.endDate).toISOString(),
    allDay: !!event.isAllDay,
    extendedProps: {
      description: event.description ?? "",
      originalStartDate: dayjs(event.startDate).toISOString(),
      originalEndDate: dayjs(event.endDate).toISOString(),
    },
  }));
};
