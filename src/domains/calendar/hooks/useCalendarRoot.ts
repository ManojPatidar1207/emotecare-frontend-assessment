import { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { type DatesSetArg, type EventClickArg } from "@fullcalendar/core";

import {
  renderDayGridMonthDayCellContent,
  renderTimeGridWeekDayHeaderContent,
  renderTimeGridWeekSlotLabelContent,
  renderTimeGridWeekEventContent,
  renderTimeGridWeekAllDayContent,
  renderTimeGridDayDayHeaderContent,
  renderTimeGridDaySlotLabelContent,
  renderTimeGridDayEventContent,
  renderTimeGridDayAllDayContent,
  renderDayGridMonthEventContent,
} from "@/domains/calendar/components/CalendarRenderers";

import { useCalendarStore } from "@/domains/calendar/store";
import { padNumber } from "@/utils";

import type { CalendarEvent } from "@/domains/calendar/types";

export const useCalendarRoot = () => {
  const { setCurrentViewDateRange, openCreateEventDialog, selectEvent } =
    useCalendarStore();

  const handleDatesSet = useCallback(
    (arg: DatesSetArg) => {
      setCurrentViewDateRange({
        start: arg.view.currentStart,
        end: dayjs(arg.view.currentEnd).subtract(1, "day").toDate(),
      });
    },
    [setCurrentViewDateRange]
  );

  const handleSlotClick = useCallback(
    (arg: { date: Date }) => {
      const startDate = arg.date;
      const endDate = arg.date;
      const hours = startDate.getHours();
      const minutes = startDate.getMinutes();
      const startTime = `${padNumber(hours)}:${padNumber(minutes)}`;
      const end = new Date(startDate);
      end.setMinutes(end.getMinutes() + 60);
      const endTime = `${padNumber(end.getHours())}:${padNumber(
        end.getMinutes()
      )}`;
      openCreateEventDialog({ startDate, startTime, endDate, endTime });
    },
    [openCreateEventDialog]
  );

  const handleEventClick = useCallback(
    (arg: EventClickArg) => {
      selectEvent(arg.event.toPlainObject() as CalendarEvent, arg.el);
    },
    [selectEvent]
  );

  const calendarViews = useMemo(
    () => ({
      dayGridMonth: {
        allDaySlot: false,
        dayCellContent: renderDayGridMonthDayCellContent,
        eventContent: renderDayGridMonthEventContent,
        dayHeaderClassNames:
          "text-center font-medium text-[11px] text-gray-500 uppercase !border-b-0 !border-gray-200",
        viewClassNames: "bg-white rounded-3xl border border-gray-200",
        dayCellClassNames: "!border-gray-200",
        eventClassNames:
          "!p-0 !border-0 !bg-orange-500 text-white rounded-md !mt-0.5 !mr-2 cursor-pointer",
        moreLinkClassNames:
          "box-border w-full !max-w-[calc(100%_-_6px)] !rounded-md !mt-0.5 !mr-1.5 !px-2 !py-1",
      },
      timeGridWeek: {
        allDaySlot: true,
        dayHeaderContent: renderTimeGridWeekDayHeaderContent,
        slotLabelContent: renderTimeGridWeekSlotLabelContent,
        eventContent: renderTimeGridWeekEventContent,
        allDayContent: renderTimeGridWeekAllDayContent,
        allDayClassNames: "!border-0 ",
        slotLabelClassNames:
          "!border-0 text-xs font-medium text-gray-600 relative -top-3 !pr-0 -right-1",
        dayHeaderClassNames: "!border-0",
        viewClassNames: "bg-white rounded-3xl pl-5",
        slotLaneClassNames: "!border-gray-200",
        eventClassNames:
          "!p-0 !border-0 !bg-orange-500 text-white rounded-md !mt-0.5 !mr-2 p-0.5 cursor-pointer",
        moreLinkClassNames:
          "box-border w-full !max-w-[calc(100%_-_6px)] !rounded-md !mt-0.5 !mr-1.5 !px-2 !py-1",
      },
      timeGridDay: {
        allDaySlot: true,
        allDayContent: renderTimeGridDayAllDayContent,
        dayHeaderContent: renderTimeGridDayDayHeaderContent,
        slotLabelContent: renderTimeGridDaySlotLabelContent,
        eventContent: renderTimeGridDayEventContent,
        allDayClassNames: "!border-0",
        viewClassNames: "bg-white rounded-3xl pl-5",
        dayHeaderClassNames: "!border-0 !pb-2.5",
        slotLabelClassNames:
          "!border-0 text-xs font-medium text-gray-600 relative -top-3 !pr-0 -right-1",
        slotLaneClassNames: "!border-gray-200",
        eventClassNames:
          "!p-0 !border-0 !bg-orange-500 text-white rounded-md !mt-0.5 !mr-2 p-0.5 cursor-pointer",
        moreLinkClassNames:
          "box-border w-full !max-w-[calc(100%_-_6px)] !rounded-md !mt-0.5 !mr-1.5 !px-2 !py-1",
      },
    }),
    []
  );

  return {
    calendarViews,
    handleDatesSet,
    handleSlotClick,
    handleEventClick,
  };
};
